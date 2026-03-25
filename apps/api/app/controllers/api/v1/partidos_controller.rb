module Api
  module V1
    class PartidosController < ApplicationController
      before_action :set_partido, only: [:show, :update, :destroy]

      def index
        @partidos = Partido.all.order(fecha: :desc)
        render json: @partidos.map { |p| partido_json(p) }
      end

      def show
        estadisticas = EstadisticaJugador.where(partido_id: @partido.id).includes(:jugador)
        render json: {
          **partido_json(@partido),
          estadisticas: estadisticas.map { |e| {
            id: e.id,
            jugador_id: e.jugador_id,
            jugador: "#{e.jugador&.nombre} #{e.jugador&.apellido}",
            minutos_jugados: e.minutos_jugados,
            tries: e.tries, conversiones: e.conversiones,
            goles_de_penal: e.goles_de_penal, drops: e.drops,
            tackles: e.tackles, tackles_fallidos: e.tackles_fallidos,
            turnovers_ganados: e.turnovers_ganados,
            pases: e.pases, acarreos: e.acarreos,
            metros_ganados: e.metros_ganados,
            tarjeta_amarilla: e.tarjeta_amarilla, tarjeta_roja: e.tarjeta_roja
          }}
        }
      end

      def create
        @partido = Partido.new(partido_params)
        if @partido.save
          render json: partido_json(@partido), status: :created
        else
          render json: { errors: @partido.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @partido.update(partido_params)
          render json: partido_json(@partido)
        else
          render json: { errors: @partido.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @partido.destroy
        render json: { message: 'Partido eliminado' }
      end

      private

      def set_partido
        @partido = Partido.find(params[:id])
      end

      def partido_params
        params.require(:partido).permit(:equipo_local_id, :equipo_visitante_id, :puntos_local, :puntos_visitante, :fecha, :estado, :competicion)
      end

      def partido_json(p)
        {
          id: p.id,
          equipo_local_id: p.equipo_local_id,
          equipo_visitante_id: p.equipo_visitante_id,
          equipo_local: Equipo.find_by(id: p.equipo_local_id)&.nombre,
          equipo_visitante: Equipo.find_by(id: p.equipo_visitante_id)&.nombre,
          puntos_local: p.puntos_local, puntos_visitante: p.puntos_visitante,
          competicion: p.competicion,
          fecha: p.fecha, estado: p.estado,
          created_at: p.created_at, updated_at: p.updated_at
        }
      end
    end
  end
end
