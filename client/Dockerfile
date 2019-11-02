FROM node:alpine

RUN mkdir /node
ADD ./yarn.* ./package.json /node/
WORKDIR /node
RUN yarn

RUN mkdir /code
WORKDIR /code
ADD . /code/

ENV CHOKIDAR_USEPOLLING=true
ENTRYPOINT [ "sh", "docker-entrypoint.sh" ]
