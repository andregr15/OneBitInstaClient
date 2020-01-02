FROM node:12.14.0-stretch

RUN apt-get update &&  \
    apt-get install -y git wget curl unzip build-essential gcc make && \
    npm install -g cordova@8.1.2 ionic@3.2.0 --allow-root && \
    npm install --save-dev --save-exact @ionic/cli-plugin-ionic-angular@latest && \
    npm cache clear --force

RUN mkdir -p app

WORKDIR /app

COPY . .