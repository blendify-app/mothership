package ws

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/blendify-app/mothership/hermes/config"
	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/blendify-app/mothership/hermes/internal/rooms"
	"github.com/blendify-app/mothership/hermes/internal/roulette"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write a message to the peer
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		// TODO: Check the origin of the request and return true if it's from an allowed origin.
		return true
	},
}

// Client is a middleman between the websocket connection and the hub
type Client struct {
	hub *Hub

	// User's ID (matches the PK in the DB)
	id string

	// The websocket connection
	conn *websocket.Conn

	// Buffered channel of outbound messages
	send chan []byte
}

// readPump pumps messages from the websocket connection to the hub.
//
// The application runs readPump in a per-connection goroutine. The application
// ensures that there is at most one reader on a connection by executing all
// reads from this goroutine.
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		var msg Message
		err = json.Unmarshal(message, &msg)
		if err != nil {
			log.Printf("readPump message error: %v", err)
			// Handle JSON unmarshal error
			continue
		}
		log.Printf("msg: %v", msg)

		switch msg.Type {
		case JoinRoulette:
			log.Printf("%v is joining roulette", c.id)
			newRouletteParticipant := &roulette.Roulette{
				UserID: c.id,
				Object: roulette.RouletteObject,
			}
			_, err := c.hub.roulette.Create(context.TODO(), *newRouletteParticipant)
			if err != nil {
				log.Printf("%v", err)
			} else {
				log.Printf("user added successfully to the pool")
			}

			c.hub.broadcast <- message
			c.hub.broadcast <- []byte("u in the pool")

			matchedUserID, err := c.hub.roulette.FindMatch(context.TODO(), c.hub.roulette.GetRepository(), c.id)
			if err != nil {
				log.Println(err)
				return
			}

			if matchedUserID != "" {
				log.Printf("Match found: %s and %s", c.id, matchedUserID)
				// TODO: refactor to bulk delete
				_, err := c.hub.roulette.Delete(context.TODO(), c.id)
				if err != nil {
					log.Printf("failed to delete %s from roulette pool: %s", c.id, err)
				}

				_, err = c.hub.roulette.Delete(context.TODO(), matchedUserID)
				if err != nil {
					log.Printf("failed to delete %s from roulette pool: %s", matchedUserID, err)
				}

				c.hub.broadcast <- []byte("we got you a match")

				uuid, _ := uuid.NewRandom()
				roomID := uuid.String()
				room := rooms.Room{
					ID:           roomID,
					Object:       rooms.RoomObject,
					Participants: []string{c.id, matchedUserID},
					Messages:     []rooms.ChatMessage{},
				}

				newRoom, err := c.hub.roomService.Create(context.TODO(), room)
				c.hub.AddClientToRoom(roomID, c)
				c.hub.AddClientToRoom(roomID, c.hub.GetClientById(matchedUserID))

				if err != nil {
					log.Printf("%v", err)
				} else {
					log.Printf("new room created: %v", newRoom.ID)
				}

				c.hub.broadcast <- []byte("we got you in a room")
			} else {
				c.hub.broadcast <- []byte("we are finding you a match")
			}

		case "join_room":
			//handle joining room
		case "reconnect":
			// Handle reconnecting to the chat
		case "send_message":
			// Handle sending a message to another person in the room
		default:
			// Handle unknown message types
		}
		// message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))
		// c.hub.broadcast <- message
	}
}

// writePump pumps messages from the hub to the websocket connection.
//
// A goroutine running writePump is started for each connection. The
// application ensures that there is at most one writer to a connection by
// executing all writes from this goroutine.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// ServeWs handles websocket requests from the peer
func ServeWS(hub *Hub, c *gin.Context, envVars *config.EnvVars) {
	claims := middleware.AuthorizeWSConnection(c, envVars)
	if claims == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to authorize user"})
		return
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := &Client{hub: hub, id: claims.Sub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client
	client.send <- []byte("hello")

	// Allow collection of memory referenced by the caller by doing all work in new goroutines
	go client.writePump()
	go client.readPump()
}
