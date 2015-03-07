Rails.application.routes.draw do
  get "/m/:id(.:format)", controller: :home, action: :show, :constraints => {:id => /\d+/}
  get "/h/:hash(.:format)", controller: :home, action: :show_by_hash

  resources :images

  resources :strokes

  resources :theta

  resources :hmock_websocketview
  resources :glue, only: [:show]

  get '/test' => 'theta#test'
end
