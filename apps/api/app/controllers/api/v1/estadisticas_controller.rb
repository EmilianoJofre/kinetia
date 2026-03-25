module Api
  module V1
    class EstadisticasController < ApplicationController
      before_action :set_estadistica, only: [:show, :update, :destroy]

      def index
        @estadisticas = EstadisticaJugador.all
        jugador_id = params[:jugador_id]
        partido_id = params[:partido_id]
        @estadisticas = @estadisticas.where(jugador_id: jugador_id) if jugador_id.present?
        @estadisticas = @estadisticas.where(partido_id: partido_id) if partido_id.present?
        render json: @estadisticas
      end

      def show
        render json: @estadistica
      end

      def create
        @estadistica = EstadisticaJugador.new(estadistica_params)
        if @estadistica.save
          render json: @estadistica, status: :created
        else
          render json: { errors: @estadistica.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @estadistica.update(estadistica_params)
          render json: @estadistica
        else
          render json: { errors: @estadistica.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @estadistica.destroy
        render json: { message: 'Estadística eliminada' }
      end

      private

      def set_estadistica
        @estadistica = EstadisticaJugador.find(params[:id])
      end

      def estadistica_params
        params.require(:estadistica_jugador).permit(
          :jugador_id, :partido_id, :minutos_jugados,
          :tries, :conversiones, :goles_de_penal, :drops,
          :tackles, :tackles_fallidos, :turnovers_ganados,
          :pases, :acarreos, :metros_ganados,
          :tarjeta_amarilla, :tarjeta_roja
        )
      end
    end
  end
end
