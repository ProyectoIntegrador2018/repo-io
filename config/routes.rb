Rails.application.routes.draw do
  resources :authors
  resources :commits
  resources :organizations
  resources :repositories
  get "/auth/:provider/callback", to: "sessions#create"
  get 'auth/failure', to: redirect('/')
  delete 'signout', to: 'sessions#destroy', as: 'signout'
  root to: 'sessions#new'
end
