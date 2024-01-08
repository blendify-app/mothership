package rooms

type Room struct {
	RoomID       string      `json:"id" bson:"_id"`
	Participants []string    `json:"participants" bson:"participants"`
	Messages     ChatMessage `json:"messages" bson:"messages"`
}

type ChatMessage struct {
	SenderID  string   `json:"sender" bson:"sender"`
	Content   []string `json:"content" bson:"content"`
	Timestamp string   `json:"timestamp" bson:"timestamp"`
}
