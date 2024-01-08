package rooms

import (
	"context"
	"log"
	"time"

	"github.com/blendify-app/mothership/hermes/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repository interface {
	Get(ctx context.Context, id string) (Room, error)
	Create(ctx context.Context, roulette Room) (*mongo.InsertOneResult, error)
}

type repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Client) Repository {
	envVars, _ := config.LoadConfig()
	collection := db.Database(envVars.MONGO_DB_NAME).Collection("roulette")
	indexModel := mongo.IndexModel{
		Keys:    bson.D{{Key: "user_id", Value: -1}},
		Options: options.Index().SetUnique(true),
	}

	_, err := collection.Indexes().CreateOne(context.TODO(), indexModel)
	if err != nil {
		log.Printf("%v", err)
	}

	return &repository{collection}
}

func (r *repository) Get(ctx context.Context, id string) (Room, error) {
	var room Room
	filter := bson.D{{Key: "_id", Value: id}}
	err := r.collection.FindOne(ctx, filter).Decode(&room)
	return room, err
}

func (r *repository) Create(ctx context.Context, room Room) (*mongo.InsertOneResult, error) {
	room.Messages.Timestamp = time.Now().Format(time.RFC3339)
	insertedResult, err := r.collection.InsertOne(ctx, room)
	return insertedResult, err
}
