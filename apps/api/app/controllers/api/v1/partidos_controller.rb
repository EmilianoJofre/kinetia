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
            goles: e.goles, asistencias: e.asistencias,
            tarjetas_amarillas: e.tarjetas_amarillas,
            tarjetas_rojas: e.tarjetas_rojas, rating: e.rating
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
        params.require(:partido).permit(:equipo_local_id, :equipo_visitante_id, :goles_local, :goles_visitante, :fecha, :estado)
      end

      def partido_json(p)
        {
          id: p.id,
          equipo_local_id: p.equipo_local_id,
          equipo_visitante_id: p.equipo_visitante_id,
          equipo_local: Equipo.find_by(id: p.equipo_local_id)&.nombre,
          equipo_visitante: Equipo.find_by(id: p.equipo_visitante_id)&.nombre,
          goles_local: p.goles_local, goles_visitante: p.goles_visitante,
          fecha: p.fecha, estado: p.estado,
          created_at: p.created_at, updated_at: p.updated_at
        }
      end
    end
  end
end
