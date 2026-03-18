module Api
  module V1
    class SesionesEntrenamientoController < ApplicationController
      before_action :set_sesion, only: [:show, :update, :destroy]

      def index
        @sesiones = SesionEntrenamiento.all.order(fecha: :desc)
        render json: @sesiones
      end

      def show
        render json: @sesion
      end

      def create
        @sesion = SesionEntrenamiento.new(sesion_params)
        if @sesion.save
          render json: @sesion, status: :created
        else
          render json: { errors: @sesion.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @sesion.update(sesion_params)
          render json: @sesion
        else
          render json: { errors: @sesion.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @sesion.destroy
        render json: { message: 'Sesión eliminada' }
      end

      private

      def set_sesion
        @sesion = SesionEntrenamiento.find(params[:id])
      end

      def sesion_params
        params.require(:sesion_entrenamiento).permit(:equipo_id, :fecha, :duracion, :tipo, :intensidad, :descripcion, :asistentes)
      end
    end
  end
end
