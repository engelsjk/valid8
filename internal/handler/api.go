package handler

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"path"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type API struct {
	path string
}

func NewAPI(path string) API {
	rand.Seed(time.Now().Unix())
	return API{path: path}
}

func (a API) Register(group fiber.Router) {
	group.Get("/tasks/:task/random", a.GetTaskRandomID)
	group.Get("/tasks/:task/:id", a.GetTaskByID)
	group.Post("/results/:result/:id", a.SaveResults)
}

func (a API) loadTaskFile(task, id string) ([]byte, error) {
	fn := path.Join(a.path, "tasks", task, id)
	return os.ReadFile(fn)
}

func (a API) GetTaskByID(c *fiber.Ctx) error {
	task := c.Params("task")
	id := c.Params("id")

	b, err := a.loadTaskFile(task, id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "task file not found or unable to read",
		})
	}

	c.Set("Content-type", "application/json; charset=utf-8")
	return c.Send(b)
}

func (a API) GetTaskRandomID(c *fiber.Ctx) error {
	task := c.Params("task")

	fp := path.Join(a.path, "tasks", task)

	f, err := os.Open(fp)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "task dir not found",
		})
	}

	files, err := f.Readdir(-1)
	f.Close()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "unable to read task dir",
		})
	}

	file := files[rand.Intn(len(files))]

	b, err := a.loadTaskFile(task, file.Name())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "task file not found or unable to read",
		})
	}

	c.Set("Content-type", "application/json; charset=utf-8")
	return c.Send(b)
}

func (a API) SaveResults(c *fiber.Ctx) error {

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
