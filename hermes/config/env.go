package config

import (
    "errors"
    "os"
)

// EnvVars struct defines the structure of environment variables used in the application
type EnvVars struct {
   MONGO_DB_URI string `mapstructure:"MONGO_DB_URI"` // MONGO_DB_URI is the MongoDB server's URI
   MONGO_DB_NAME string `mapstructure:"MONGO_DB_NAME"` // MONGO_DB_NAME is the MongoDB database's Name
   PORT string `mapstructure:"PORT"` // PORT is the application's port
}

// LoadConfig loads environment variables into the EnvVars struct and returns it
func LoadConfig() (config EnvVars, err error) {
    MONGO_DB_URI := os.Getenv("MONGO_DB_URI")
    MONGO_DB_NAME:= os.Getenv("MONGO_DB_NAME")
    PORT := os.Getenv("PORT")

    if MONGO_DB_URI == "" {
        err = errors.New("MONGO_DB_URI is missing")
        return EnvVars{}, err
    } else if MONGO_DB_NAME == ""{
        err = errors.New("MONGO_DB_NAME is missing")
        return EnvVars{}, err
    }

    return EnvVars{
        MONGO_DB_URI: MONGO_DB_URI,
        MONGO_DB_NAME: MONGO_DB_NAME,
        PORT: PORT,
    }, nil
}
