class Jugador < ApplicationRecord
  self.table_name = 'jugadores'

  belongs_to :equipo
  has_many :estadisticas_jugador, class_name: 'EstadisticaJugador'
  has_many :evaluaciones_fisicas, class_name: 'EvaluacionFisica'
  has_many :lesiones

  validates :nombre, presence: true
  validates :apellido, presence: true

  scope :activos, -> { where(activo: true) }
end
