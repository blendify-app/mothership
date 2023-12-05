package users

import (
	"log"
	"net/http"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/blendify-app/mothership/hermes/internal/profiles"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func UserRoutes(r *gin.Engine, sg *gin.RouterGroup, db *mongo.Database) {
	usersGroup := sg.Group("/users")
	{
		usersGroup.POST("/authorize", func(c *gin.Context) {
			userRepository := NewRepository(db.Client())
			profileRepository := profiles.NewRepository(db.Client())
			authorize(c, userRepository, profileRepository)
		})
	}
}

func authorize(c *gin.Context, userRepository Repository, profileRepository profiles.Repository) {
	customClaims, err := middleware.GetCustomClaims(c)
	if err != nil {
		log.Printf("%v", err)
		c.JSON(http.StatusUnauthorized, gin.H{
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
			oid := primitive.NewObjectID()
			newProfile := profiles.Profile{
				ID:     oid.Hex(),
				Object: profiles.ProfileObject,
				UserID: customClaims.Sub,
				Basic: profiles.Basic{
					Email:    customClaims.Email,
					Name:     customClaims.Name,
					Nickname: customClaims.Nickname,
					Picture:  customClaims.Picture},
			}

			profileService := profiles.NewService(profileRepository)
			_, err := profileService.Create(c.Request.Context(), newProfile)
			if err != nil {
				log.Printf("%v", err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to create profile for user",
				})
				return
			}

			newUser := User{
				ID:      customClaims.Sub,
				Object:  UserObject,
				Name:    customClaims.Name,
				Email:   customClaims.Email,
				Profile: oid.Hex(),
			}

			user, err := userService.Create(c.Request.Context(), newUser)
			if err != nil {
				log.Printf("%v", err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to create user",
				})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"message": "User created",
				"data":    user,
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
		"message": "User logged in",
		"data":    existingUser,
	})
}
