package rooms

import (
	"context"

	"github.com/blendify-app/mothership/hermes/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository interface {
	Get(ctx context.Context, id string) (Room, error)
	Create(ctx context.Context, roulette Room) (*mongo.InsertOneResult, error)
	AddUser(ctx context.Context, RoomID string, UserID string) (*mongo.UpdateResult, error)
}

type repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Client) Repository {
	envVars, _ := config.LoadConfig()
	collection := db.Database(envVars.MONGO_DB_NAME).Collection("rooms")

	return &repository{collection}
}

func (r *repository) Get(ctx context.Context, id string) (Room, error) {
	var room Room
	filter := bson.D{{Key: "_id", Value: id}}
	err := r.collection.FindOne(ctx, filter).Decode(&room)
	return room, err
}

func (r *repository) Create(ctx context.Context, room Room) (*mongo.InsertOneResult, error) {
	insertedResult, err := r.collection.InsertOne(ctx, room)
	return insertedResult, err
}

func (r *repository) AddUser(ctx context.Context, RoomID string, UserID string) (*mongo.UpdateResult, error) {
	filter := bson.M{"_id": RoomID}
	update := bson.M{"$addToSet": bson.M{"participants": UserID}}
	return r.collection.UpdateOne(ctx, filter, update)
}
