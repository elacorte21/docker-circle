# Use the official Node.js image as a base
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon or ts-node-dev (for TypeScript projects)
RUN npm install -g nodemon  # Or use ts-node-dev for TypeScript

# Copy all files
COPY . .

# Expose the Express app port
EXPOSE 4000

# Use nodemon to watch for changes in the source code
CMD ["nodemon", "--legacy-watch", "dist/index.js"]
