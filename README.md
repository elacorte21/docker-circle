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

### Script permission issue fix

```bash
chmod +x script/install.sh
```
