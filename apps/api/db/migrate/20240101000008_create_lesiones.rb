class CreateLesiones < ActiveRecord::Migration[7.1]
  def change
    create_table :lesiones do |t|
      t.references :jugador, null: false, foreign_key: { to_table: :jugadores }
      t.string :tipo, null: false
      t.text :descripcion
      t.date :fecha_inicio, null: false
      t.date :fecha_estimada_retorno
      t.string :estado, default: 'activa'
      t.timestamps
    end
  end
end
