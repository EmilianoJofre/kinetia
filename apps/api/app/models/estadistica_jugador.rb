class EstadisticaJugador < ApplicationRecord
  self.table_name = 'estadisticas_jugador'

  belongs_to :jugador
  belongs_to :partido

  validates :minutos_jugados, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  STATS_RUGBY = %i[
    tries conversiones goles_de_penal drops
    tackles tackles_fallidos turnovers_ganados
    pases acarreos metros_ganados
  ].freeze

  STATS_RUGBY.each do |stat|
    validates stat, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  end
end
