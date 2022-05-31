package handler

import (
	"encoding/json"
	"fmt"
	"os"
	"path"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type API struct {
	path string
}

func NewAPI(path string) API {
	return API{path: path}
}

func (a API) Register(group fiber.Router) {
	group.Get("/tasks/:task/:id", a.Get)
	group.Post("/results/:result/:id", a.Post)
}

func (a API) Get(c *fiber.Ctx) error {
	task := c.Params("task")
	id := c.Params("id")

	fn := path.Join(a.path, "tasks", task, id)

	b, err := os.ReadFile(fn)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "task file not found or unable to read",
		})
	}

	c.Set("Content-type", "application/json; charset=utf-8")
	return c.Send(b)
}

func (a API) Post(c *fiber.Ctx) error {

	r := new(Result)

	if err := c.BodyParser(&r); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := ValidateStruct(*r)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}

	result := c.Params("result")
	id := c.Params("id")

	fn := path.Join(a.path, "results", result, id)

	j, err := json.Marshal(r)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "unable to create result data",
		})
	}

	f, err := os.OpenFile(fn, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "unable to open result file",
		})
	}
	defer f.Close()

	if _, err := fmt.Fprintln(f, string(j)); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "unable to write result data to file",
		})
	}

	// if err := ioutil.WriteFile(fn, j, 0644); err != nil {
	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
	// 		"message": "unable to save result data",
	// 	})
	// }

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "results data written to file",
	})
}

type Result struct {
	TaskID string  `json:"taskID" validate:"required"`
	LogTS  int     `json:"logTS" validate:"required"`
	NewLat float64 `json:"newLat" validate:"required"`
	NewLon float64 `json:"newLon" validate:"required"`
}

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

var validate = validator.New()

func ValidateStruct(result Result) []*ErrorResponse {
	var errors []*ErrorResponse
	err := validate.Struct(result)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}
