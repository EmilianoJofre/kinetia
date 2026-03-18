module Api
  module V1
    class EvaluacionesFisicasController < ApplicationController
      before_action :set_evaluacion, only: [:show, :update, :destroy]

      def index
        @evaluaciones = EvaluacionFisica.all.order(fecha: :desc)
        jugador_id = params[:jugador_id]
        @evaluaciones = @evaluaciones.where(jugador_id: jugador_id) if jugador_id.present?
        render json: @evaluaciones
      end

      def show
        render json: @evaluacion
      end

      def create
        @evaluacion = EvaluacionFisica.new(evaluacion_params)
        if @evaluacion.save
          render json: @evaluacion, status: :created
        else
          render json: { errors: @evaluacion.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @evaluacion.update(evaluacion_params)
          render json: @evaluacion
        else
          render json: { errors: @evaluacion.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @evaluacion.destroy
        render json: { message: 'Evaluación eliminada' }
      end

      private

      def set_evaluacion
        @evaluacion = EvaluacionFisica.find(params[:id])
      end

      def evaluacion_params
        params.require(:evaluacion_fisica).permit(:jugador_id, :fecha, :peso, :velocidad_maxima, :resistencia, :fuerza, :agilidad, :vo2_max, :notas)
      end
    end
  end
end
