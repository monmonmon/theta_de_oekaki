json.array!(@theta) do |thetum|
  json.extract! thetum, :id, :url_hash, :image_url
  json.url thetum_url(thetum, format: :json)
end
