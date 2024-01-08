package ws

import (
	"log"

	roulette "github.com/blendify-app/mothership/hermes/internal/roulette"
	"go.mongodb.org/mongo-driver/mongo"
)

// Hub maintains the set of active clients and broadcasts messages to the clients
type Hub struct {
	// Registered clients
	clients map[*Client]bool

	// Inbound messages from the clients
	broadcast chan []byte

	// Register requests from the clients
	register chan *Client

	// Unregister requests from clients
	unregister chan *Client

	// Rooms represent a chat session between two clients
	rooms map[string]map[*Client]bool

	// Reference to the roulette service
	roulette roulette.Service
}

type MessageType string

type Message struct {
	Type      MessageType `json:"type"`
	Content   string      `json:"content"`
	Room      string      `json:"room"`
	Timestamp int64       `json:"timestamp"`
	Error     string      `json:"error"`
}

const (
	JoinRoulette  MessageType = "join_roulette"
	LeaveRoulette MessageType = "leave_roulette"
	JoinRoom      MessageType = "join_room"
	LeaveRoom     MessageType = "leave_room"
	Reconnect     MessageType = "reconnect"
	SendMessage   MessageType = "send_message"
	UserMessage   MessageType = "user_message"
)

func NewHub(db *mongo.Database) *Hub {
	profileRepository := roulette.NewRepository(db.Client())
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
		rooms:      make(map[string]map[*Client]bool),
		roulette:   roulette.NewService(profileRepository),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
			log.Printf("hub:register clients: %v", h.clients)
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
				log.Printf("hub:unregister clients: %v", h.clients)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.send <- message:
					log.Printf("sending")
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
		}
	}
}
