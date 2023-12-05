package roulette

import (
	"fmt"
	"net/http"
	"time"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RouletteRoutes(r *gin.Engine, sg *gin.RouterGroup, db *mongo.Database) {
	rouletteGroup := sg.Group("/roulette")
	{
		rouletteGroup.POST("/join", func(c *gin.Context) {
			rouletteRepository := NewRepository(db.Client())
			join(c, rouletteRepository)
		})
	}
}

// TODO
func join(c *gin.Context, rouletteRepository Repository) {
	customClaims, err := middleware.GetCustomClaims(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to join roulette pool",
		})
		return
	}

	rouletteService := NewService(rouletteRepository)

	newRouletteParticipant := CreateRouletteSessionRequest{
		UserID: customClaims.Sub,
	}

	_, err = rouletteService.Create(c.Request.Context(), newRouletteParticipant)
	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			c.JSON(http.StatusOK, gin.H{"message": "User already in the roulette pool"})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to join roulette pool"})
		return
	}

	// async method to start searching for a match
	// implement long polling with a timeout for a match

	go func() {
		time.Sleep(10 * time.Second)
		fmt.Println(("match found!"))
	}()

	// Long-polling mechanism with timeout
	select {
	case <-time.After(5 * time.Second): // Set a timeout (e.g., 30 seconds)
		// Timeout occurred, no match found yet
		c.JSON(http.StatusOK, gin.H{"message": "No match found yet, keep waiting"})
	case <-c.Request.Context().Done():
		// Client disconnected or canceled the request
		return
	}

	//c.JSON(http.StatusInternalServerError, gin.H{"x": "x"})
}
