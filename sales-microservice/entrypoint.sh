#!/bin/sh
# entrypoint.sh

# Leer secretos y exportarlos como variables de entorno
[ -f /run/secrets/postgres_connection ] && export POSTGRES_URL=$(cat /run/secrets/postgres_connection)
[ -f /run/secrets/postgres_user ] && export POSTGRES_USER=$(cat /run/secrets/postgres_user)
[ -f /run/secrets/postgres_password ] && export POSTGRES_PASSWORD=$(cat /run/secrets/postgres_password)
[ -f /run/secrets/postgres_database ] && export POSTGRES_DB=$(cat /run/secrets/postgres_database)

sleep 5
# Ejecutar migraciones de Prisma
npx prisma migrate deploy

# Ejecutar la aplicación
node dist/app.js
