module Api
  module V1
    class EquiposController < ApplicationController
      before_action :set_equipo, only: [:show, :update, :destroy]

      def index
        @equipos = Equipo.all
        render json: @equipos.map { |e| equipo_json(e) }
      end

      def show
        jugadores = Jugador.where(equipo_id: @equipo.id, activo: true)
        partidos = Partido.where('equipo_local_id = ? OR equipo_visitante_id = ?', @equipo.id, @equipo.id).order(fecha: :desc).limit(10)
        render json: {
          **equipo_json(@equipo),
          jugadores: jugadores.count,
          partidos_recientes: partidos.map { |p| {
            id: p.id, fecha: p.fecha, estado: p.estado,
            goles_local: p.goles_local, goles_visitante: p.goles_visitante,
            equipo_local: Equipo.find_by(id: p.equipo_local_id)&.nombre,
            equipo_visitante: Equipo.find_by(id: p.equipo_visitante_id)&.nombre
          }}
        }
      end

      def create
        @equipo = Equipo.new(equipo_params)
        if @equipo.save
          render json: equipo_json(@equipo), status: :created
        else
          render json: { errors: @equipo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @equipo.update(equipo_params)
          render json: equipo_json(@equipo)
        else
          render json: { errors: @equipo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @equipo.destroy
        render json: { message: 'Equipo eliminado' }
      end

      private

      def set_equipo
        @equipo = Equipo.find(params[:id])
      end

      def equipo_params
        params.require(:equipo).permit(:nombre, :categoria, :entrenador, :temporada, :logo_url)
      end

      def equipo_json(e)
        { id: e.id, nombre: e.nombre, categoria: e.categoria,
          entrenador: e.entrenador, temporada: e.temporada, logo_url: e.logo_url,
          created_at: e.created_at, updated_at: e.updated_at }
      end
    end
  end
end
