class Lesion < ApplicationRecord
  self.table_name = 'lesiones'

  belongs_to :jugador

  validates :tipo, presence: true
  validates :fecha_inicio, presence: true
  validates :estado, inclusion: { in: %w[activa recuperada] }
end
