package roulette

type Roulette struct {
	ID     string `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID string `json:"user_id,omitempty" bson:"user_id,omitempty"`
}
