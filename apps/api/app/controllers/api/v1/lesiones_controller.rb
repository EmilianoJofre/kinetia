module Api
  module V1
    class LesionesController < ApplicationController
      before_action :set_lesion, only: [:show, :update, :destroy]

      def index
        @lesiones = Lesion.all.order(fecha_inicio: :desc)
        jugador_id = params[:jugador_id]
        estado = params[:estado]
        @lesiones = @lesiones.where(jugador_id: jugador_id) if jugador_id.present?
        @lesiones = @lesiones.where(estado: estado) if estado.present?
        render json: @lesiones
      end

      def show
        render json: @lesion
      end

      def create
        @lesion = Lesion.new(lesion_params)
        if @lesion.save
          render json: @lesion, status: :created
        else
          render json: { errors: @lesion.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @lesion.update(lesion_params)
          render json: @lesion
        else
          render json: { errors: @lesion.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @lesion.destroy
        render json: { message: 'Lesión eliminada' }
      end

      private

      def set_lesion
        @lesion = Lesion.find(params[:id])
      end

      def lesion_params
        params.require(:lesion).permit(:jugador_id, :tipo, :descripcion, :fecha_inicio, :fecha_estimada_retorno, :estado)
      end
    end
  end
end
