package middleware

import (
	"context"
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

type CustomClaims struct {
	Sub      string `json:"sub"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Nickname string `json:"nickname"`
	Picture  string `json:"picture"`
}

func (c *CustomClaims) Validate(ctx context.Context) error {
	return nil
}

func Setup(r *gin.Engine, db *mongo.Database) {
	envVars, err := config.LoadConfig()
	if err != nil {
		fmt.Printf("Hermes error: %v", err.Error())
	}

	issuerURL, err := url.Parse("https://" + envVars.AUTH0_DOMAIN + "/")
	if err != nil {
		log.Printf("Failed to parse the issuer URL: %v", err)
		return
	}

	provider := jwks.NewCachingProvider(issuerURL, time.Duration(5*time.Minute))

	jwtValidator, err := validator.New(
		provider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{envVars.AUTH0_AUDIENCE},
		validator.WithAllowedClockSkew(time.Minute),
		validator.WithCustomClaims(func() validator.CustomClaims {
			return &CustomClaims{}
		}),
	)
	if err != nil {
		log.Printf("Failed to set up the jwt validator: %v", err)
		return
	}

	middleware := jwtmiddleware.New(jwtValidator.ValidateToken)

	r.Use(cors.Default())
	r.Use(adapter.Wrap(middleware.CheckJWT))
	r.Use(ExtractJWTClaims())
}

func ExtractJWTClaims() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, ok := c.Request.Context().Value(jwtmiddleware.ContextKey{}).(*validator.ValidatedClaims)
		if !ok {
			log.Println("Failed to extract claims from token")
		}

		customClaims, ok := claims.CustomClaims.(*CustomClaims)
		if !ok {
			log.Println("Failed to extract custom claims from token")
		}

		c.Set("customClaims", customClaims)
		c.Next()
	}
}

func GetCustomClaims(c *gin.Context) (*CustomClaims, error) {
	customClaims_, ok := c.Get("customClaims")
	if !ok {
		return nil, fmt.Errorf("failed to get payload map from custom claims")
	}

	return customClaims_.(*CustomClaims), nil
}
