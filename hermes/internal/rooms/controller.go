package rooms

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RouletteRoutes(sg *gin.RouterGroup, db *mongo.Database) {
	rouletteGroup := sg.Group("/room")
	{
		rouletteGroup.GET("/joinroom", func(c *gin.Context) {
			c.Status(200)
		})
	}
}
