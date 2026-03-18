#!/bin/bash
# deploy.sh — Actualiza y reinicia Kinetia en producción
# Ejecutar desde /opt/kinetia en el servidor

set -e

echo "🚀 Desplegando Kinetia..."

# 1. Pull del código más reciente
git pull origin main

# 2. Rebuild y restart (sin downtime en db)
docker compose -f docker-compose.prod.yml --env-file .env.prod \
  up -d --build --remove-orphans

# 3. Limpiar imágenes huérfanas
docker image prune -f

echo "✅ Deploy completado"
docker compose -f docker-compose.prod.yml ps
