# Build Stage
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build 
# This run command doesnt work, perhaps because of the structure (docker file not in client...)

# Production Stage
FROM httpd:alpine AS production
COPY --from=build /app/build /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd-foreground"]