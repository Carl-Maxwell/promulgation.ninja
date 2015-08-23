Rails.application.routes.draw do
  resources :users, except: [:index, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api do
    resources :forms, except: [:new, :edit]
    resources :fields, except: [:new, :edit]
    get '/forms/:form_id/submissions/', to: 'submissions#index'
    post '/submissions/:slug', to: 'submissions#create'
  end

  get '/:slug', to: 'forms#show'

  root "static_pages#index"
end
