# Kinetia — Plataforma de Rendimiento Deportivo

Kinetia es una plataforma SaaS de análisis de rendimiento deportivo para equipos de fútbol. Permite gestionar jugadores, partidos, estadísticas, evaluaciones físicas, lesiones y sesiones de entrenamiento.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Ruby on Rails 7.1 (API-only) |
| Frontend | React 18 + TypeScript + Vite |
| Base de datos | PostgreSQL 15 |
| Estilos | Tailwind CSS |
| Gráficos | Recharts |
| Auth | JWT |
| Contenedores | Docker + Docker Compose |

## Inicio rápido

### Requisitos
- Docker Desktop instalado y en ejecución

### Levantar el proyecto

```bash
docker compose up
```

Esto iniciará automáticamente:
1. **PostgreSQL** en el puerto 5432
2. **Rails API** en el puerto 3000 (con migraciones y seeds automáticos)
3. **React frontend** en el puerto 5173

### Acceder a la aplicación

Visita [http://localhost:5173](http://localhost:5173)

### Credenciales de demo

| Usuario | Email | Contraseña | Rol |
|---------|-------|-----------|-----|
| Demo Usuario | demo@kinetia.app | demo123 | admin |
| Administrador | admin@kinetia.app | admin123 | admin |
| Carlos Entrenador | entrenador@kinetia.app | entrenador123 | entrenador |

Usa el botón **"Explorar demo"** en la pantalla de login para acceso inmediato.

## Estructura del proyecto

```
kinetia/
├── apps/
│   ├── api/          # Ruby on Rails 7 API-only
│   └── web/          # React + TypeScript + Vite
├── packages/
│   └── ui/           # Componentes compartidos
├── docker-compose.yml
└── README.md
```

## API Endpoints

Todos los endpoints requieren header `Authorization: Bearer <token>` excepto los de auth.

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/v1/login | Iniciar sesión |
| POST | /api/v1/demo | Login demo |
| GET | /api/v1/dashboard | Métricas del dashboard |
| GET/POST | /api/v1/jugadores | Lista / crear jugador |
| GET/PUT/DELETE | /api/v1/jugadores/:id | Detalle / editar / desactivar |
| GET/POST | /api/v1/equipos | Lista / crear equipo |
| GET/POST | /api/v1/partidos | Lista / crear partido |
| GET/POST | /api/v1/estadisticas | Estadísticas de jugadores |
| GET/POST | /api/v1/evaluaciones_fisicas | Evaluaciones físicas |
| GET/POST | /api/v1/sesiones_entrenamiento | Sesiones de entrenamiento |
| GET/POST | /api/v1/lesiones | Lesiones |
| GET/POST | /api/v1/usuarios | Usuarios del sistema |

## Datos de prueba (seeds)

El seed crea automáticamente:
- **3 equipos**: Real Madrid B, Barcelona B, Atlético Juvenil
- **40 jugadores** distribuidos entre los equipos
- **10 partidos** finalizados con estadísticas completas
- **220 estadísticas** de jugadores
- **160 evaluaciones físicas** (4 por jugador)
- **6 sesiones de entrenamiento**
- **5 lesiones**

## Desarrollo local (sin Docker)

### API
```bash
cd apps/api
bundle install
rails db:create db:migrate db:seed
rails server
```

### Web
```bash
cd apps/web
npm install
npm run dev
```
