#!/bin/bash
# deploy.sh — Actualiza y reinicia Kinetia + Panorama en producción
# Ejecutar desde /opt/kinetia en el servidor

set -e

APP=${1:-all}   # ./deploy.sh kinetia | panorama | all

echo "🚀 Desplegando: $APP"

# 1. Pull del código más reciente
git pull origin main

if [ "$APP" = "kinetia" ]; then
  SERVICES="db api web caddy"
elif [ "$APP" = "panorama" ]; then
  SERVICES="panorama_db panorama_api panorama_web caddy"
else
  SERVICES=""  # all
fi

# 2. Rebuild y restart
docker compose -f docker-compose.prod.yml --env-file .env.prod \
  up -d --build --remove-orphans $SERVICES

# 3. Limpiar imágenes huérfanas
docker image prune -f

echo "✅ Deploy completado"
docker compose -f docker-compose.prod.yml ps
