class ApplicationController < ActionController::API
  include ExceptionHandler

  before_action :authenticate_request

  rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized
  rescue_from ExceptionHandler::MissingToken, with: :unauthorized
  rescue_from ExceptionHandler::InvalidToken, with: :unauthorized
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

  private

  def authenticate_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    raise ExceptionHandler::MissingToken, 'Token faltante' unless token
    @decoded = JsonWebToken.decode(token)
    @current_user = Usuario.find(@decoded[:user_id])
  rescue ActiveRecord::RecordNotFound => e
    raise ExceptionHandler::InvalidToken, e.message
  end

  def unauthorized(e)
    render json: { error: e.message }, status: :unauthorized
  end

  def not_found(e)
    render json: { error: e.message }, status: :not_found
  end

  def unprocessable_entity(e)
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
