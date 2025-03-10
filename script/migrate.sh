#!/bin/bash

echo 'Building database...'
sudo docker compose exec backend npx prisma migrate dev --name init

sleep 5

echo 'Importing mock data...'
sudo docker compose exec backend npm run reset

echo 'Complete'