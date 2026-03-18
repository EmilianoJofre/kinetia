class SesionEntrenamiento < ApplicationRecord
  self.table_name = 'sesiones_entrenamiento'

  belongs_to :equipo

  validates :fecha, presence: true
  validates :tipo, inclusion: { in: %w[tactica fisica tecnica mixta recuperacion] }, allow_nil: true
  validates :intensidad, inclusion: { in: %w[baja media alta maxima] }, allow_nil: true
end
