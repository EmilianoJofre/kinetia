class Partido < ApplicationRecord
  belongs_to :equipo_local, class_name: 'Equipo', foreign_key: 'equipo_local_id'
  belongs_to :equipo_visitante, class_name: 'Equipo', foreign_key: 'equipo_visitante_id'
  has_many :estadisticas_jugador, class_name: 'EstadisticaJugador'

  validates :fecha, presence: true
  validates :estado, inclusion: { in: %w[programado en_curso finalizado] }
end
