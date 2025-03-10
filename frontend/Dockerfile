FROM node:slim

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE 3000

# Start the Vite dev server
CMD ["sh", "-c", "npm run dev"]
