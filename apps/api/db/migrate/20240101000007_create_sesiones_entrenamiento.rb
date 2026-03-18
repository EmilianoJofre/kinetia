class CreateSesionesEntrenamiento < ActiveRecord::Migration[7.1]
  def change
    create_table :sesiones_entrenamiento do |t|
      t.references :equipo, null: false, foreign_key: { to_table: :equipos }
      t.datetime :fecha
      t.integer :duracion
      t.string :tipo
      t.string :intensidad
      t.text :descripcion
      t.integer :asistentes, default: 0
      t.timestamps
    end
  end
end
