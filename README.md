# Sample Node.js Microservices Application with Elastic APM and Zipkin integrated

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

`kubectl apply -f ./k8s/service-a.yaml`

`kubectl apply -f ./k8s/service-b.yaml`

`kubectl apply -f ./k8s/service-c.yaml`

- configure the ingress to combine services in a load balancer:

`kubectl apply -f ./k8s/ingress.yaml`

- configure the Elastic APM and related services:

`kubectl apply -f ./elastic/elastic.yaml`

`kubectl apply -f ./elastic/apm-server.yaml`

`kubectl apply -f ./elastic/kibana.yaml`


##### After doing these, the application services, and elastic services will be up and running. Check them by their ports accordingly. The Elastic APM will be accessible via Kibana dashboard.
