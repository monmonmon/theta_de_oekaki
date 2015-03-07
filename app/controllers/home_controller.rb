# -*- coding: utf-8 -*-

class HomeController < ApplicationController

  def show
    respond_to do |format|
      format.json { _show_json_(params[:id]) }
      format.html
    end
  end


  protected
  def _show_json_(theta_id)
    theta = Theta.find(theta_id)
    render json: {
      result: "OK",
      data: {
        theta_id: theta.id,
        url_hash: theta.url_hash,
        image_url: theta.image_url,
        strokes: theta.strokes.collect{ |x| x.to_hash },
      },
      meta: {
        requested: Time.now.to_i,
      }
    }.to_json
  rescue => e
    render json: {
      result: "error",
      data: {
        exception: e.class.to_s,
        message: e.message,
      },
      meta: {
        requested: Time.now.to_i,
      }
    }.to_json
  end

end
