# frozen_string_literal: true
# =============================================================================
# Kinetia – Seeds
# Idempotente: limpia y recrea todos los datos de prueba.
# =============================================================================

puts '==> Limpiando datos existentes...'
EstadisticaJugador.delete_all
EvaluacionFisica.delete_all
Lesion.delete_all
SesionEntrenamiento.delete_all
Jugador.delete_all
Partido.delete_all
Equipo.delete_all
Usuario.delete_all

# =============================================================================
# USUARIOS
# =============================================================================
puts '==> Creando usuarios...'

demo = Usuario.create!(
  nombre: 'Demo Usuario',
  email: 'demo@kinetia.app',
  password: 'demo123',
  password_confirmation: 'demo123',
  rol: 'admin',
  activo: true
)

admin = Usuario.create!(
  nombre: 'Administrador',
  email: 'admin@kinetia.app',
  password: 'admin123',
  password_confirmation: 'admin123',
  rol: 'admin',
  activo: true
)

Usuario.create!(
  nombre: 'Carlos Entrenador',
  email: 'entrenador@kinetia.app',
  password: 'entrenador123',
  password_confirmation: 'entrenador123',
  rol: 'entrenador',
  activo: true
)

puts "    #{Usuario.count} usuarios creados."

# =============================================================================
# EQUIPOS
# =============================================================================
puts '==> Creando equipos...'

rm_b = Equipo.create!(
  nombre: 'Real Madrid B',
  categoria: 'Sub-23',
  entrenador: 'Raúl González',
  temporada: '2024-2025',
  logo_url: nil
)

barca_b = Equipo.create!(
  nombre: 'Barcelona B',
  categoria: 'Sub-23',
  entrenador: 'Xavi Hernández Jr.',
  temporada: '2024-2025',
  logo_url: nil
)

atletico_juv = Equipo.create!(
  nombre: 'Atlético Juvenil',
  categoria: 'Juvenil A',
  entrenador: 'Diego Simeone Jr.',
  temporada: '2024-2025',
  logo_url: nil
)

puts "    #{Equipo.count} equipos creados."

# =============================================================================
# JUGADORES
# =============================================================================
puts '==> Creando jugadores...'

# Posiciones helper
POSICIONES = %w[portero defensa mediocampista delantero].freeze

jugadores_rm = [
  { nombre: 'Alejandro', apellido: 'García',    posicion: 'portero',       edad: 20, altura: 1.88, peso: 82, numero: 1  },
  { nombre: 'Pablo',     apellido: 'Martínez',  posicion: 'defensa',       edad: 21, altura: 1.84, peso: 78, numero: 2  },
  { nombre: 'Sergio',    apellido: 'López',     posicion: 'defensa',       edad: 19, altura: 1.82, peso: 76, numero: 3  },
  { nombre: 'Diego',     apellido: 'Sánchez',   posicion: 'defensa',       edad: 22, altura: 1.80, peso: 75, numero: 4  },
  { nombre: 'Carlos',    apellido: 'Fernández', posicion: 'defensa',       edad: 20, altura: 1.79, peso: 74, numero: 5  },
  { nombre: 'Iván',      apellido: 'Rodríguez', posicion: 'mediocampista', edad: 21, altura: 1.76, peso: 72, numero: 6  },
  { nombre: 'Andrés',    apellido: 'Pérez',     posicion: 'mediocampista', edad: 19, altura: 1.74, peso: 70, numero: 7  },
  { nombre: 'Miguel',    apellido: 'González',  posicion: 'mediocampista', edad: 23, altura: 1.77, peso: 73, numero: 8  },
  { nombre: 'Rubén',     apellido: 'Torres',    posicion: 'mediocampista', edad: 22, altura: 1.75, peso: 71, numero: 10 },
  { nombre: 'Álvaro',    apellido: 'Ramírez',   posicion: 'delantero',     edad: 20, altura: 1.82, peso: 78, numero: 9  },
  { nombre: 'Héctor',    apellido: 'Moreno',    posicion: 'delantero',     edad: 21, altura: 1.80, peso: 77, numero: 11 },
  { nombre: 'Javier',    apellido: 'Jiménez',   posicion: 'delantero',     edad: 19, altura: 1.78, peso: 74, numero: 17 },
  { nombre: 'Borja',     apellido: 'Ruiz',      posicion: 'defensa',       edad: 20, altura: 1.83, peso: 79, numero: 14 },
]

jugadores_barca = [
  { nombre: 'Marc',      apellido: 'Puig',      posicion: 'portero',       edad: 19, altura: 1.90, peso: 84, numero: 1  },
  { nombre: 'Gavi',      apellido: 'Navarro',   posicion: 'mediocampista', edad: 20, altura: 1.73, peso: 68, numero: 6  },
  { nombre: 'Eric',      apellido: 'Casado',    posicion: 'defensa',       edad: 21, altura: 1.85, peso: 80, numero: 4  },
  { nombre: 'Nico',      apellido: 'Sergi',     posicion: 'mediocampista', edad: 19, altura: 1.72, peso: 67, numero: 8  },
  { nombre: 'Ferran',    apellido: 'Vilà',      posicion: 'delantero',     edad: 20, altura: 1.78, peso: 73, numero: 9  },
  { nombre: 'Pablo',     apellido: 'Páez',      posicion: 'mediocampista', edad: 22, altura: 1.75, peso: 70, numero: 10 },
  { nombre: 'Arnau',     apellido: 'Tenas',     posicion: 'defensa',       edad: 21, altura: 1.82, peso: 77, numero: 5  },
  { nombre: 'Àlex',      apellido: 'Baldé',     posicion: 'defensa',       edad: 19, altura: 1.76, peso: 72, numero: 3  },
  { nombre: 'Ilias',     apellido: 'Akhomach',  posicion: 'delantero',     edad: 18, altura: 1.72, peso: 66, numero: 11 },
  { nombre: 'Estanis',   apellido: 'Pedrola',   posicion: 'delantero',     edad: 20, altura: 1.80, peso: 75, numero: 7  },
  { nombre: 'Unai',      apellido: 'Hernández', posicion: 'defensa',       edad: 22, altura: 1.84, peso: 79, numero: 2  },
  { nombre: 'Fermín',    apellido: 'López',     posicion: 'mediocampista', edad: 21, altura: 1.74, peso: 69, numero: 14 },
  { nombre: 'Riqui',     apellido: 'Puig',      posicion: 'mediocampista', edad: 20, altura: 1.70, peso: 65, numero: 20 },
]

jugadores_atletico = [
  { nombre: 'Adrián',    apellido: 'Ortega',    posicion: 'portero',       edad: 18, altura: 1.87, peso: 81, numero: 1  },
  { nombre: 'Rodrigo',   apellido: 'Riquelme',  posicion: 'mediocampista', edad: 22, altura: 1.77, peso: 72, numero: 10 },
  { nombre: 'Marcos',    apellido: 'Moreno',    posicion: 'defensa',       edad: 19, altura: 1.83, peso: 78, numero: 4  },
  { nombre: 'Samuel',    apellido: 'Lino',      posicion: 'delantero',     edad: 20, altura: 1.76, peso: 71, numero: 7  },
  { nombre: 'Giuliano',  apellido: 'Simeone',   posicion: 'mediocampista', edad: 21, altura: 1.75, peso: 70, numero: 8  },
  { nombre: 'Javi',      apellido: 'Galán',     posicion: 'defensa',       edad: 22, altura: 1.80, peso: 76, numero: 3  },
  { nombre: 'Óscar',     apellido: 'Valentín',  posicion: 'defensa',       edad: 19, altura: 1.82, peso: 77, numero: 2  },
  { nombre: 'Antonio',   apellido: 'Gómez',     posicion: 'delantero',     edad: 20, altura: 1.81, peso: 75, numero: 9  },
  { nombre: 'Lucas',     apellido: 'Torreira',  posicion: 'mediocampista', edad: 21, altura: 1.72, peso: 68, numero: 6  },
  { nombre: 'Matías',    apellido: 'Nahuel',    posicion: 'defensa',       edad: 18, altura: 1.85, peso: 80, numero: 5  },
  { nombre: 'Yannick',   apellido: 'Ferreira',  posicion: 'delantero',     edad: 19, altura: 1.79, peso: 73, numero: 11 },
  { nombre: 'Roberto',   apellido: 'Olabe',     posicion: 'mediocampista', edad: 22, altura: 1.76, peso: 71, numero: 14 },
  { nombre: 'Daniel',    apellido: 'Wass',      posicion: 'defensa',       edad: 21, altura: 1.83, peso: 79, numero: 16 },
  { nombre: 'Tomás',     apellido: 'Palacios',  posicion: 'defensa',       edad: 20, altura: 1.86, peso: 81, numero: 15 },
]

rm_jugadores   = jugadores_rm.map   { |j| Jugador.create!(j.merge(equipo: rm_b,         activo: true)) }
barca_jugadores = jugadores_barca.map { |j| Jugador.create!(j.merge(equipo: barca_b,      activo: true)) }
atl_jugadores   = jugadores_atletico.map { |j| Jugador.create!(j.merge(equipo: atletico_juv, activo: true)) }

puts "    #{Jugador.count} jugadores creados."

# =============================================================================
# PARTIDOS
# =============================================================================
puts '==> Creando partidos...'

partidos_data = [
  { equipo_local: rm_b,         equipo_visitante: barca_b,      goles_local: 2, goles_visitante: 1, fecha: '2024-02-10 16:00', estado: 'finalizado' },
  { equipo_local: barca_b,      equipo_visitante: atletico_juv, goles_local: 3, goles_visitante: 0, fecha: '2024-02-17 18:00', estado: 'finalizado' },
  { equipo_local: atletico_juv, equipo_visitante: rm_b,         goles_local: 1, goles_visitante: 1, fecha: '2024-03-02 17:00', estado: 'finalizado' },
  { equipo_local: rm_b,         equipo_visitante: atletico_juv, goles_local: 4, goles_visitante: 2, fecha: '2024-03-16 16:30', estado: 'finalizado' },
  { equipo_local: barca_b,      equipo_visitante: rm_b,         goles_local: 0, goles_visitante: 2, fecha: '2024-04-06 17:00', estado: 'finalizado' },
  { equipo_local: atletico_juv, equipo_visitante: barca_b,      goles_local: 2, goles_visitante: 2, fecha: '2024-04-20 16:00', estado: 'finalizado' },
  { equipo_local: rm_b,         equipo_visitante: barca_b,      goles_local: 1, goles_visitante: 0, fecha: '2024-05-04 18:00', estado: 'finalizado' },
  { equipo_local: barca_b,      equipo_visitante: atletico_juv, goles_local: 2, goles_visitante: 3, fecha: '2024-05-18 17:30', estado: 'finalizado' },
  { equipo_local: atletico_juv, equipo_visitante: rm_b,         goles_local: 0, goles_visitante: 3, fecha: '2024-06-01 16:00', estado: 'finalizado' },
  { equipo_local: rm_b,         equipo_visitante: atletico_juv, goles_local: 2, goles_visitante: 2, fecha: '2024-09-07 18:00', estado: 'finalizado' },
]

partidos = partidos_data.map { |p| Partido.create!(p) }

puts "    #{Partido.count} partidos creados."

# =============================================================================
# ESTADÍSTICAS POR JUGADOR / PARTIDO
# =============================================================================
puts '==> Creando estadísticas de jugadores...'

def random_rating
  (rand(55..98) / 10.0).round(1)
end

def create_stats_for_match(partido, jugadores_local, jugadores_visitante)
  titulares_local     = jugadores_local.sample(11)
  titulares_visitante = jugadores_visitante.sample(11)

  (titulares_local + titulares_visitante).each do |jugador|
    goles        = rand(0..2)
    asistencias  = rand(0..([2 - goles, 0].max))
    EstadisticaJugador.create!(
      jugador:           jugador,
      partido:           partido,
      minutos_jugados:   rand(60..90),
      goles:             goles,
      asistencias:       asistencias,
      tarjetas_amarillas: rand < 0.12 ? 1 : 0,
      tarjetas_rojas:    rand < 0.03 ? 1 : 0,
      rating:            random_rating
    )
  end
end

partidos.each do |partido|
  local_jugadores     = Jugador.where(equipo_id: partido.equipo_local_id).to_a
  visitante_jugadores = Jugador.where(equipo_id: partido.equipo_visitante_id).to_a
  create_stats_for_match(partido, local_jugadores, visitante_jugadores)
end

puts "    #{EstadisticaJugador.count} estadísticas creadas."

# =============================================================================
# EVALUACIONES FÍSICAS
# =============================================================================
puts '==> Creando evaluaciones físicas...'

base_dates = [
  Date.new(2024, 1, 15),
  Date.new(2024, 4, 10),
  Date.new(2024, 7, 20),
  Date.new(2024, 10, 5)
]

all_jugadores = rm_jugadores + barca_jugadores + atl_jugadores

all_jugadores.each do |jugador|
  base_dates.each_with_index do |fecha, idx|
    EvaluacionFisica.create!(
      jugador:         jugador,
      fecha:           fecha + rand(0..4).days,
      peso:            (jugador.peso.to_f + rand(-2.0..2.0)).round(2),
      velocidad_maxima: (28.0 + rand(-3.0..5.0)).round(1),
      resistencia:     (70.0 + rand(-10.0..15.0)).round(1),
      fuerza:          (65.0 + rand(-8.0..12.0)).round(1),
      agilidad:        (72.0 + rand(-6.0..10.0)).round(1),
      vo2_max:         (50.0 + rand(-5.0..8.0)).round(1),
      notas:           idx == 0 ? 'Evaluación de inicio de temporada' : nil
    )
  end
end

puts "    #{EvaluacionFisica.count} evaluaciones físicas creadas."

# =============================================================================
# SESIONES DE ENTRENAMIENTO
# =============================================================================
puts '==> Creando sesiones de entrenamiento...'

sesiones_data = [
  { equipo: rm_b,         fecha: '2024-02-05 10:00', duracion: 90,  tipo: 'tactica',     intensidad: 'media',  descripcion: 'Preparación táctica previa al partido', asistentes: 13 },
  { equipo: barca_b,      fecha: '2024-02-12 10:30', duracion: 75,  tipo: 'fisica',      intensidad: 'alta',   descripcion: 'Trabajo de resistencia y velocidad',     asistentes: 12 },
  { equipo: atletico_juv, fecha: '2024-03-18 09:00', duracion: 60,  tipo: 'recuperacion', intensidad: 'baja',  descripcion: 'Recuperación post-partido',              asistentes: 14 },
  { equipo: rm_b,         fecha: '2024-04-22 11:00', duracion: 100, tipo: 'mixta',        intensidad: 'alta',  descripcion: 'Sesión mixta técnico-física',            asistentes: 11 },
  { equipo: barca_b,      fecha: '2024-05-08 10:00', duracion: 80,  tipo: 'tecnica',      intensidad: 'media', descripcion: 'Trabajo de posesión y pressing',         asistentes: 13 },
  { equipo: atletico_juv, fecha: '2024-06-10 09:30', duracion: 90,  tipo: 'tactica',      intensidad: 'media', descripcion: 'Revisión de movimientos defensivos',     asistentes: 14 },
]

sesiones_data.each { |s| SesionEntrenamiento.create!(s) }
puts "    #{SesionEntrenamiento.count} sesiones de entrenamiento creadas."

# =============================================================================
# LESIONES
# =============================================================================
puts '==> Creando lesiones...'

lesiones_data = [
  {
    jugador:                 rm_jugadores[3],
    tipo:                    'Esguince de tobillo',
    descripcion:             'Esguince grado II tobillo derecho tras caída en entrenamiento',
    fecha_inicio:            Date.new(2024, 3, 5),
    fecha_estimada_retorno:  Date.new(2024, 3, 26),
    estado:                  'recuperada'
  },
  {
    jugador:                 barca_jugadores[1],
    tipo:                    'Rotura de fibras',
    descripcion:             'Rotura parcial de fibras en isquiotibial derecho',
    fecha_inicio:            Date.new(2024, 4, 14),
    fecha_estimada_retorno:  Date.new(2024, 5, 20),
    estado:                  'recuperada'
  },
  {
    jugador:                 atl_jugadores[6],
    tipo:                    'Contusión rodilla',
    descripcion:             'Contusión en rodilla izquierda por choque en partido',
    fecha_inicio:            Date.new(2024, 5, 19),
    fecha_estimada_retorno:  Date.new(2024, 5, 30),
    estado:                  'recuperada'
  },
  {
    jugador:                 rm_jugadores[9],
    tipo:                    'Sobrecarga muscular',
    descripcion:             'Sobrecarga en gemelo derecho detectada en evaluación',
    fecha_inicio:            Date.new(2024, 9, 10),
    fecha_estimada_retorno:  Date.new(2024, 9, 28),
    estado:                  'activa'
  },
  {
    jugador:                 barca_jugadores[4],
    tipo:                    'Fractura metatarso',
    descripcion:             'Fractura en quinto metatarso pie izquierdo',
    fecha_inicio:            Date.new(2024, 8, 3),
    fecha_estimada_retorno:  Date.new(2024, 11, 1),
    estado:                  'activa'
  },
]

lesiones_data.each { |l| Lesion.create!(l) }
puts "    #{Lesion.count} lesiones creadas."

# =============================================================================
# RESUMEN
# =============================================================================
puts ''
puts '============================================'
puts ' Kinetia Seeds completados exitosamente'
puts '============================================'
puts "  Usuarios:              #{Usuario.count}"
puts "  Equipos:               #{Equipo.count}"
puts "  Jugadores:             #{Jugador.count}"
puts "  Partidos:              #{Partido.count}"
puts "  Estadísticas:          #{EstadisticaJugador.count}"
puts "  Evaluaciones físicas:  #{EvaluacionFisica.count}"
puts "  Sesiones entreno:      #{SesionEntrenamiento.count}"
puts "  Lesiones:              #{Lesion.count}"
puts ''
puts "  Demo login → demo@kinetia.app / demo123"
puts "  Admin login → admin@kinetia.app / admin123"
puts '============================================'
