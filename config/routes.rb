Rails.application.routes.draw do
  resources :users, except: [:index, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api do
    resources :forms, except: [:new, :edit]
    resources :fields, except: [:new, :edit]
    # resources :submissions, only: [:create]
  end

  get '/f/:slug', to: 'forms#show'

  root "static_pages#index"
end
