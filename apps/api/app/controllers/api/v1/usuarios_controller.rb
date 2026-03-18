module Api
  module V1
    class UsuariosController < ApplicationController
      before_action :set_usuario, only: [:show, :update, :destroy]

      def index
        @usuarios = Usuario.all
        render json: @usuarios.map { |u| usuario_json(u) }
      end

      def show
        render json: usuario_json(@usuario)
      end

      def create
        @usuario = Usuario.new(usuario_params)
        if @usuario.save
          render json: usuario_json(@usuario), status: :created
        else
          render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @usuario.update(usuario_params)
          render json: usuario_json(@usuario)
        else
          render json: { errors: @usuario.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @usuario.update(activo: false)
        render json: { message: 'Usuario desactivado' }
      end

      private

      def set_usuario
        @usuario = Usuario.find(params[:id])
      end

      def usuario_params
        params.require(:usuario).permit(:nombre, :email, :password, :password_confirmation, :rol, :activo)
      end

      def usuario_json(u)
        { id: u.id, nombre: u.nombre, email: u.email, rol: u.rol, activo: u.activo,
          created_at: u.created_at, updated_at: u.updated_at }
      end
    end
  end
end
