class Jugador < ApplicationRecord
  self.table_name = 'jugadores'

  belongs_to :equipo
  has_many :estadisticas_jugador, class_name: 'EstadisticaJugador'
  has_many :evaluaciones_fisicas, class_name: 'EvaluacionFisica'
  has_many :lesiones

  POSICIONES = %w[
    prop_pilar hooker_talonador lock_segunda_linea
    flanker_ala numero_8 scrum_half_medio_scrum
    fly_half_apertura center_centro wing_ala fullback_zaguero
  ].freeze

  validates :nombre, presence: true
  validates :apellido, presence: true
  validates :posicion, inclusion: { in: POSICIONES }, allow_blank: true

  scope :activos, -> { where(activo: true) }
end
