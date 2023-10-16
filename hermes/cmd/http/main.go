package main

import (
    "github.com/blendify-app/mothership/hermes/config"
    "fmt"
    "os"
)


func main() {
    _, err := config.LoadConfig()  

    if err != nil {
        fmt.Printf("hermes_error: %v", err.Error())
        os.Exit(1)
    }





}
