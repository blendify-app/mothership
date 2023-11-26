package users

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

type MongoDBUserRepository struct {
	// Define any necessary fields
}

func NewMongoDBUserRepository() *MongoDBUserRepository {
	// Initialize any necessary fields
	return &MongoDBUserRepository{}
}

func (r *MongoDBUserRepository) CreateUser(db *mongo.Database, user *User) error {
	collection := db.Collection("users")
	_, err := collection.InsertOne(context.Background(), user)
	return err
}
