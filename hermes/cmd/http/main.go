package main

import (
	"context"
	"log"
	"time"

	"net/http"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/blendify-app/mothership/hermes/internal/profiles"
	"github.com/blendify-app/mothership/hermes/internal/rooms"
	"github.com/blendify-app/mothership/hermes/internal/roulette"
	"github.com/blendify-app/mothership/hermes/internal/ws"

	"github.com/blendify-app/mothership/hermes/config"
	"github.com/blendify-app/mothership/hermes/internal/db"
	"github.com/blendify-app/mothership/hermes/internal/users"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func main() {
	// Load environment variables
	envVars, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("hermes_error: %v", err.Error())
	}

	// Connect to MongoDB
	dbClient, err := db.BootstrapMongoDB(envVars.MONGO_DB_URI, envVars.MONGO_DB_NAME, 10*time.Second)
	if err != nil {
		log.Fatalf("hermes_error: %v", err.Error())
	}

	// Check MongoDB connection
	var result bson.M
	if err := dbClient.Client().Database(envVars.MONGO_DB_NAME).RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Decode(&result); err != nil {
		log.Fatalf("hermes_error: failed to ping %s (%v)", envVars.MONGO_DB_NAME, err.Error())
	} else {
		log.Printf("hermes: successfully connected to MongoDB instance: %s", envVars.MONGO_DB_NAME)
	}

	// Initialize Gin
	r := gin.Default()

	// Initialize Hub for websocket connections
	hub := ws.NewHub(dbClient)
	go hub.Run()

	// Define a healthcheck endpoint
	r.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello karnataka!",
		})
	})

	// Define WS endpoint
	r.GET("/ws", func(ctx *gin.Context) {
		ws.ServeWS(hub, ctx, &envVars)
	})

	// Setup middleware
	middleware.Setup(r, dbClient, &envVars)

	// Define API routes
	v1Group := r.Group("/v1")
	{
		users.UserRoutes(v1Group, dbClient)
		profiles.ProfileRoutes(v1Group, dbClient)
		roulette.RouletteRoutes(v1Group, dbClient)
		rooms.RoomRoutes(v1Group, dbClient)
	}

	// Start the server
	r.Run("192.168.0.153:8080") // TODO: change this to an ENV var
}
