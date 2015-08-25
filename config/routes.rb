Rails.application.routes.draw do
  resources :users, except: [:index, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api do
    resources :forms, except: [:new, :edit]
    resources :fields, except: [:new, :edit]
    get '/forms/:form_id/submissions/', to: 'submissions#index'
    post '/submissions/:slug', to: 'submissions#create'
  end

  get '/contact', to: 'static_pages#contact'
  
  get '/privacy', to: 'static_pages#privacy'
  get '/about', to: 'static_pages#about'
  get '/terms', to: 'static_pages#terms'
  get '/developers', to: 'static_pages#developers'

  get '/:slug', to: 'forms#show'

  root "static_pages#index"
end
