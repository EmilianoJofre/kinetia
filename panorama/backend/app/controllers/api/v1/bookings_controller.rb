module Api
  module V1
    class BookingsController < ApplicationController
      def index
        bookings = current_user.bookings.includes(:activity).order(created_at: :desc)
        render json: bookings.map { |b| booking_json(b) }
      end

      def create
        booking = current_user.bookings.build(booking_params)
        if booking.save
          render json: booking_json(booking), status: :created
        else
          render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        booking = current_user.bookings.find(params[:id])
        if booking.update(status: params[:status])
          render json: booking_json(booking)
        else
          render json: { errors: booking.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Not found" }, status: :not_found
      end

      private

      def booking_params
        params.permit(:activity_id, :date, :participants, :notes)
      end

      def booking_json(booking)
        booking.as_json(only: [:id, :status, :date, :participants, :notes, :created_at])
               .merge("activity" => booking.activity.as_json(only: [:id, :title, :price, :location]))
      end
    end
  end
end
