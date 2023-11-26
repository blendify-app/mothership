package middleware

import (
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"time"

	"github.com/blendify-app/mothership/hermes/config"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"

	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/gin-contrib/cors"
	adapter "github.com/gwatts/gin-adapter"
)

func EnsureValidToken(r *gin.Engine, db *mongo.Database) {
	envVars, err := config.LoadConfig()
	if err != nil {
		fmt.Printf("Hermes error: %v", err.Error())
	}
	issuerURL, err := url.Parse("https://" + envVars.AUTH0_DOMAIN + "/")
	if err != nil {
		log.Fatalf("Failed to parse the issuer URL: %v", err)
		return
	}

	provider := jwks.NewCachingProvider(issuerURL, time.Duration(5*time.Minute))

	jwtValidator, err := validator.New(
		provider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{envVars.AUTH0_AUDIENCE},
		validator.WithAllowedClockSkew(time.Minute),
	)

	if err != nil {
		log.Fatalf("Failed to set up the jwt validator: %v", err)
		return
	}
	r.Use(cors.Default())

	middleware := jwtmiddleware.New(jwtValidator.ValidateToken)
	r.Use(adapter.Wrap(middleware.CheckJWT))
	r.Use(ExtractClaims())
}

func ExtractClaims() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, ok := c.Request.Context().Value(jwtmiddleware.ContextKey{}).(*validator.ValidatedClaims)
		if !ok {
			// Handle error
			log.Fatal("Failed to extract claims from token")
		}

		payload, err := json.Marshal(claims)
		if err != nil {
			log.Fatal("Failed to parse jsw claims")
		}

		payloadMap := make(map[string]interface{})
		err = json.Unmarshal(payload, &payloadMap)
		if err != nil {
			log.Fatal("Failed to convert payload into a map")
		}

		fmt.Println(payloadMap)

		c.Next()
	}
}
