Rails.application.routes.draw do

  root :to => 'home#index'

  resources :games
  resources :challengers

end
