@echo off
setlocal enabledelayedexpansion

:: Read the current version number
set /p version=<version.txt

:: Increment the version number
set /a version+=1

:: Write the new version number back to the file
echo !version!>version.txt

docker build -t ilyas0v/my-node-microservice:%version% .
docker tag ilyas0v/my-node-microservice:%version% ilyas0v/my-node-microservice:latest
docker push ilyas0v/my-node-microservice:%version%
::kubectl rollout restart deployment service-a -n nodejs-app
::kubectl rollout restart deployment service-b -n nodejs-app