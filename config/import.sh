#!/bin/bash

if ! mongo --host mongodb_pokemon -u root -p password --authenticationDatabase admin --eval "quit(db.getSiblingDB(\"pokemon\").getCollectionNames().length === 0 ? 0 : 1)" --quiet; then
  echo "Database or collection already exists. Skipping import."
else
  mongoimport --host mongodb_pokemon -u root -p password --authenticationDatabase admin --db pokemon --collection gen1 --type json --file /config/data/pokemon-gen1.json --jsonArray
fi
