package rooms

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RoomRoutes(sg *gin.RouterGroup, db *mongo.Database) {
	roomGroup := sg.Group("/room")
	{
		roomGroup.GET("/joinroom", func(c *gin.Context) {
			c.Status(200)
		})
	}
}
