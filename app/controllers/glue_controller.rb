# -*- coding: utf-8 -*-

class GlueController < WebsocketRails::BaseController

  def initialize_session
    logger.debug("initialize chat controller")
  end

  def append
    req = JSON.parse(message)
    theta_id = req["theta_id"].to_i
    response = {
      result: "OK",
      data: req,
      meta: {
        requested: Time.now.to_i
      }
    }
    WebsocketRails[theta_id].trigger :shape, response
  end

end
