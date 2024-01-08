package roulette

const RouletteObject string = "roulette"

type Roulette struct {
	ID        string `json:"id" bson:"_id"`
	Object    string `json:"object" bson:"object"`
	UserID    string `json:"user_id" bson:"user_id"`
	Timestamp string `bson:"time" json:"time"`
}
