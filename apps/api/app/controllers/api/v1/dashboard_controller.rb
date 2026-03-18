module Api
  module V1
    class DashboardController < ApplicationController
      def index
        total_jugadores = Jugador.where(activo: true).count
        partidos_jugados = Partido.where(estado: 'finalizado').count
        lesiones_activas = Lesion.where(estado: 'activa').count

        ratings = EstadisticaJugador.where.not(rating: nil).pluck(:rating)
        promedio_rendimiento = ratings.any? ? (ratings.sum / ratings.count.to_f).round(2) : 0

        # Performance over last 10 matches
        ultimos_partidos = Partido.where(estado: 'finalizado').order(fecha: :desc).limit(10).reverse
        rendimiento_equipo = ultimos_partidos.map do |p|
          ratings_partido = EstadisticaJugador.where(partido_id: p.id).pluck(:rating).compact
          avg = ratings_partido.any? ? (ratings_partido.sum / ratings_partido.count.to_f).round(2) : 0
          {
            fecha: p.fecha.strftime('%d/%m'),
            rendimiento: avg,
            goles: p.goles_local.to_i + p.goles_visitante.to_i
          }
        end

        # Top 10 players by average rating
        top_jugadores = Jugador.where(activo: true).limit(10).map do |j|
          stats = EstadisticaJugador.where(jugador_id: j.id).pluck(:rating).compact
          avg = stats.any? ? (stats.sum / stats.count.to_f).round(2) : 0
          {
            nombre: "#{j.nombre} #{j.apellido}",
            posicion: j.posicion,
            rating: avg
          }
        end.sort_by { |j| -j[:rating] }.first(10)

        # Match results pie chart
        victorias = 0; empates = 0; derrotas = 0
        partidos_finalizados = Partido.where(estado: 'finalizado')
        partidos_finalizados.each do |p|
          gl = p.goles_local.to_i; gv = p.goles_visitante.to_i
          if gl > gv then victorias += 1
          elsif gl == gv then empates += 1
          else derrotas += 1
          end
        end
        resultados = [
          { name: 'Victorias', value: victorias },
          { name: 'Empates', value: empates },
          { name: 'Derrotas', value: derrotas }
        ]

        # Physical evolution (last 6 evaluations avg)
        evolucion_fisica = EvaluacionFisica.order(fecha: :desc).limit(30).reverse.each_slice(5).map do |grupo|
          {
            fecha: grupo.last[:fecha].strftime('%b'),
            peso: grupo.map(&:peso).compact.then { |a| a.any? ? (a.sum / a.count.to_f).round(1) : nil },
            velocidad: grupo.map(&:velocidad_maxima).compact.then { |a| a.any? ? (a.sum / a.count.to_f).round(1) : nil }
          }
        end

        render json: {
          metricas: {
            total_jugadores: total_jugadores,
            partidos_jugados: partidos_jugados,
            promedio_rendimiento: promedio_rendimiento,
            lesiones_activas: lesiones_activas
          },
          rendimiento_equipo: rendimiento_equipo,
          top_jugadores: top_jugadores,
          resultados_partidos: resultados,
          evolucion_fisica: evolucion_fisica
        }
      end
    end
  end
end
