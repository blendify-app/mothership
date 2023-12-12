package profiles

import (
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/blendify-app/mothership/hermes/internal/utils"
	"github.com/gin-gonic/gin"
)

func ProfileRoutes(r *gin.Engine, sg *gin.RouterGroup, db *mongo.Database) {
	profilesGroup := sg.Group("/profiles")
	{
		profileRepository := NewRepository(db.Client())
		profilesGroup.GET("/me", func(c *gin.Context) {
			getProfile(c, profileRepository)
		})
		profilesGroup.GET("/:profile_id", func(c *gin.Context) {
			getProfile(c, profileRepository)
		})
		profilesGroup.POST("/edit", func(c *gin.Context) {
			updateProfile(c, profileRepository)
		})
	}
}

func getProfile(c *gin.Context, profileRepository Repository) {
	// Get profile based on the request type
	profileID := c.Param("profile_id")

	if profileID == "" {
		customClaims, err := middleware.GetCustomClaims(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to authorize user",
			})
			return
		}
		profileID = customClaims.Sub
	}

	profileService := NewService(profileRepository)
	userProfile, err := profileService.Get(c.Request.Context(), profileID)
	if err != nil {
		log.Printf("%v", err)
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Failed to get profile",
		})
		return
	}

	c.JSON(http.StatusOK, userProfile)
}

func updateProfile(c *gin.Context, profileRepository Repository) {
	customClaims, err := middleware.GetCustomClaims(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to authorize user",
		})
		return
	}

	var requestData map[string]interface{}
	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Malformed request"})
		return
	}

	userID := customClaims.Sub
	log.Printf("Request data: %v", requestData)

	flattenedData := utils.Flatten(requestData)

	updateData := map[string]interface{}{
		"filter": bson.M{"user_id": userID},
		"update": bson.M{"$set": flattenedData},
	}

	_, err = profileRepository.Update(c.Request.Context(), updateData)
	if err != nil {
		log.Printf("%v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to edit profile for user",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Profile edited successfully",
	})
}
