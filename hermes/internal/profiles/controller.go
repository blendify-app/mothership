package profiles

import (
	"log"
	"net/http"

	middleware "github.com/blendify-app/mothership/hermes/internal/auth"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
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
	}

	c.JSON(http.StatusOK, userProfile)
}
