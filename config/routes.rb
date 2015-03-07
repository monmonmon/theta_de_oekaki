Rails.application.routes.draw do
  resources :images

  resources :strokes

  resources :theta

  get '/test' => 'theta#test'
end
