package users

const UserObject string = "user"

type User struct {
	ID        string `json:"id" bson:"_id"`
	Object    string `json:"object" bson:"object"`
	Name      string `json:"name" bson:"name"`
	Email     string `json:"email" bson:"email"`
	Profile   string `bson:"profile" json:"profile"`
	Timestamp string `bson:"time" json:"time"`
}
