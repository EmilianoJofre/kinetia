module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_request

      def login
        usuario = Usuario.find_by(email: params[:email])
        if usuario&.authenticate(params[:password]) && usuario.activo
          token = JsonWebToken.encode(user_id: usuario.id, email: usuario.email, rol: usuario.rol)
          render json: {
            token: token,
            usuario: {
              id: usuario.id,
              nombre: usuario.nombre,
              email: usuario.email,
              rol: usuario.rol
            }
          }, status: :ok
        else
          render json: { error: 'Credenciales inválidas' }, status: :unauthorized
        end
      end

      def demo
        usuario = Usuario.find_by(email: 'demo@kinetia.app')
        if usuario
          token = JsonWebToken.encode(user_id: usuario.id, email: usuario.email, rol: usuario.rol)
          render json: {
            token: token,
            usuario: {
              id: usuario.id,
              nombre: usuario.nombre,
              email: usuario.email,
              rol: usuario.rol
            }
          }, status: :ok
        else
          render json: { error: 'Usuario demo no encontrado' }, status: :not_found
        end
      end
    end
  end
end
