FROM node:14.15.1-alpine As build
WORKDIR /app
COPY . .
RUN npm install
COPY . /app
RUN npm run build --prod

#stage 2
FROM nginx:latest
COPY --from=build /app/dist/digi-comp  /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf