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
	// Perform custom validation here (Auth provider takes care of this, I think)
	return nil
}

// Create a new JWT validator using the provided environment variables
func newJWTValidator(envVars *config.EnvVars) *validator.Validator {
	issuerURL, err := url.Parse("https://" + envVars.AUTH0_DOMAIN + "/")
	if err != nil {
		log.Printf("Failed to parse the issuer URL: %v", err)
		return nil
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
		return nil
	}

	return jwtValidator
}

// ExtractJWTClaims returns a middleware that extracts JWT claims from the request context
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

// GetCustomClaims retrieves custom claims from the context
func GetCustomClaims(c *gin.Context) (*CustomClaims, error) {
	customClaims_, ok := c.Get("customClaims")
	if !ok {
		return nil, fmt.Errorf("failed to get payload map from custom claims")
	}

	return customClaims_.(*CustomClaims), nil
}

// AuthorizeWSConnection authorizes a websocket connection using JWT token
func AuthorizeWSConnection(c *gin.Context, envVars *config.EnvVars) *CustomClaims {
	token := c.Query("token")
	jwtValidator := newJWTValidator(envVars)

	validatedClaims, err := jwtValidator.ValidateToken(c, token)
	if err != nil {
		log.Printf("%v", err)
		return nil
	}

	customClaims, ok := (validatedClaims.(*validator.ValidatedClaims)).CustomClaims.(*CustomClaims)
	if !ok {
		log.Println("Failed to extract custom claims from token")
		return nil
	}

	return customClaims
}

// Setup configures middleware for the Gin engine
func Setup(r *gin.Engine, db *mongo.Database, envVars *config.EnvVars) {
	log.Printf("hermes: setting up middleware")

	jwtValidator := newJWTValidator(envVars)
	middleware := jwtmiddleware.New(jwtValidator.ValidateToken)

	r.Use(cors.Default())
	r.Use(adapter.Wrap(middleware.CheckJWT))
	r.Use(ExtractJWTClaims())
}
