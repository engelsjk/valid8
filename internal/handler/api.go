package handler

import (
	"encoding/json"
	"io/ioutil"
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
	group.Get("/task/:task/:id", a.Get)
	group.Post("/result/:result/:id", a.Post)
}

func (a API) Get(c *fiber.Ctx) error {
	task := c.Params("task")
	id := c.Params("id")

	fn := path.Join(a.path, "task", task, id)

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

	fn := path.Join(a.path, "result", result, id)

	j, err := json.MarshalIndent(r, "", " ")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "unable to save result data",
		})
	}

	if err := ioutil.WriteFile(fn, j, 0644); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "unable to save result data",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "file saved",
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
