
class Stroke < ActiveRecord::Base
  belongs_to :theta

  def to_hash
    {
      theta_id: theta_id,
      type_id: type_id,
      shape_id: shape_id,
      pos: JSON.parse(pos),
    }
  end
end
