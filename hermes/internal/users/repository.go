package users

import (
	"context"
	"time"

	"github.com/blendify-app/mothership/hermes/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository interface {
	Get(ctx context.Context, id string) (User, error)
	Create(ctx context.Context, user User) (*mongo.InsertOneResult, error)
	Update(ctx context.Context, user User) (*mongo.UpdateResult, error)
	Delete(ctx context.Context, id string) (*mongo.DeleteResult, error)
}

type repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Client) Repository {
	envVars, _ := config.LoadConfig()
	collection := db.Database(envVars.MONGO_DB_NAME).Collection("user")
	return &repository{collection}
}

func (r *repository) Get(ctx context.Context, id string) (User, error) {
	var user User
	filter := bson.D{{Key: "_id", Value: id}}
	err := r.collection.FindOne(ctx, filter).Decode(&user)
	return user, err
}

func (r *repository) Create(ctx context.Context, user User) (*mongo.InsertOneResult, error) {
	user.Timestamp = time.Now().Format(time.RFC3339)
	insertedResult, err := r.collection.InsertOne(ctx, user)
	return insertedResult, err
}

func (r *repository) Update(ctx context.Context, user User) (*mongo.UpdateResult, error) {
	filter := bson.M{"_id": user.ID}
	update := bson.M{"$set": user}
	return r.collection.UpdateOne(ctx, filter, update)
}

func (r *repository) Delete(ctx context.Context, id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"_id": id}
	return r.collection.DeleteOne(ctx, filter)
}
