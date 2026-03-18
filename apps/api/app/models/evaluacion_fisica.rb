class EvaluacionFisica < ApplicationRecord
  self.table_name = 'evaluaciones_fisicas'

  belongs_to :jugador

  validates :fecha, presence: true
  validates :jugador_id, presence: true
end
