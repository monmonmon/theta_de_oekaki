json.array!(@strokes) do |stroke|
  json.extract! stroke, :id, :theta_id, :type_id, :shape_id, :pos
  json.url stroke_url(stroke, format: :json)
end
