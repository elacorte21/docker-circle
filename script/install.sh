#!/bin/bash

echo 'Installing backend dependencies...'
docker compose exec backend npm install

sleep 5

echo 'Installing frontend dependencies...'
docker compose exec frontend npm install

echo 'Installation complete'