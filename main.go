package main

import (
	"embed"
	"fmt"
	"log"
	"os"

	"github.com/engelsjk/valid8/internal"
	"github.com/engelsjk/valid8/internal/handler"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

//go:embed web/build
var embeddedFiles embed.FS

func main() {

	if len(os.Args) != 2 {
		panic(fmt.Errorf("must provide config path arg"))
	}

	configPath := os.Args[1]

	cfg, err := internal.NewConfig(configPath)
	if err != nil {
		panic(err)
	}

	app := fiber.New()
	app.Use(logger.New())

	handler.NewAPI(cfg.APIDir).Register(app.Group("/api"))
	handler.NewStatic(cfg.StaticDir, embeddedFiles).Register(app.Group("/"))

	log.Fatal(app.Listen(cfg.Addr))
}
