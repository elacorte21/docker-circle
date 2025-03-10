# Use the official Node.js image as a base
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Expose the Vite development server port
EXPOSE 3000

# Start the Vite dev server
CMD ["npm", "run", "dev"]
