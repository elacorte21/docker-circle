#!/bin/bash

echo 'Importing mock data...'
docker compose exec backend npm run reset

echo 'Complete'