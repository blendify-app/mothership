package users

import (
	"log"
	"net/http"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func UserRoutes(r *gin.Engine, sg *gin.RouterGroup, db *mongo.Database) {
	usersGroup := sg.Group("/users")
	{
		usersGroup.POST("/authorize", func(c *gin.Context) {
			userRepository := NewRepository(db.Client())
			authorize(c, userRepository)
		})
	}
}

func authorize(c *gin.Context, userRepository Repository) {
	customClaims, err := middleware.GetCustomClaims(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to authorize user",
		})
		return
	}

	userService := NewService(userRepository)
	// Check if user already exists
	existingUser, err := userService.Get(c.Request.Context(), customClaims.Sub)
	if err != nil {
		if !mongo.IsDuplicateKeyError(err) {
			// User does not exist, create new user
			newUserRequest := CreateUserRequest{
				ID:    customClaims.Sub,
				Name:  customClaims.Name,
				Email: customClaims.Email,
			}

			createdUser, err := userService.Create(c.Request.Context(), newUserRequest)
			if err != nil {
				log.Printf("%v", err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to create user",
				})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"message": "User created successfully",
				"data":    createdUser,
			})
			return
		}

		log.Printf("%v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to get user",
		})
		return
	}

	// User already exists, log them in
	c.JSON(http.StatusOK, gin.H{
		"message": "User logged in successfully",
		"data":    existingUser,
	})
}
