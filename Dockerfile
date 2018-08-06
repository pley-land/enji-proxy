FROM node:7.6-alpine

RUN mkdir -p /usr/src/proxy

# Create app directory
WORKDIR /usr/src/proxy

COPY . /usr/src/proxy

RUN npm install

# Bundle app source

EXPOSE 3000

CMD [ "npm", "start" ]
