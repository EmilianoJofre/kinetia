# Kinetia — Plataforma de Rendimiento Deportivo

Kinetia es una plataforma SaaS de análisis y rendimiento deportivo para equipos de rugby. Permite gestionar jugadores, partidos, estadísticas, evaluaciones físicas, lesiones y sesiones de entrenamiento.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Ruby on Rails 7.1 (API-only) |
| Frontend | React 18 + TypeScript + Vite |
| Base de datos | PostgreSQL 15 |
| Estilos | Tailwind CSS |
| Gráficos | Recharts |
| Auth | JWT (24h expiry) |
| Contenedores | Docker + Docker Compose |
| Proxy (prod) | Caddy 2 (HTTPS automático) |

---

## Estructura del proyecto

```
kinetia/
├── apps/
│   ├── api/              # Ruby on Rails 7 API-only
│   └── web/              # React + TypeScript + Vite
├── infra/
│   └── Caddyfile         # Config del reverse proxy (producción)
├── docker-compose.yml    # Entorno de desarrollo
├── docker-compose.prod.yml  # Entorno de producción
├── deploy.sh             # Script de deploy manual
└── .env.prod.example     # Variables de entorno de producción (template)
```

---

## Desarrollo local

### Requisitos
- Docker Desktop instalado y en ejecución

### Levantar el proyecto

```bash
docker compose up
```

Esto inicia automáticamente:
1. **PostgreSQL** en el puerto 5432
2. **Rails API** en el puerto 3000 (con migraciones y seeds automáticos)
3. **React frontend** en el puerto 5173

Visita [http://localhost:5173](http://localhost:5173)

### Sin Docker

```bash
# API
cd apps/api
bundle install
rails db:create db:migrate db:seed
rails server

# Frontend
cd apps/web
npm install
npm run dev
```

### Credenciales de demo

| Usuario | Email | Contraseña | Rol |
|---------|-------|-----------|-----|
| Demo Usuario | demo@kinetia.app | demo123 | admin |
| Administrador | admin@kinetia.app | admin123 | admin |
| Carlos Entrenador | entrenador@kinetia.app | entrenador123 | entrenador |

Usa el botón **"Explorar demo"** en la pantalla de login para acceso inmediato.

---

## Producción

### Infraestructura

- **Servidor:** AWS Lightsail — instancia Ubuntu única
- **IP pública:** 35.174.149.153
- **Dominio:** kinetia.cl
- **Proyecto en servidor:** `/opt/kinetia`
- **Acceso SSH:** `~/.ssh/kinetia-prod.pem`

### Arquitectura en producción

```
Internet
   │
   ▼
Caddy :80/:443  (HTTPS automático, Let's Encrypt)
   ├── /api/*  →  Rails API  :3000
   └── /*      →  Nginx (React SPA)  :80
                       │
                   PostgreSQL :5432 (interno)
```

Todos los servicios corren como contenedores Docker en la misma instancia.

### Variables de entorno

El servidor necesita un archivo `/opt/kinetia/.env.prod` con las siguientes variables:

```env
DB_USER=kinetia
DB_PASSWORD=<password fuerte>
RAILS_ENV=production
SECRET_KEY_BASE=<openssl rand -hex 64>
JWT_SECRET=<openssl rand -hex 32>
```

Para generar valores seguros:
```bash
openssl rand -hex 64   # SECRET_KEY_BASE
openssl rand -hex 32   # JWT_SECRET
```

> `.env.prod` nunca debe commitearse. Ver `.env.prod.example` como referencia.

### Conectarse al servidor por SSH

```bash
ssh -i ~/.ssh/kinetia-prod.pem ubuntu@35.174.149.153
```

---

## Deploy

### Flujo completo

```
feature branch → staging → main → deploy en servidor
```

### Pasos

**1. Desde tu computador — mergear staging a main:**

```bash
git checkout main
git pull origin main
git merge staging
git push origin main
```

**2. Desde tu computador — ejecutar el deploy remoto:**

```bash
ssh -i ~/.ssh/kinetia-prod.pem ubuntu@35.174.149.153 'cd /opt/kinetia && ./deploy.sh'
```

O si prefieres conectarte primero:

```bash
ssh -i ~/.ssh/kinetia-prod.pem ubuntu@35.174.149.153
cd /opt/kinetia
./deploy.sh
```

### Qué hace deploy.sh

```bash
git pull origin main                          # 1. Baja el código nuevo
docker compose -f docker-compose.prod.yml \   # 2. Rebuild y restart sin downtime
  --env-file .env.prod up -d --build \
  --remove-orphans
docker image prune -f                         # 3. Limpia imágenes huérfanas
docker compose -f docker-compose.prod.yml ps  # 4. Muestra estado final
```

El API corre las migraciones automáticamente al iniciar.

### Verificar que el deploy fue exitoso

```bash
# Estado de los contenedores
docker compose -f docker-compose.prod.yml ps

# Logs del API (últimas 50 líneas)
docker compose -f docker-compose.prod.yml logs api --tail=50

# Logs del frontend
docker compose -f docker-compose.prod.yml logs web --tail=20

# Logs de Caddy (proxy)
docker compose -f docker-compose.prod.yml logs caddy --tail=20
```

**Estado esperado:**

```
kinetia-api-1    Up    3000/tcp
kinetia-web-1    Up    80/tcp
kinetia-caddy-1  Up    0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
kinetia-db-1     Up (healthy)   5432/tcp
```

---

## API Endpoints

Todos los endpoints requieren header `Authorization: Bearer <token>` excepto los de auth.

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/v1/login | Iniciar sesión |
| POST | /api/v1/demo | Login demo |
| GET | /api/v1/dashboard | Métricas del dashboard |
| GET/POST | /api/v1/jugadores | Lista / crear jugador |
| GET/PUT/DELETE | /api/v1/jugadores/:id | Detalle / editar / eliminar |
| GET/POST | /api/v1/equipos | Lista / crear equipo |
| GET/PUT/DELETE | /api/v1/equipos/:id | Detalle / editar / eliminar |
| GET/POST | /api/v1/partidos | Lista / crear partido |
| GET/PUT/DELETE | /api/v1/partidos/:id | Detalle / editar / eliminar |
| GET/POST | /api/v1/estadisticas | Estadísticas de jugadores |
| GET/POST | /api/v1/evaluaciones_fisicas | Evaluaciones físicas |
| GET/POST | /api/v1/sesiones_entrenamiento | Sesiones de entrenamiento |
| GET/POST | /api/v1/lesiones | Lesiones |
| GET/POST | /api/v1/usuarios | Usuarios del sistema |

### Autenticación

```bash
# Login
curl -X POST https://kinetia.cl/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@kinetia.app", "password": "admin123"}'

# Usar el token
curl https://kinetia.cl/api/v1/jugadores \
  -H "Authorization: Bearer <token>"
```

---

## Modelos de base de datos

| Tabla | Descripción |
|-------|-------------|
| `usuarios` | Usuarios del sistema (roles: admin, entrenador, analista) |
| `equipos` | Equipos (nombre, categoría, temporada) |
| `jugadores` | Jugadores (posición, número, equipo, datos físicos) |
| `partidos` | Partidos (local/visitante, marcador, estado) |
| `estadisticas_jugador` | Stats por partido (tries, tackles, metros, tarjetas...) |
| `evaluaciones_fisicas` | Métricas físicas (velocidad, VO2 max, fuerza...) |
| `sesiones_entrenamiento` | Sesiones de entrenamiento |
| `lesiones` | Registro de lesiones y recuperación |

### Posiciones de rugby disponibles

`prop_pilar`, `hooker_talonador`, `lock_segunda_linea`, `flanker_ala`, `numero_8`, `scrum_half_medio_scrum`, `fly_half_apertura`, `center_centro`, `wing_ala`, `fullback_zaguero`

---

## Datos de prueba (seeds)

El seed crea automáticamente:
- **3 equipos** de rugby
- **40 jugadores** distribuidos entre los equipos
- **10 partidos** finalizados con estadísticas completas
- **220 estadísticas** de jugadores
- **160 evaluaciones físicas** (4 por jugador)
- **6 sesiones de entrenamiento**
- **5 lesiones**

Para correr los seeds en producción:

```bash
ssh -i ~/.ssh/kinetia-prod.pem ubuntu@35.174.149.153
docker compose -f /opt/kinetia/docker-compose.prod.yml exec api rails db:seed
```

---

## Troubleshooting

### Contenedor del API no levanta

```bash
docker compose -f docker-compose.prod.yml logs api --tail=100
```

Causas comunes:
- Variables de entorno faltantes en `.env.prod` (ver sección de variables)
- Migración fallida — revisar los logs para el error específico

### Error de base de datos

```bash
# Conectarse a PostgreSQL
docker compose -f docker-compose.prod.yml exec db psql -U $DB_USER -d kinetia_production

# Correr migraciones manualmente
docker compose -f docker-compose.prod.yml exec api rails db:migrate
```

### Caddy no sirve HTTPS

```bash
docker compose -f docker-compose.prod.yml logs caddy --tail=50
```

Verificar que el dominio `kinetia.cl` apunte a la IP `35.174.149.153` y que los puertos 80 y 443 estén abiertos en el Firewall de Lightsail.

### Ver todos los logs en tiempo real

```bash
docker compose -f docker-compose.prod.yml logs -f
```
