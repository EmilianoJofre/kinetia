class CreateEquipos < ActiveRecord::Migration[7.1]
  def change
    create_table :equipos do |t|
      t.string :nombre, null: false
      t.string :categoria
      t.string :entrenador
      t.string :temporada
      t.string :logo_url
      t.timestamps
    end
  end
end
