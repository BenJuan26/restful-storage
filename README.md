# restful-storage

An extremely simple server for storing json documents in local files

## Build and run

Build the docker image:

```shell
docker build . -t restful-storage
```

Create a directory to hold the data:

```shell
mkdir ~/rest-data
```

Run the container and mount the directory:

```shell
docker run -p 3000:3000 -v ~/rest-data:/data restful-storage
```

## Usage

Store data with `PUT`:

```shell
curl -X PUT -H "Content-Type: application/json" -d '{"name": "my JSON document"}' localhost:3000/test
```

That will store the JSON document in `/data/test.json`.

Retrieve the data with `GET`:

```shell
curl localhost:3000/test
```
