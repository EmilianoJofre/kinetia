class EstadisticaJugador < ApplicationRecord
  self.table_name = 'estadisticas_jugador'

  belongs_to :jugador
  belongs_to :partido

  validates :minutos_jugados, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }, allow_nil: true
end
