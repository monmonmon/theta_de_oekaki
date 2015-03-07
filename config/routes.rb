Rails.application.routes.draw do
  get "/m/:id(.:format)", controller: :home, action: :show, :constraints => {:id => /\d+/}


  resources :images

  resources :strokes

  resources :theta

  resources :hmock_websocketview
  resources :glue, only: [:show]

  get '/test' => 'theta#test'
end
