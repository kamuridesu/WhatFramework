FROM node:16.20-alpine
WORKDIR /app
RUN apk update
RUN apk add ffmpeg
RUN apk add git
COPY ./package.json .
RUN npm install
COPY . .
ENTRYPOINT [ "node", "index.js" ]
