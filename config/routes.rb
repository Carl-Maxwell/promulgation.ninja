Rails.application.routes.draw do
  resources :users, except: [:index, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api do
    put 'forms/:id/promulgate', to: 'forms#promulgate'
    resources :forms, except: [:new, :edit]
    resources :fields, except: [:new, :edit]
    get '/forms/:slug/submissions/', to: 'submissions#index'
    post '/submissions/:slug', to: 'submissions#create'
  end

  # get '/contact', to: 'static_pages#contact'

  # get '/privacy', to: 'static_pages#privacy'
  get '/about', to: 'static_pages#about'
  # get '/terms', to: 'static_pages#terms'
  # get '/developers', to: 'static_pages#developers'

  get '/:slug', to: 'forms#show'

  root "static_pages#index"
end
