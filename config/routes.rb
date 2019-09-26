Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :users do
      get "my_friends", to: "users#my_friends"
      get "add_friend", to: "users#add_friend"
      resources :posts
    end
  end

end
