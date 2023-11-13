package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"net/http"

	"github.com/blendify-app/mothership/hermes/config"
	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/blendify-app/mothership/hermes/internal/db"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func main() {
	envVars, err := config.LoadConfig()

	if err != nil {
		fmt.Printf("hermes_error: %v", err.Error())
		os.Exit(1)
	}

	dbClient, err := db.BootstrapMongoDB(envVars.MONGO_DB_URI, envVars.MONGO_DB_NAME, 10*time.Second)

	if err != nil {
		fmt.Printf("hermes_error: %v", err.Error())
		os.Exit(1)
	}

	var result bson.M
	if err := dbClient.Client().Database(envVars.MONGO_DB_NAME).RunCommand(context.TODO(), bson.D{{"ping", 1}}).Decode(&result); err != nil {
		fmt.Printf("hermes_error: failed to ping %s (%v)", envVars.MONGO_DB_NAME, err.Error())
		os.Exit(1)
	}

	log.Printf("successfully connected to MongoDB instance: %s", envVars.MONGO_DB_NAME)

	// setting up and starting the gin server
	r := gin.Default()
	r.GET("/healthcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello karnataka!",
		})
	})

	middleware.EnsureValidToken(r)

	r.GET("/healthcheck-private", (func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Hello from a private endpoint! You need to be authenticated to see this."})
	}))

	r.Run(":8080")
}
