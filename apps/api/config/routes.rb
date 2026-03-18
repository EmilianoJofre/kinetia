Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/login', to: 'auth#login'
      post '/demo', to: 'auth#demo'

      get '/dashboard', to: 'dashboard#index'

      resources :jugadores
      resources :equipos
      resources :partidos
      resources :estadisticas
      resources :evaluaciones_fisicas
      resources :sesiones_entrenamiento
      resources :lesiones
      resources :usuarios
    end
  end
end
