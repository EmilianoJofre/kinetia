module Api
  module V1
    class DashboardController < ApplicationController
      def index
        total_jugadores = Jugador.where(activo: true).count
        partidos_jugados = Partido.where(estado: 'finalizado').count
        lesiones_activas = Lesion.where(estado: 'activa').count

        # Promedio de tries por partido como indicador de rendimiento ofensivo
        total_tries = EstadisticaJugador.sum(:tries)
        promedio_tries = partidos_jugados > 0 ? (total_tries.to_f / partidos_jugados).round(2) : 0

        # Rendimiento por partido: tries anotados + puntos totales
        ultimos_partidos = Partido.where(estado: 'finalizado').order(fecha: :desc).limit(10).reverse
        rendimiento_equipo = ultimos_partidos.map do |p|
          tries_partido = EstadisticaJugador.where(partido_id: p.id).sum(:tries)
          {
            fecha: p.fecha.strftime('%d/%m'),
            tries: tries_partido,
            puntos: p.puntos_local.to_i + p.puntos_visitante.to_i
          }
        end

        # Top 10 jugadores por impacto (tries + tackles)
        top_jugadores = Jugador.where(activo: true).map do |j|
          stats = EstadisticaJugador.where(jugador_id: j.id)
          tries_total   = stats.sum(:tries)
          tackles_total = stats.sum(:tackles)
          {
            nombre: "#{j.nombre} #{j.apellido}",
            posicion: j.posicion,
            tries: tries_total,
            tackles: tackles_total,
            impacto: tries_total + tackles_total
          }
        end.sort_by { |j| -j[:impacto] }.first(10)

        # Resultados de partidos por puntos
        victorias = 0; empates = 0; derrotas = 0
        Partido.where(estado: 'finalizado').each do |p|
          pl = p.puntos_local.to_i; pv = p.puntos_visitante.to_i
          if pl > pv then victorias += 1
          elsif pl == pv then empates += 1
          else derrotas += 1
          end
        end
        resultados = [
          { name: 'Victorias', value: victorias },
          { name: 'Empates', value: empates },
          { name: 'Derrotas', value: derrotas }
        ]

        # Evolución física (últimas 30 evaluaciones agrupadas de a 5)
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
            promedio_tries_por_partido: promedio_tries,
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
