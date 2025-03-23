# dropper 

Dropper is a web app that lets you upload your files to the cloud based storage.

This repo holds code for the Front-End Dropper application.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Containerized Setup

Build the image:

```sh
# go to the root directory of the project (where Dockerfile resides)
docker build -t dropper-frontend . 
```

Run the image
```sh
docker run --rm --name dropper-frontend --network dropper -p 8000:8000 -e BACKEND_ENDPOINT=http://dropper-backend-url:3000 dropper-frontend
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
