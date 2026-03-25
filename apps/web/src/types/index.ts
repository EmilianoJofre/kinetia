export interface Usuario {
  id: number
  nombre: string
  email: string
  rol: 'admin' | 'entrenador' | 'analista'
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Equipo {
  id: number
  nombre: string
  categoria: string
  entrenador: string
  temporada: string
  logo_url?: string
  created_at: string
  updated_at: string
}

export interface Jugador {
  id: number
  nombre: string
  apellido: string
  posicion: string
  edad: number
  altura: number
  peso: number
  numero: number
  equipo_id: number
  equipo?: string
  foto_url?: string
  activo: boolean
  created_at: string
  updated_at: string
}

export interface Partido {
  id: number
  equipo_local_id: number
  equipo_visitante_id: number
  equipo_local?: string
  equipo_visitante?: string
  puntos_local: number
  puntos_visitante: number
  competicion?: string
  fecha: string
  estado: 'programado' | 'en_curso' | 'finalizado'
  created_at: string
  updated_at: string
}

export interface EstadisticaJugador {
  id: number
  jugador_id: number
  partido_id: number
  jugador?: string
  minutos_jugados: number
  tries: number
  conversiones: number
  goles_de_penal: number
  drops: number
  tackles: number
  tackles_fallidos: number
  turnovers_ganados: number
  pases: number
  acarreos: number
  metros_ganados: number
  tarjeta_amarilla: boolean
  tarjeta_roja: boolean
}

export interface EvaluacionFisica {
  id: number
  jugador_id: number
  fecha: string
  peso: number
  velocidad_maxima: number
  resistencia: number
  fuerza: number
  agilidad: number
  vo2_max: number
  notas?: string
}

export interface SesionEntrenamiento {
  id: number
  equipo_id: number
  fecha: string
  duracion: number
  tipo: string
  intensidad: string
  descripcion: string
  asistentes: number
}

export interface Lesion {
  id: number
  jugador_id: number
  tipo: string
  descripcion: string
  fecha_inicio: string
  fecha_estimada_retorno?: string
  estado: 'activa' | 'recuperada'
}

export interface DashboardData {
  metricas: {
    total_jugadores: number
    partidos_jugados: number
    promedio_tries_por_partido: number
    lesiones_activas: number
  }
  rendimiento_equipo: Array<{ fecha: string; tries: number; puntos: number }>
  top_jugadores: Array<{ nombre: string; posicion: string; tries: number; tackles: number; impacto: number }>
  resultados_partidos: Array<{ name: string; value: number }>
  evolucion_fisica: Array<{ fecha: string; peso: number; velocidad: number }>
}

export interface AuthUser {
  id: number
  nombre: string
  email: string
  rol: string
}
