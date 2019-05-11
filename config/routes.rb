Rails.application.routes.draw do
  resources :authors
  resources :commits
  get "/auth/:provider/callback", to: "sessions#create"
  get 'auth/failure', to: redirect('/')
  #Organization ajax call
  get '/orgs/repos', to: 'organizations#repos'

  delete 'signout', to: 'sessions#destroy', as: 'signout'
  post 'add', to: 'repositories#create', as: 'add_repo'
  root to: 'sessions#new'

  get 'repositories/:repo_id/status', to:'repositories#check_if_its_updating'

  #resources :organizations
  resources :repositories do
	get '/profile/:id', to: 'repositories#profile', as: 'profile'
  end
end
