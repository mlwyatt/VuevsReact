Rails.application.routes.draw do
  get 'react' => 'react#index'
  scope :react do
    get '*page', to: 'react#index', constraints: ->(req) do
      !req.xhr? && req.format.html?
    end
  end

  get 'vue' => 'vue#index'
  scope :vue do
    get '*page', to: 'vue#index', constraints: ->(req) do
      !req.xhr? && req.format.html?
    end
  end

  namespace :api do
    namespace :v1 do
      resources :todo_items
    end
  end

  root 'static#index'
  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
