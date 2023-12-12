package roulette

import (
	"context"
	"log"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/blendify-app/mothership/hermes/internal/ws"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RouletteRoutes(sg *gin.RouterGroup, db *mongo.Database, hub *ws.Hub) {
	rouletteGroup := sg.Group("/roulette")
	{
		rouletteGroup.GET("/join", func(c *gin.Context) {
			rouletteRepository := NewRepository(db.Client())
			join(c, hub, rouletteRepository)
		})
	}
}

func join(c *gin.Context, hub *ws.Hub, rouletteRepository Repository) {
	// customClaims, err := middleware.GetCustomClaims(c)
	// if err != nil {
	// 	log.Printf("hermes_error: %v", err)
	// 	c.JSON(http.StatusInternalServerError, gin.H{
	// 		"error": "Failed to join roulette pool",
	// 	})
	// 	return
	// }

	// Upgrade to websocket connection
	// ws.ServeWs(hub, c, customClaims)

	// rouletteService := NewService(rouletteRepository)
	// oid := primitive.NewObjectID()
	// rouletteParticipant := Roulette{
	// 	ID:     oid.Hex(),
	// 	Object: RouletteObject,
	// 	UserID: customClaims.Sub,
	// }

	// _, err = rouletteService.Create(c.Request.Context(), rouletteParticipant)
	// if err != nil {
	// 	if mongo.IsDuplicateKeyError(err) {
	// 		c.JSON(http.StatusOK, gin.H{"message": "User already in the roulette pool"})
	// 		return
	// 	}

	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to join roulette pool"})
	// 	return
	// }

	// // Create a new context for the findMatch goroutine
	// ctx, cancel := context.WithCancel(context.Background())
	// defer cancel()
	// done := make(chan struct{})
	// // Async method to start searching for a match
	// go findMatch(ctx, rouletteRepository, customClaims, done)

	// // Long-polling mechanism with timeout
	// select {
	// case <-done:
	// 	log.Printf("FindRandom is done")
	// 	// Handle the case when FindRandom is done
	// 	return
	// }
}

func findMatch(ctx context.Context, rouletteRepository Repository, claims *middleware.CustomClaims, done chan<- struct{}) {
	log.Printf("finding a match for: %v", claims.Sub)
	rouletteRepository.FindRandom(ctx, claims.Sub, done)
}
