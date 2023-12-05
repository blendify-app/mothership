package roulette

import (
	"context"
	"log"

	"github.com/blendify-app/mothership/hermes/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repository interface {
	Get(ctx context.Context, id string) (Roulette, error)
	Create(ctx context.Context, roulette Roulette) (*mongo.InsertOneResult, error)
	Update(ctx context.Context, roulette Roulette) (*mongo.UpdateResult, error)
	Delete(ctx context.Context, id string) (*mongo.DeleteResult, error)
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

func (r *repository) Get(ctx context.Context, id string) (Roulette, error) {
	var roulette Roulette
	filter := bson.D{{Key: "_id", Value: id}}
	err := r.collection.FindOne(ctx, filter).Decode(&roulette)
	return roulette, err
}

func (r *repository) Create(ctx context.Context, roulette Roulette) (*mongo.InsertOneResult, error) {
	insertedResult, err := r.collection.InsertOne(ctx, roulette)
	return insertedResult, err
}

func (r *repository) Update(ctx context.Context, roulette Roulette) (*mongo.UpdateResult, error) {
	filter := bson.M{"_id": roulette.ID}
	update := bson.M{"$set": roulette}
	return r.collection.UpdateOne(ctx, filter, update)
}

func (r *repository) Delete(ctx context.Context, id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"_id": id}
	return r.collection.DeleteOne(ctx, filter)
}
