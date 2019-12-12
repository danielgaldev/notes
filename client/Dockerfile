FROM node:10.16.3-alpine as builder
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn
COPY . /app/
RUN yarn build

FROM nginx:1.17.5-alpine
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx.prod.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
