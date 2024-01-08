package roulette

import (
	"context"
	"log"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RouletteRoutes(sg *gin.RouterGroup, db *mongo.Database) {
	rouletteGroup := sg.Group("/roulette")
	{
		rouletteGroup.GET("/join", func(c *gin.Context) {
			c.Status(200)
		})
	}
}

func FindMatch(ctx context.Context, rouletteRepository Repository, claims *middleware.CustomClaims, done chan<- struct{}) {
	log.Printf("finding a match for: %v", claims.Sub)
	rouletteRepository.FindRandom(ctx, claims.Sub, done)
}
