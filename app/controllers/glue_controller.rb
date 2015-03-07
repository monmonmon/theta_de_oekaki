# -*- coding: utf-8 -*-

class GlueController < WebsocketRails::BaseController

  def initialize_session
    logger.debug("initialize glue controller")
  end

  def append
    req = JSON.parse(message)
    theta_id = req["theta_id"].to_i

    Theta.find(theta_id).strokes.new(
      type_id: req["type_id"],
      shape_id: req["shape_id"],
      pos: req["pos"].to_json,
    ).save!

    response = {
      result: "OK",
      data: req,
      meta: {
        requested: Time.now.to_i
      }
    }

    WebsocketRails[theta_id].trigger :shape, response
  rescue => e
    response =  {
      result: "error",
      data: {
        exception: e.class.to_s,
        message: e.message,
      },
      meta: {
        requested: Time.now.to_i,
      }
    }.to_json

    WebsocketRails[theta_id].trigger :shape, response
  end

end
