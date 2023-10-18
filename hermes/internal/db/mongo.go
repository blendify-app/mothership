package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func BootstrapMongoDB(uri, dbName string, timeout time.Duration) (*mongo.Database, error) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	opts := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, opts)

	if err != nil {
		return nil, err
	}

	return client.Database(dbName), nil
}

func DisconnectMongoDB(db *mongo.Database) error {
	return db.Client().Disconnect(context.Background())
}
