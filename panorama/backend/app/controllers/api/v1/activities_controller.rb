module Api
  module V1
    class ActivitiesController < ApplicationController
      skip_before_action :authenticate!, only: [:index, :show]

      def index
        activities = Activity.published
          .by_category(params[:category])
          .includes(:operator, :activity_images, :reviews)

        activities = activities.where("title ILIKE ?", "%#{params[:q]}%") if params[:q].present?
        activities = activities.where(location: params[:location]) if params[:location].present?

        render json: activities.map { |a| activity_json(a) }
      end

      def show
        activity = Activity.includes(:operator, :activity_images, :reviews).find(params[:id])
        render json: activity_json(activity, detailed: true)
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Activity not found" }, status: :not_found
      end

      def create
        return render json: { error: "Only operators can create activities" }, status: :forbidden unless current_user.operator?

        activity = current_user.activities.build(activity_params)
        activity.status = :published

        if activity.save
          render json: activity_json(activity), status: :created
        else
          render json: { errors: activity.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        activity = current_user.activities.find(params[:id])
        if activity.update(activity_params)
          render json: activity_json(activity)
        else
          render json: { errors: activity.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Not found" }, status: :not_found
      end

      private

      def activity_params
        params.permit(:title, :description, :price, :location, :latitude, :longitude,
                      :category, :duration_minutes, :max_capacity)
      end

      def activity_json(activity, detailed: false)
        data = activity.as_json(only: [:id, :title, :description, :price, :location,
                                        :latitude, :longitude, :category, :status,
                                        :duration_minutes, :max_capacity, :created_at])
        data["operator"] = activity.operator.as_json(only: [:id, :name, :avatar_url])
        data["images"] = activity.activity_images.map { |i| { id: i.id, url: i.url } }
        data["avg_rating"] = activity.reviews.average(:rating)&.round(1)
        data["reviews_count"] = activity.reviews.count

        if detailed
          data["reviews"] = activity.reviews.includes(:user).map do |r|
            r.as_json(only: [:id, :rating, :comment, :created_at])
             .merge("user" => r.user.as_json(only: [:id, :name, :avatar_url]))
          end
        end

        data
      end
    end
  end
end
