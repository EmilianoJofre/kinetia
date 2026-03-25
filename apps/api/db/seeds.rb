# frozen_string_literal: true
# =============================================================================
# Kinetia – Seeds (Rugby)
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

Usuario.create!(
  nombre: 'Demo Usuario',
  email: 'demo@kinetia.app',
  password: 'demo123',
  password_confirmation: 'demo123',
  rol: 'admin',
  activo: true
)

Usuario.create!(
  nombre: 'Administrador',
  email: 'admin@kinetia.app',
  password: 'admin123',
  password_confirmation: 'admin123',
  rol: 'admin',
  activo: true
)

Usuario.create!(
  nombre: 'Martín Entrenador',
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

pumas = Equipo.create!(
  nombre: 'Pumas RC',
  categoria: 'Primera División',
  entrenador: 'Roberto Álvarez',
  temporada: '2025',
  logo_url: nil
)

condores = Equipo.create!(
  nombre: 'Cóndores Rugby Club',
  categoria: 'Primera División',
  entrenador: 'Felipe Soto',
  temporada: '2025',
  logo_url: nil
)

toros = Equipo.create!(
  nombre: 'Toros del Sur RC',
  categoria: 'Primera División',
  entrenador: 'Andrés Muñoz',
  temporada: '2025',
  logo_url: nil
)

puts "    #{Equipo.count} equipos creados."

# =============================================================================
# JUGADORES
# Numeración rugby: 1-8 forwards, 9-15 backs
# =============================================================================
puts '==> Creando jugadores...'

jugadores_pumas = [
  { nombre: 'Tomás',    apellido: 'Herrera',   posicion: 'prop_pilar',           edad: 24, altura: 1.82, peso: 112, numero: 1  },
  { nombre: 'Matías',   apellido: 'Carrasco',  posicion: 'hooker_talonador',     edad: 26, altura: 1.78, peso: 105, numero: 2  },
  { nombre: 'Nicolás',  apellido: 'Vega',      posicion: 'prop_pilar',           edad: 23, altura: 1.84, peso: 115, numero: 3  },
  { nombre: 'Diego',    apellido: 'Fuentes',   posicion: 'lock_segunda_linea',   edad: 25, altura: 1.97, peso: 108, numero: 4  },
  { nombre: 'Ignacio',  apellido: 'Ponce',     posicion: 'lock_segunda_linea',   edad: 27, altura: 1.99, peso: 110, numero: 5  },
  { nombre: 'Cristián', apellido: 'Lagos',     posicion: 'flanker_ala',          edad: 22, altura: 1.88, peso: 100, numero: 6  },
  { nombre: 'Sebastián',apellido: 'Rivas',     posicion: 'flanker_ala',          edad: 24, altura: 1.86, peso: 98,  numero: 7  },
  { nombre: 'Felipe',   apellido: 'Morales',   posicion: 'numero_8',             edad: 26, altura: 1.92, peso: 105, numero: 8  },
  { nombre: 'Andrés',   apellido: 'Díaz',      posicion: 'scrum_half_medio_scrum', edad: 23, altura: 1.74, peso: 82, numero: 9  },
  { nombre: 'Rodrigo',  apellido: 'Campos',    posicion: 'fly_half_apertura',    edad: 25, altura: 1.80, peso: 88,  numero: 10 },
  { nombre: 'Gabriel',  apellido: 'Torres',    posicion: 'center_centro',        edad: 24, altura: 1.84, peso: 92,  numero: 12 },
  { nombre: 'Maximiliano', apellido: 'Ojeda',  posicion: 'center_centro',        edad: 22, altura: 1.82, peso: 90,  numero: 13 },
  { nombre: 'Patricio', apellido: 'Espinoza',  posicion: 'wing_ala',             edad: 23, altura: 1.79, peso: 84,  numero: 11 },
  { nombre: 'Valentín', apellido: 'Castillo',  posicion: 'wing_ala',             edad: 21, altura: 1.77, peso: 82,  numero: 14 },
  { nombre: 'Hernán',   apellido: 'Guzmán',    posicion: 'fullback_zaguero',     edad: 26, altura: 1.83, peso: 87,  numero: 15 },
]

jugadores_condores = [
  { nombre: 'Pablo',    apellido: 'Reyes',     posicion: 'prop_pilar',           edad: 25, altura: 1.80, peso: 110, numero: 1  },
  { nombre: 'Claudio',  apellido: 'Navarro',   posicion: 'hooker_talonador',     edad: 28, altura: 1.76, peso: 103, numero: 2  },
  { nombre: 'Rodrigo',  apellido: 'Sepúlveda', posicion: 'prop_pilar',           edad: 24, altura: 1.83, peso: 113, numero: 3  },
  { nombre: 'Marco',    apellido: 'Ibáñez',    posicion: 'lock_segunda_linea',   edad: 26, altura: 1.96, peso: 107, numero: 4  },
  { nombre: 'Mauricio', apellido: 'Contreras', posicion: 'lock_segunda_linea',   edad: 27, altura: 1.98, peso: 109, numero: 5  },
  { nombre: 'Eduardo',  apellido: 'Quiroga',   posicion: 'flanker_ala',          edad: 23, altura: 1.87, peso: 99,  numero: 6  },
  { nombre: 'Gonzalo',  apellido: 'Vargas',    posicion: 'flanker_ala',          edad: 25, altura: 1.85, peso: 97,  numero: 7  },
  { nombre: 'Alexis',   apellido: 'Medina',    posicion: 'numero_8',             edad: 27, altura: 1.91, peso: 104, numero: 8  },
  { nombre: 'Javier',   apellido: 'Peña',      posicion: 'scrum_half_medio_scrum', edad: 24, altura: 1.73, peso: 80, numero: 9  },
  { nombre: 'Cristóbal',apellido: 'Rojas',     posicion: 'fly_half_apertura',    edad: 26, altura: 1.81, peso: 87,  numero: 10 },
  { nombre: 'Ignacio',  apellido: 'Bravo',     posicion: 'center_centro',        edad: 23, altura: 1.83, peso: 91,  numero: 12 },
  { nombre: 'Camilo',   apellido: 'Flores',    posicion: 'center_centro',        edad: 25, altura: 1.81, peso: 89,  numero: 13 },
  { nombre: 'Sebastián',apellido: 'Cortés',    posicion: 'wing_ala',             edad: 22, altura: 1.78, peso: 83,  numero: 11 },
  { nombre: 'Mateo',    apellido: 'Salinas',   posicion: 'wing_ala',             edad: 24, altura: 1.76, peso: 81,  numero: 14 },
  { nombre: 'Benjamín', apellido: 'Molina',    posicion: 'fullback_zaguero',     edad: 27, altura: 1.84, peso: 88,  numero: 15 },
]

jugadores_toros = [
  { nombre: 'Luis',     apellido: 'Valenzuela', posicion: 'prop_pilar',          edad: 26, altura: 1.81, peso: 111, numero: 1  },
  { nombre: 'Esteban',  apellido: 'Moya',       posicion: 'hooker_talonador',    edad: 24, altura: 1.77, peso: 104, numero: 2  },
  { nombre: 'Raúl',     apellido: 'Figueroa',   posicion: 'prop_pilar',          edad: 25, altura: 1.85, peso: 116, numero: 3  },
  { nombre: 'Nicolás',  apellido: 'Araya',      posicion: 'lock_segunda_linea',  edad: 23, altura: 1.95, peso: 106, numero: 4  },
  { nombre: 'Marcelo',  apellido: 'Bustos',     posicion: 'lock_segunda_linea',  edad: 28, altura: 1.97, peso: 108, numero: 5  },
  { nombre: 'Fernando', apellido: 'Leiva',      posicion: 'flanker_ala',         edad: 24, altura: 1.89, peso: 101, numero: 6  },
  { nombre: 'Cristian', apellido: 'Zuñiga',     posicion: 'flanker_ala',         edad: 22, altura: 1.87, peso: 99,  numero: 7  },
  { nombre: 'Jorge',    apellido: 'Espinoza',   posicion: 'numero_8',            edad: 27, altura: 1.93, peso: 106, numero: 8  },
  { nombre: 'Ricardo',  apellido: 'Tapia',      posicion: 'scrum_half_medio_scrum', edad: 25, altura: 1.75, peso: 83, numero: 9 },
  { nombre: 'Álvaro',   apellido: 'Cáceres',    posicion: 'fly_half_apertura',   edad: 24, altura: 1.82, peso: 89,  numero: 10 },
  { nombre: 'Tomás',    apellido: 'Hidalgo',    posicion: 'center_centro',       edad: 26, altura: 1.84, peso: 93,  numero: 12 },
  { nombre: 'Fabián',   apellido: 'Villarroel', posicion: 'center_centro',       edad: 23, altura: 1.80, peso: 90,  numero: 13 },
  { nombre: 'Dante',    apellido: 'Cabrera',    posicion: 'wing_ala',            edad: 22, altura: 1.78, peso: 84,  numero: 11 },
  { nombre: 'Iván',     apellido: 'Robles',     posicion: 'wing_ala',            edad: 24, altura: 1.76, peso: 82,  numero: 14 },
  { nombre: 'Octavio',  apellido: 'Saavedra',   posicion: 'fullback_zaguero',    edad: 25, altura: 1.85, peso: 88,  numero: 15 },
]

pumas_jugadores   = jugadores_pumas.map   { |j| Jugador.create!(j.merge(equipo: pumas,    activo: true)) }
condores_jugadores = jugadores_condores.map { |j| Jugador.create!(j.merge(equipo: condores, activo: true)) }
toros_jugadores   = jugadores_toros.map   { |j| Jugador.create!(j.merge(equipo: toros,    activo: true)) }

puts "    #{Jugador.count} jugadores creados."

# =============================================================================
# PARTIDOS
# Puntuación rugby: tries=5, conversión=2, penal=3, drop=3
# =============================================================================
puts '==> Creando partidos...'

partidos_data = [
  { equipo_local: pumas,    equipo_visitante: condores, puntos_local: 28, puntos_visitante: 14, fecha: '2025-03-08 16:00', estado: 'finalizado', competicion: 'Liga Nacional' },
  { equipo_local: condores, equipo_visitante: toros,    puntos_local: 21, puntos_visitante: 28, fecha: '2025-03-15 17:00', estado: 'finalizado', competicion: 'Liga Nacional' },
  { equipo_local: toros,    equipo_visitante: pumas,    puntos_local: 10, puntos_visitante: 10, fecha: '2025-03-22 16:30', estado: 'finalizado', competicion: 'Liga Nacional' },
  { equipo_local: pumas,    equipo_visitante: toros,    puntos_local: 35, puntos_visitante: 16, fecha: '2025-04-05 18:00', estado: 'finalizado', competicion: 'Copa Regional' },
  { equipo_local: condores, equipo_visitante: pumas,    puntos_local: 17, puntos_visitante: 24, fecha: '2025-04-12 17:00', estado: 'finalizado', competicion: 'Liga Nacional' },
  { equipo_local: toros,    equipo_visitante: condores, puntos_local: 31, puntos_visitante: 13, fecha: '2025-04-19 16:00', estado: 'finalizado', competicion: 'Liga Nacional' },
  { equipo_local: pumas,    equipo_visitante: condores, puntos_local: 22, puntos_visitante: 19, fecha: '2025-05-03 18:00', estado: 'finalizado', competicion: 'Copa Regional' },
  { equipo_local: condores, equipo_visitante: toros,    puntos_local: 27, puntos_visitante: 20, fecha: '2025-05-17 17:30', estado: 'finalizado', competicion: 'Liga Nacional' },
  { equipo_local: toros,    equipo_visitante: pumas,    puntos_local: 14, puntos_visitante: 33, fecha: '2025-06-07 16:00', estado: 'finalizado', competicion: 'Liga Nacional' },
  { equipo_local: pumas,    equipo_visitante: toros,    puntos_local:  0, puntos_visitante:  0, fecha: '2025-08-16 18:00', estado: 'programado',  competicion: 'Liga Nacional' },
]

partidos = partidos_data.map { |p| Partido.create!(p) }

puts "    #{Partido.count} partidos creados."

# =============================================================================
# ESTADÍSTICAS POR JUGADOR / PARTIDO
# =============================================================================
puts '==> Creando estadísticas de jugadores...'

def create_rugby_stats(partido, jugadores_local, jugadores_visitante)
  titulares_local     = jugadores_local.first(15)
  titulares_visitante = jugadores_visitante.first(15)

  titulares_local.each do |jugador|
    # Forwards (números 1-8) hacen más tackles y acarreos
    # Backs (números 9-15) hacen más tries y pases
    es_forward = jugador.numero <= 8

    EstadisticaJugador.create!(
      jugador:           jugador,
      partido:           partido,
      minutos_jugados:   rand(60..80),
      tries:             es_forward ? rand(0..1) : rand(0..2),
      conversiones:      jugador.posicion == 'fly_half_apertura' ? rand(0..4) : 0,
      goles_de_penal:    jugador.posicion == 'fly_half_apertura' ? rand(0..3) : 0,
      drops:             jugador.posicion == 'fly_half_apertura' ? (rand < 0.2 ? 1 : 0) : 0,
      tackles:           es_forward ? rand(6..14) : rand(2..8),
      tackles_fallidos:  rand(0..3),
      turnovers_ganados: rand(0..2),
      pases:             es_forward ? rand(4..12) : rand(15..35),
      acarreos:          es_forward ? rand(5..12) : rand(2..7),
      metros_ganados:    es_forward ? rand(10..40) : rand(20..80),
      tarjeta_amarilla:  rand < 0.08,
      tarjeta_roja:      rand < 0.02
    )
  end

  titulares_visitante.each do |jugador|
    es_forward = jugador.numero <= 8

    EstadisticaJugador.create!(
      jugador:           jugador,
      partido:           partido,
      minutos_jugados:   rand(60..80),
      tries:             es_forward ? rand(0..1) : rand(0..2),
      conversiones:      jugador.posicion == 'fly_half_apertura' ? rand(0..4) : 0,
      goles_de_penal:    jugador.posicion == 'fly_half_apertura' ? rand(0..3) : 0,
      drops:             jugador.posicion == 'fly_half_apertura' ? (rand < 0.2 ? 1 : 0) : 0,
      tackles:           es_forward ? rand(6..14) : rand(2..8),
      tackles_fallidos:  rand(0..3),
      turnovers_ganados: rand(0..2),
      pases:             es_forward ? rand(4..12) : rand(15..35),
      acarreos:          es_forward ? rand(5..12) : rand(2..7),
      metros_ganados:    es_forward ? rand(10..40) : rand(20..80),
      tarjeta_amarilla:  rand < 0.08,
      tarjeta_roja:      rand < 0.02
    )
  end
end

# Solo crear estadísticas para partidos finalizados
partidos.select { |p| p.estado == 'finalizado' }.each do |partido|
  local_jugadores     = Jugador.where(equipo_id: partido.equipo_local_id).order(:numero).to_a
  visitante_jugadores = Jugador.where(equipo_id: partido.equipo_visitante_id).order(:numero).to_a
  create_rugby_stats(partido, local_jugadores, visitante_jugadores)
end

puts "    #{EstadisticaJugador.count} estadísticas creadas."

# =============================================================================
# EVALUACIONES FÍSICAS
# =============================================================================
puts '==> Creando evaluaciones físicas...'

base_dates = [
  Date.new(2025, 1, 15),
  Date.new(2025, 4, 10),
  Date.new(2025, 7, 20),
  Date.new(2025, 10, 5)
]

all_jugadores = pumas_jugadores + condores_jugadores + toros_jugadores

all_jugadores.each do |jugador|
  base_dates.each_with_index do |fecha, idx|
    EvaluacionFisica.create!(
      jugador:          jugador,
      fecha:            fecha + rand(0..4).days,
      peso:             (jugador.peso.to_f + rand(-2.0..2.0)).round(2),
      velocidad_maxima: (30.0 + rand(-2.0..4.0)).round(1),
      resistencia:      (72.0 + rand(-8.0..12.0)).round(1),
      fuerza:           (70.0 + rand(-6.0..10.0)).round(1),
      agilidad:         (68.0 + rand(-5.0..8.0)).round(1),
      vo2_max:          (52.0 + rand(-4.0..6.0)).round(1),
      notas:            idx == 0 ? 'Evaluación de inicio de temporada' : nil
    )
  end
end

puts "    #{EvaluacionFisica.count} evaluaciones físicas creadas."

# =============================================================================
# SESIONES DE ENTRENAMIENTO
# =============================================================================
puts '==> Creando sesiones de entrenamiento...'

sesiones_data = [
  { equipo: pumas,    fecha: '2025-03-05 10:00', duracion: 90,  tipo: 'tactica',      intensidad: 'media',  descripcion: 'Análisis de lineouts y scrums',              asistentes: 15 },
  { equipo: condores, fecha: '2025-03-12 10:30', duracion: 80,  tipo: 'fisica',       intensidad: 'alta',   descripcion: 'Trabajo de potencia y velocidad',            asistentes: 14 },
  { equipo: toros,    fecha: '2025-03-23 09:00', duracion: 60,  tipo: 'recuperacion', intensidad: 'baja',   descripcion: 'Recuperación activa post-empate',            asistentes: 15 },
  { equipo: pumas,    fecha: '2025-04-28 11:00', duracion: 100, tipo: 'mixta',        intensidad: 'alta',   descripcion: 'Contacto, defensa y salida bajo los palos',  asistentes: 14 },
  { equipo: condores, fecha: '2025-05-08 10:00', duracion: 75,  tipo: 'tecnica',      intensidad: 'media',  descripcion: 'Trabajo de pases y patadas de reinicio',     asistentes: 15 },
  { equipo: toros,    fecha: '2025-06-03 09:30', duracion: 90,  tipo: 'tactica',      intensidad: 'media',  descripcion: 'Defensa en maul y tackle bajo presión',      asistentes: 13 },
]

sesiones_data.each { |s| SesionEntrenamiento.create!(s) }
puts "    #{SesionEntrenamiento.count} sesiones de entrenamiento creadas."

# =============================================================================
# LESIONES
# Lesiones típicas de rugby
# =============================================================================
puts '==> Creando lesiones...'

lesiones_data = [
  {
    jugador:                pumas_jugadores[0],   # prop
    tipo:                   'Esguince de hombro',
    descripcion:            'Esguince AC grado II por impacto en scrum',
    fecha_inicio:           Date.new(2025, 3, 10),
    fecha_estimada_retorno: Date.new(2025, 4, 7),
    estado:                 'recuperada'
  },
  {
    jugador:                condores_jugadores[6], # flanker
    tipo:                   'Desgarro isquiotibial',
    descripcion:            'Desgarro parcial grado II en sprint durante el partido',
    fecha_inicio:           Date.new(2025, 4, 13),
    fecha_estimada_retorno: Date.new(2025, 5, 18),
    estado:                 'recuperada'
  },
  {
    jugador:                toros_jugadores[3],   # lock
    tipo:                   'Contusión costillas',
    descripcion:            'Contusión costal por tackle directo, tres semanas de reposo',
    fecha_inicio:           Date.new(2025, 5, 18),
    fecha_estimada_retorno: Date.new(2025, 6, 8),
    estado:                 'recuperada'
  },
  {
    jugador:                pumas_jugadores[7],   # numero_8
    tipo:                   'Esguince de rodilla',
    descripcion:            'Esguince LLI grado I durante maul, en proceso de recuperación',
    fecha_inicio:           Date.new(2025, 6, 8),
    fecha_estimada_retorno: Date.new(2025, 7, 1),
    estado:                 'activa'
  },
  {
    jugador:                condores_jugadores[1], # hooker
    tipo:                   'Fractura nasal',
    descripcion:            'Fractura nasal por golpe en formación, requiere cirugía menor',
    fecha_inicio:           Date.new(2025, 5, 3),
    fecha_estimada_retorno: Date.new(2025, 6, 14),
    estado:                 'activa'
  },
]

lesiones_data.each { |l| Lesion.create!(l) }
puts "    #{Lesion.count} lesiones creadas."

# =============================================================================
# RESUMEN
# =============================================================================
puts ''
puts '============================================'
puts ' Kinetia Seeds (Rugby) completados'
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
puts "  Demo login  → demo@kinetia.app / demo123"
puts "  Admin login → admin@kinetia.app / admin123"
puts '============================================'
