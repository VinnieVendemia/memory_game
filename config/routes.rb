Rails.application.routes.draw do
  root "games#index"

  resources :games
  get 'cards/:id', to: 'cards#show'
end
