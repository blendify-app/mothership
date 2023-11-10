package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"encoding/json"
	"net/http"

	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/blendify-app/mothership/hermes/config"
	"github.com/blendify-app/mothership/hermes/internal/db"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

var handler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value(jwtmiddleware.ContextKey{}).(*validator.ValidatedClaims)

	if !ok {
		http.Error(w, "Failed to get validated claims", http.StatusInternalServerError)
		return
	}

	payload, err := json.Marshal(claims)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(payload)
})

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

	r.Run(":8080")

	keyFunc := func(ctx context.Context) (interface{}, error) {
		return []byte(envVars.CLIENT_SECRET), nil
	}

	jwtValidator, err := validator.New(
		keyFunc,
		validator.HS256,
		"https://dev-pb2l7ig8ecavkase.us.auth0.com/",
		[]string{"https://dev-pb2l7ig8ecavkase.us.auth0.com/api/v2/"},
	)
	if err != nil {
		log.Fatalf("failed to set up the validator: %v", err)
	}

	middleware := jwtmiddleware.New(jwtValidator.ValidateToken)

	http.ListenAndServe("0.0.0.0:8080", middleware.CheckJWT(handler))

}
