FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Transpile Typescript to Javascript
# I don't understand this command, need to look it up
EXPOSE 4000
CMD ["node","index.ts"]