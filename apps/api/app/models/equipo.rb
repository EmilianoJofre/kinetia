class Equipo < ApplicationRecord
  has_many :jugadores
  has_many :partidos_como_local, class_name: 'Partido', foreign_key: 'equipo_local_id'
  has_many :partidos_como_visitante, class_name: 'Partido', foreign_key: 'equipo_visitante_id'
  has_many :sesiones_entrenamiento

  validates :nombre, presence: true
  validates :categoria, presence: true
end
