package profiles

import (
	"context"
	"log"

	"github.com/blendify-app/mothership/hermes/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repository interface {
	Get(ctx context.Context, id string) (Profile, error)
	Create(ctx context.Context, profile Profile) (*mongo.InsertOneResult, error)
	Update(ctx context.Context, data map[string]interface{}) (*mongo.UpdateResult, error)
	Delete(ctx context.Context, id string) (*mongo.DeleteResult, error)
}

type repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Client) Repository {
	envVars, _ := config.LoadConfig()
	collection := db.Database(envVars.MONGO_DB_NAME).Collection("profile")
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

func (r *repository) Get(ctx context.Context, id string) (Profile, error) {
	var profile Profile
	filter := bson.D{
		{Key: "$or", Value: bson.A{
			bson.D{{Key: "_id", Value: id}},
			bson.D{{Key: "user_id", Value: id}},
		}},
	}
	err := r.collection.FindOne(ctx, filter).Decode(&profile)
	return profile, err
}

func (r *repository) Create(ctx context.Context, profile Profile) (*mongo.InsertOneResult, error) {
	insertedResult, err := r.collection.InsertOne(ctx, profile)
	return insertedResult, err
}

func (r *repository) Update(ctx context.Context, data map[string]interface{}) (*mongo.UpdateResult, error) {
	filter := data["filter"].(bson.M)
	update := data["update"].(bson.M)
	return r.collection.UpdateOne(ctx, filter, update)
}

func (r *repository) Delete(ctx context.Context, id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"_id": id}
	return r.collection.DeleteOne(ctx, filter)
}
