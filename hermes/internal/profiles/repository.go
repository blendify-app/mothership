package profiles

import (
	"context"
	"time"

	"github.com/blendify-app/mothership/hermes/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository interface {
	Get(ctx context.Context, id string) (Profile, error)
	Create(ctx context.Context, profile Profile) (*mongo.InsertOneResult, error)
	Update(ctx context.Context, profile Profile) (*mongo.UpdateResult, error)
	Delete(ctx context.Context, id string) (*mongo.DeleteResult, error)
}

type repository struct {
	collection *mongo.Collection
}

func NewRepository(db *mongo.Client) Repository {
	envVars, _ := config.LoadConfig()
	collection := db.Database(envVars.MONGO_DB_NAME).Collection("profile")
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
	profile.Timestamp = time.Now().Format(time.RFC3339)
	insertedResult, err := r.collection.InsertOne(ctx, profile)
	return insertedResult, err
}

func (r *repository) Update(ctx context.Context, profile Profile) (*mongo.UpdateResult, error) {
	filter := bson.M{"_id": profile.ID}
	update := bson.M{"$set": profile}
	return r.collection.UpdateOne(ctx, filter, update)
}

func (r *repository) Delete(ctx context.Context, id string) (*mongo.DeleteResult, error) {
	filter := bson.M{"_id": id}
	return r.collection.DeleteOne(ctx, filter)
}
