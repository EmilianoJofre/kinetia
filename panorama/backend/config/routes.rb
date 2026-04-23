Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      post "auth/register", to: "auth#register"
      post "auth/login", to: "auth#login"
      get  "auth/me", to: "auth#me"

      resources :activities, only: [:index, :show, :create, :update]
      resources :bookings, only: [:index, :create, :update]
    end
  end
end
