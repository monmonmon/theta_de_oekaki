
class HomeController < ApplicationController

  def show
    respond_to do |format|
      format.json { _show_json_ }
      format.html
    end
  end

  protected
  def _show_json_
    theta_id = params[:id]
    str = <<-"EOS"
{
    "theta_id": "#{theta_id}",
    "type_id": 1,
    "image_id": 1,
    "shape_id": 1,
    "pos": [
      {
        "color": "#ff00ee",
        "y": 100,
        "x": 100,
        "z": 100
      },
      {
        "color": "#ff00ee",
        "y": 200,
        "x": 200,
        "z": 200
      },
      {
        "color": "#ff00ee",
        "y": 300,
        "x": 300,
        "z": 300
      }
    ]
}
    EOS

    render json: {
      result: "OK",
      data: JSON.parse(str),
      meta: {
        requested: Time.now.to_i,
      }
    }
  end

end
