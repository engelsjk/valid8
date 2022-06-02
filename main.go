package main

import (
	"embed"
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
		log.Fatalf("must provide config path arg")
	}

	configPath := os.Args[1]

	cfg, err := internal.NewConfig(configPath)
	if err != nil {
		log.Fatalf("error reading config file: %v", err)
	}

	app := fiber.New()

	file, err := os.OpenFile("valid8.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()

	app.Use(logger.New(logger.Config{
		Format:     "${time}|${ip}|${cookie:attESHr}|${status}|${method}|${path}\n",
		TimeFormat: "2006-01-02T15:04:05",
		Output:     file,
	}))

	handler.NewAPI(cfg.APIDir).Register(app.Group("/api"))
	handler.NewStatic(cfg.StaticDir, embeddedFiles).Register(app.Group("/"))

	log.Fatal(app.Listen(cfg.Addr))
}
