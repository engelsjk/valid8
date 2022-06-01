build-web:
	cd web && npm run build && cd ..
start-web:
	npm start --prefix web	
tidy:
	go mod tidy
run: build-web tidy
	go run main.go config.yaml
build-linux-amd64:
	env GOOS=linux GOARCH=amd64 go build -o bin/valid8-go main.go