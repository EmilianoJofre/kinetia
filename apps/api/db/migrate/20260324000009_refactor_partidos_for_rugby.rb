class RefactorPartidosForRugby < ActiveRecord::Migration[7.1]
  def change
    rename_column :partidos, :goles_local, :puntos_local
    rename_column :partidos, :goles_visitante, :puntos_visitante
    add_column :partidos, :competicion, :string
  end
end
