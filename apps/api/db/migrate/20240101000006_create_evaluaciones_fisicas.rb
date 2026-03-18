class CreateEvaluacionesFisicas < ActiveRecord::Migration[7.1]
  def change
    create_table :evaluaciones_fisicas do |t|
      t.references :jugador, null: false, foreign_key: { to_table: :jugadores }
      t.date :fecha, null: false
      t.decimal :peso, precision: 5, scale: 2
      t.decimal :velocidad_maxima, precision: 4, scale: 1
      t.decimal :resistencia, precision: 4, scale: 1
      t.decimal :fuerza, precision: 4, scale: 1
      t.decimal :agilidad, precision: 4, scale: 1
      t.decimal :vo2_max, precision: 4, scale: 1
      t.text :notas
      t.timestamps
    end
  end
end
