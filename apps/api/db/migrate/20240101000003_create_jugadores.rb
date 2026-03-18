class CreateJugadores < ActiveRecord::Migration[7.1]
  def change
    create_table :jugadores do |t|
      t.string :nombre, null: false
      t.string :apellido, null: false
      t.string :posicion
      t.integer :edad
      t.decimal :altura, precision: 4, scale: 2
      t.decimal :peso, precision: 5, scale: 2
      t.integer :numero
      t.references :equipo, null: false, foreign_key: { to_table: :equipos }
      t.string :foto_url
      t.boolean :activo, default: true
      t.timestamps
    end
  end
end
