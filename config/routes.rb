Rails.application.routes.draw do
  resources :images

  resources :strokes

  resources :theta

  resources :hmock_websocketview
  get '/test' => 'theta#test'
end
