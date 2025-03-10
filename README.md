# Docker / React / Node.js project

- **Frontend**: React with Vite
- **Backend**: Express with Prisma
- **Database**: PostgreSQL

### Running the Application

- Build the images for each service (`frontend`, `backend`, and `db`).
- Start the containers with the appropriate settings and networking.
- Expose ports for you to access the frontend and backend services (`3000` for React, `4000` for Express).
  
Make sure to have the appropriate files (`package.json`, `Dockerfile`, etc.) in place in both `frontend` and `backend` directories.

```bash
script/start.sh
```

### Setup and import the database

```bash
script/migrate.sh
```

### Manage table data with Prisma Studio

```bash
script/prisma.sh
```

Here's an example of how you can set up your `docker-compose.yml` file along with the necessary Dockerfiles for each service.

### `docker-compose.yml`

```yaml
services:
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"  # Expose the Vite dev server on port 3000
    environment:
      - VITE_API_URL=http://localhost:4000  # Set environment variable for API URL
    depends_on:
      - backend
    volumes:
      - ./frontend:/app  # Mount the local frontend directory to the container
      - /app/node_modules  # Ensure node_modules persists between restarts
    command: npm run dev  # Run the Vite dev server

  backend:
    build:
      context: ./backend
    ports:
      - "4000:4000"  # Expose Express app on port 4000
      - "5555:5555"  # Expose Prisma Studio port
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/drill_db  # Database connection URL
    depends_on:
      - db
    volumes:
      - ./backend:/app  # Mount the backend directory as well for live-reloading
      - /app/node_modules  # Persist node_modules for backend
    command: npm run dev  # You can specify the command here if it's different
    # You may also want to explicitly use the nodemon command (e.g., for TypeScript):
    # command: ["nodemon", "--legacy-watch", "dist/index.js"]

  db:
    image: postgres:13
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: drill_db
    ports:
      - "5433:5432"  # Expose PostgreSQL on port 5432

```