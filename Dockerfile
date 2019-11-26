FROM node:10.13-alpine
ENV NODE_ENV dev
WORKDIR /home/node/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent 
EXPOSE 3000