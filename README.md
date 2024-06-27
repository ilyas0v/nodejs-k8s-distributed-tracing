# Sample Node.js Microservices Application with Elastic APM and Zipkin integrated

This repository aims to create a cloud-native application that implements 2 different distributed tracing tools: Elastic APM and Zipkin, and to compare their performance and features.

Here is the basic architecture of the setup:

![image](https://github.com/ilyas0v/gke-nodejs-microservices/assets/14857161/22d90ecd-7539-4eac-95ae-56f7e40f8568)

## Project Structure

- **src/index.ts**: This is the entry point of the application. It starts the corresponding service specified via the `SERVICE_TYPE` environment variable.
- **k8s**: This folder contains the configuration files for the deployments, services, configuration, and ingress of the application.
- **elastic**: This folder contains the deployment and services for APM Server, Elasticsearch, and Kibana.
- **zipkin.yaml**: This file contains the deployment and service configuration for the Zipkin server.

## Build and Deployment

- **build.bat**: This script builds the application as a Docker image and pushes it to the Docker Hub registry.

## Steps to run on kubernetes
- build the application as docker image. Update the deployment files accordingly in  ./k8s/service-x.yaml
- then apply the deployments and services: 

```
kubectl apply -f ./k8s/service-a.yaml
kubectl apply -f ./k8s/service-b.yaml
kubectl apply -f ./k8s/service-c.yaml
```

- set the config variables:
`kubectl apply -f ./k8s/config.yaml`

- configure the ingress to combine services in a load balancer:

`kubectl apply -f ./k8s/ingress.yaml`

- configure the Elastic APM and related services:

```
kubectl apply -f ./elastic/elastic.yaml
kubectl apply -f ./elastic/apm-server.yaml
kubectl apply -f ./elastic/kibana.yaml
```


##### After doing these, the application services, and elastic services will be up and running. Check them by their ports accordingly. The Elastic APM will be accessible via Kibana dashboard.

## Testing routes

```
curl ${APP_HOST}/service-a/
curl ${APP_HOST}/service-a/routeWithLongOperation
curl ${APP_HOST}/service-a/routeWithError
```

## Check the Kibana dashboard -> APM -> Services and Traces

| Page            | Image                                                                 |
|-----------------------|----------------------------------------------------------------------|
| **Services Overview** | ![services overview](https://github.com/ilyas0v/gke-nodejs-microservices/assets/14857161/b39e590d-866c-46f9-b4f2-cf1ca467f6e2) |
| **Traces Overview**  | ![tracing overview](https://github.com/ilyas0v/gke-nodejs-microservices/assets/14857161/d138c0e0-6240-45b6-ba3a-f7eab1cc47d9) |
| **Timeline View**   | ![timeline normal](https://github.com/ilyas0v/gke-nodejs-microservices/assets/14857161/54b8b914-9bc2-46eb-b02c-34bebeae7f27) |



## Simple benchmarking to test the impact of each tool on application latency
The Autocannon tool was used to run load testing for 30 seconds with 10 connections. Here are some insights:

| Metric              | Without tools | With Zipkin   | With Elastic APM |
|---------------------|---------------|---------------|------------------|
| **Average latency** | 204.38 ms     | 242.56 ms     | 277.77 ms        |
| **Requests per sec**| 84.7          | 54.6          | 43.3             |
| **Bytes/sec**       | 19.3 kb/sec   | 12.4 kb/sec   | 9.87 kb/sec      |
