package users

import (
	"context"
	"log"
	"net/http"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func UserRoutes(r *gin.Engine, sg *gin.RouterGroup, db *mongo.Database) {
	usersGroup := sg.Group("/users")
	{
		usersGroup.GET("/authorize", func(c *gin.Context) {
			userRepository := NewRepository(db.Client())
			AddUser(c, userRepository)
		})
	}
}

func AddUser(c *gin.Context, userRepository Repository) {
	customClaims_, ok := c.Get("customClaims")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to get payload map",
		})
		return
	}

	customClaims := customClaims_.(*middleware.CustomClaims)

	userService := NewService(userRepository)

	newUserRequest := CreateUserRequest{
		ID:    customClaims.Sub,
		Name:  customClaims.Name,
		Email: customClaims.Email,
	}

	// Check if user already exists
	existingUser, err := userService.Get(context.TODO(), newUserRequest.Email)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// User does not exist, create new user
			createdUser, err := userService.Create(context.TODO(), newUserRequest)
			if err != nil {
				log.Fatal(err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to create user",
				})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"success": true,
				"message": "User created successfully.",
				"user":    createdUser,
			})
		} else {
			// Handle other types of errors
			log.Fatal(err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to get user",
			})
		}
		return
	}

	// User already exists, log them in
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "User logged in successfully.",
		"user":    existingUser,
	})
}
