#!/bin/bash

echo 'Building database...'
docker compose exec backend npx prisma migrate dev --name init

sleep 5

echo 'Importing mock data...'
docker compose exec backend npm run reset

echo 'Complete'