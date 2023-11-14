package middleware

import (
	"fmt"
	"log"
	"net/url"
	"time"

	"github.com/blendify-app/mothership/hermes/config"
	"github.com/gin-gonic/gin"

	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	adapter "github.com/gwatts/gin-adapter"
)

func EnsureValidToken(r *gin.Engine) {
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

	middleware := jwtmiddleware.New(jwtValidator.ValidateToken)

	r.Use(adapter.Wrap(middleware.CheckJWT))
}
