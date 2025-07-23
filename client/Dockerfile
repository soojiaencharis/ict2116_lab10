# client/Dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Use nginx to serve the production build
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]