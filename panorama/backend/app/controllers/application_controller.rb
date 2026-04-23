class ApplicationController < ActionController::API
  before_action :authenticate!

  private

  def authenticate!
    token = request.headers["Authorization"]&.split(" ")&.last
    payload = JwtService.decode(token.to_s)
    @current_user = User.find_by(id: payload[:user_id]) if payload
    render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
  end

  def current_user
    @current_user
  end
end
