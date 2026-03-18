class CreateEstadisticasJugador < ActiveRecord::Migration[7.1]
  def change
    create_table :estadisticas_jugador do |t|
      t.references :jugador, null: false, foreign_key: { to_table: :jugadores }
      t.references :partido, null: false, foreign_key: { to_table: :partidos }
      t.integer :minutos_jugados, default: 0
      t.integer :goles, default: 0
      t.integer :asistencias, default: 0
      t.integer :tarjetas_amarillas, default: 0
      t.integer :tarjetas_rojas, default: 0
      t.decimal :rating, precision: 3, scale: 1
      t.timestamps
    end
  end
end
