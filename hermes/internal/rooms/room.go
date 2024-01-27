package rooms

const RoomObject string = "room"

type Room struct {
	ID           string        `json:"id" bson:"_id"`
	Object       string        `json:"object" bson:"object"`
	Participants []string      `json:"participants" bson:"participants"`
	Messages     []ChatMessage `json:"messages" bson:"messages"`
	// Type enum
	// IsReadOnly bool
}

type ChatMessage struct {
	SenderID  string `json:"sender" bson:"sender"`
	Content   string `json:"content" bson:"content"`
	Timestamp string `json:"timestamp" bson:"timestamp"`
}
