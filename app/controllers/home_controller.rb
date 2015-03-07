# -*- coding: utf-8 -*-

class HomeController < ApplicationController

  def show
    respond_to do |format|
      format.json {
        _show_by_id_(params[:id])
      }
      format.html
    end
  end

  def show_by_hash
    respond_to do |format|
      format.json {
        _show_by_hash_(params[:hash])
      }
      format.html {
        @theta = Theta.find_by_url_hash(params[:hash])
      }
    end
  end


  protected
  def _show_by_hash_(url_hash)
    theta = Theta.find_by_url_hash(url_hash)
    _show_json_(theta)
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

  def _show_by_id_(theta_id)
    theta = Theta.find(theta_id)
    _show_json_(theta)
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

  def _show_json_(theta)
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
  end

end
