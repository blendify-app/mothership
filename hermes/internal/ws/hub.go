package ws

import (
	"log"

	"github.com/blendify-app/mothership/hermes/internal/rooms"
	roulette "github.com/blendify-app/mothership/hermes/internal/roulette"
	"go.mongodb.org/mongo-driver/mongo"
)

// Hub maintains the set of active clients and broadcasts messages to the clients
type Hub struct {
	clients     map[string]map[*Client]bool // Registered clients
	broadcast   chan []byte                 // Inbound messages from the clients
	register    chan *Client                // Register requests from the clients
	unregister  chan *Client                // Unregister requests from clients
	rooms       map[string]map[*Client]bool // Rooms represent a chat session between two clients
	roulette    roulette.Service
	roomService rooms.Service
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
	roomRepo := rooms.NewRepository(db.Client())
	return &Hub{
		broadcast:   make(chan []byte),
		register:    make(chan *Client),
		unregister:  make(chan *Client),
		clients:     make(map[string]map[*Client]bool), // Initialize clients map
		rooms:       make(map[string]map[*Client]bool), // Initialize rooms map
		roulette:    roulette.NewService(profileRepository),
		roomService: rooms.NewService(roomRepo),
	}
}

func (h *Hub) AddClientToRoom(roomName string, client *Client) {
	if h.rooms[roomName] == nil {
		h.rooms[roomName] = make(map[*Client]bool) // Create a new map for the room if it doesn't exist
	}
	h.rooms[roomName][client] = true
	log.Printf("hub:rooms clients: %v", h.rooms)
}

func (h *Hub) GetClientById(clientID string) *Client {
	client := h.clients[clientID]
	for c := range client {
		return c
	}

	return nil
}

func (h *Hub) RegisterClient(client *Client) {
	if h.clients[client.id] == nil {
		h.clients[client.id] = make(map[*Client]bool)
	}
	h.clients[client.id][client] = true
	log.Printf("hub:register clients: %v", h.clients)
}

func (h *Hub) UnregisterClient(client *Client) {
	if _, ok := h.clients[client.id][client]; ok {
		delete(h.clients[client.id], client) // Unregister the client
		close(client.send)
		log.Printf("hub:unregister clients: %v", h.clients)
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.RegisterClient(client)
		case client := <-h.unregister:
			h.UnregisterClient(client)
		case message := <-h.broadcast:
			for _, client := range h.clients {
				var c *Client
				for c = range client {
					break
				}

				select {
				case c.send <- message:
					log.Printf("sending" + c.id)
				default:
					close(c.send)
					delete(h.clients, c.id)
				}
			}
		}
	}
}
