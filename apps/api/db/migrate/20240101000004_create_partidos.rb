class CreatePartidos < ActiveRecord::Migration[7.1]
  def change
    create_table :partidos do |t|
      t.references :equipo_local, null: false, foreign_key: { to_table: :equipos }
      t.references :equipo_visitante, null: false, foreign_key: { to_table: :equipos }
      t.integer :goles_local, default: 0
      t.integer :goles_visitante, default: 0
      t.datetime :fecha
      t.string :estado, default: 'programado'
      t.timestamps
    end
  end
end
