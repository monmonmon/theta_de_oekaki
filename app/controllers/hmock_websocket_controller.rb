# -*- coding: utf-8 -*-

class HmockWebsocketController < WebsocketRails::BaseController

  def initialize_session
    logger.debug("initialize chat controller")
  end

  def append
    req = JSON.parse(message)
    response = {
      result: "OK",
      data: req,
      meta: {
        requested: 1377003045,
        exec_time: 0.089531
      }
    }
    theta_id = req["theta_id"].to_i
    WebsocketRails[theta_id].trigger :shape, response
  end
end
