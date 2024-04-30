#!/bin/bash
set -e

# Set the directory of the database in a variable
DB_PATH="$database__connection__filename"

# Restore the database if it does not already exist.
if [ -f $DB_PATH ]; then
	echo "Database already exists, skipping restore"
else
	echo "No database found, restoring from replica if exists"
	litestream restore -if-replica-exists $DB_PATH
    sleep 30s # try to give it time to sync db
fi

# Run litestream with your app as the subprocess.
exec litestream replicate -exec "node current/index.js"
