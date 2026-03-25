class RefactorEstadisticasJugadorForRugby < ActiveRecord::Migration[7.1]
  def change
    # Remove football-specific columns
    remove_column :estadisticas_jugador, :goles, :integer
    remove_column :estadisticas_jugador, :asistencias, :integer
    remove_column :estadisticas_jugador, :tarjetas_amarillas, :integer
    remove_column :estadisticas_jugador, :tarjetas_rojas, :integer
    remove_column :estadisticas_jugador, :rating, :decimal

    # Add rugby-specific columns
    add_column :estadisticas_jugador, :tries,              :integer, default: 0, null: false
    add_column :estadisticas_jugador, :conversiones,       :integer, default: 0, null: false
    add_column :estadisticas_jugador, :goles_de_penal,     :integer, default: 0, null: false
    add_column :estadisticas_jugador, :drops,              :integer, default: 0, null: false
    add_column :estadisticas_jugador, :tackles,            :integer, default: 0, null: false
    add_column :estadisticas_jugador, :tackles_fallidos,   :integer, default: 0, null: false
    add_column :estadisticas_jugador, :turnovers_ganados,  :integer, default: 0, null: false
    add_column :estadisticas_jugador, :pases,              :integer, default: 0, null: false
    add_column :estadisticas_jugador, :acarreos,           :integer, default: 0, null: false
    add_column :estadisticas_jugador, :metros_ganados,     :integer, default: 0, null: false
    add_column :estadisticas_jugador, :tarjeta_amarilla,   :boolean, default: false, null: false
    add_column :estadisticas_jugador, :tarjeta_roja,       :boolean, default: false, null: false
  end
end
