module Api
  module V1
    class JugadoresController < ApplicationController
      before_action :set_jugador, only: [:show, :update, :destroy]

      def index
        @jugadores = Jugador.includes(:equipo).all
        equipo_id = params[:equipo_id]
        @jugadores = @jugadores.where(equipo_id: equipo_id) if equipo_id.present?
        render json: @jugadores.map { |j| jugador_json(j) }
      end

      def show
        estadisticas = EstadisticaJugador.where(jugador_id: @jugador.id)
          .includes(:partido).order('partidos.fecha DESC')
        evaluaciones = EvaluacionFisica.where(jugador_id: @jugador.id).order(fecha: :desc).limit(10)
        lesiones = Lesion.where(jugador_id: @jugador.id).order(fecha_inicio: :desc)

        render json: {
          **jugador_json(@jugador),
          estadisticas: estadisticas.map { |e| estadistica_json(e) },
          evaluaciones: evaluaciones.map { |e| evaluacion_json(e) },
          lesiones: lesiones.map { |l| lesion_json(l) }
        }
      end

      def create
        @jugador = Jugador.new(jugador_params)
        if @jugador.save
          render json: jugador_json(@jugador), status: :created
        else
          render json: { errors: @jugador.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @jugador.update(jugador_params)
          render json: jugador_json(@jugador)
        else
          render json: { errors: @jugador.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @jugador.update(activo: false)
        render json: { message: 'Jugador desactivado' }
      end

      private

      def set_jugador
        @jugador = Jugador.find(params[:id])
      end

      def jugador_params
        params.require(:jugador).permit(:nombre, :apellido, :posicion, :edad, :altura, :peso, :numero, :equipo_id, :foto_url, :activo)
      end

      def jugador_json(j)
        {
          id: j.id, nombre: j.nombre, apellido: j.apellido,
          posicion: j.posicion, edad: j.edad, altura: j.altura,
          peso: j.peso, numero: j.numero, equipo_id: j.equipo_id,
          equipo: j.equipo&.nombre, foto_url: j.foto_url, activo: j.activo,
          created_at: j.created_at, updated_at: j.updated_at
        }
      end

      def estadistica_json(e)
        {
          id: e.id, partido_id: e.partido_id,
          fecha: e.partido&.fecha,
          minutos_jugados: e.minutos_jugados,
          goles: e.goles, asistencias: e.asistencias,
          tarjetas_amarillas: e.tarjetas_amarillas,
          tarjetas_rojas: e.tarjetas_rojas, rating: e.rating
        }
      end

      def evaluacion_json(e)
        {
          id: e.id, fecha: e.fecha, peso: e.peso,
          velocidad_maxima: e.velocidad_maxima, resistencia: e.resistencia,
          fuerza: e.fuerza, agilidad: e.agilidad, vo2_max: e.vo2_max, notas: e.notas
        }
      end

      def lesion_json(l)
        {
          id: l.id, tipo: l.tipo, descripcion: l.descripcion,
          fecha_inicio: l.fecha_inicio,
          fecha_estimada_retorno: l.fecha_estimada_retorno, estado: l.estado
        }
      end
    end
  end
end
