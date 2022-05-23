package main

import (
	"embed"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"path"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

//go:embed build
var content embed.FS

func main() {
	addr := os.Getenv("ADDR")

	e := echo.New()
	e.Use(middleware.Logger())

	e.Validator = &CustomValidator{validator: validator.New()}

	// SPA
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "build",
		Index:  "index.html",
		Browse: false,
		HTML5:  true,
	}))

	// API
	e.Static("/api/", "api")
	e.POST("/api/result/:result/:id", uploadResult)

	e.Logger.Fatal(e.Start(addr))
}

type (
	Result struct {
		TaskID string  `json:"taskID" validate:"required"`
		LogTS  int     `json:"logTS" validate:"required"`
		NewLat float64 `json:"newLat" validate:"required"`
		NewLon float64 `json:"newLon" validate:"required"`
	}

	CustomValidator struct {
		validator *validator.Validate
	}
)

func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.validator.Struct(i); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func uploadResult(c echo.Context) error {
	result := c.Param("result")
	id := c.Param("id")

	r := new(Result)
	if err := c.Bind(r); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid result data")
	}
	if err := c.Validate(r); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid result data")
	}

	fn := path.Join("api", "result", result, id)

	j, err := json.MarshalIndent(r, "", " ")
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "unable to save result data")
	}

	if err := ioutil.WriteFile(fn, j, 0644); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "unable to save result data")
	}

	return c.JSON(http.StatusOK, r)
}
