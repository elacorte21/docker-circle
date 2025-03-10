# Docker / React / Node.js / Prisma / Express (Ubuntu)

- **Frontend**: React with Vite
- **Backend**: Express with Prisma
- **Database**: PostgreSQL

## Running Docker

- Install `frontend` and `backend` dependencies
- Start the containers for each service (`frontend`, `backend`, and `db`, plus Prisma Studio).
- Migrate the mock data in the DB or manage the data manually via Prisma Studio 
- Available ports: `3000` for React, `4000` for Express, `5555` for Prisma Studio.
  
### Step 1: Clone the repo
```bash
git clone https://github.com/elacorte21/docker-circle.git
```

#### NOTE: If scripts won't run due to permission errors run this code
```bash
chmod +x script/install.sh
```

### Step 2: Install dependencies
```bash
script/install.sh
```

### Step 3: Run Docker Compose
```bash
script/start.sh
```

### Step 4A: Import the mock database
```bash
script/migrate.sh
```

### Step 4B: Manage data on Prisma Studio
```bash
http://localhost:5555/
```

## Frontend and Swagger ports
```bash
http://localhost:3000/
http://localhost:4000/books/api-docs/
```


<!-- sudo chown -R username:username /path/to/directory -->