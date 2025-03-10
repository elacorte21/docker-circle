#!/bin/bash

echo 'Installing backend dependencies...'
cd backend || exit 1   # Navigate to backend directory, exit if it fails
npm install
cd ..  # Go back to the root directory

sleep 5

echo 'Installing frontend dependencies...'
cd frontend || exit 1  # Navigate to frontend directory, exit if it fails
npm install
cd ..  # Go back to the root directory

echo 'Installation complete'