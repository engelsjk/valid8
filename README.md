# valid8

Valid8 is a prototype interface for spatial correctability tasks (locating buildings, moving points, etc). It consists of a Typescript/React web app embedded in a Go binary web service. The web service also reads static task files from disk that can be viewed in the app.

## Run

If you're targeting linux/amd64 architecture, you can use the pre-built binary:

```
bin/valid8-linux-amd64
```

You'll also need a ```config.yaml``` file:

```yaml
addr: ":3000"
static_dir: "web/build"
api_dir: "api"
```

The ```static_dir``` should match the directory location of the built web app (eg ```web/build```). Whereas ```api_dir``` should point to the path where task files are located on disk.

With the binary and the config file in the same directory, run the following to start the service:

```bash
./valid8-linux-amd64 config.yaml
```

The web app should be visible at ```{:port}/```. The api includes the following endpoints:

```
GET {:port}/api/tasks/{task}/{id}
GET {:port}/api/tasks/random
POST {:port}/api/results/{result}/{id}
```

These endpoints are used by the web app to display tasks, retrieve a random task and save task results to a log file.

## Build

First, clone the project.

```bash
git clone https://github.com/engelsjk/valid8
```

```bash
cd valid8
```

Then, you'll need to build the web app. Go to the ```web``` directory and run:

```bash
npm install
npm run build
```

This should build the project at ```web/build```, which is the path that will be embedded in the Go binary.

With the web app built, you can then build the Go binary:

```bash
env GOOS=linux GOARCH=amd64 go build -o bin/valid8-linux-amd64 main.go
```
