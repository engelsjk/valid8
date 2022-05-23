tidy:
	go mod tidy
run: tidy
	go run main.go
build-linux-amd64:
	env GOOS=linux GOARCH=amd64 go build -o bin/valid8-go main.go