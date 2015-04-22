#! /bin/bash

echo "==================  Development Environment Script ====================="
echo "[development_db]Installing nodejs dependencies..."
npm install

echo "[development_db]Finished installing dependencies. If you have encountered npm errors, please quit this task and resolve errors"

echo "[development_db] Now launching Mongodb for development environment..."
echo "[development_db] Will make sure ~/mongodb/ams/data/db/ exists in your filesystem, and you have read/write permissions."
echo "[development_db] checking if ~/mongodb/ams/data/db/ exists..."

if [ -d ~/mongodb/ams/data/db/ ]; then
    echo "[development_db] ~/mongodb/ams/data/db exists. proceeding..."
else
    echo "[development_db] ~/mongodb/ams/data/db doesn't exist. Create path..."
    mkdir ~/mongodb
    mkdir ~/mongodb/ams
    mkdir ~/mongodb/ams/data
    mkdir ~/mongodb/ams/data/db
fi

echo "[development_db] Launch Mongodb"
mongod --dbpath ~/mongodb/ams/data/db
