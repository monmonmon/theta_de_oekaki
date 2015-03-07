class AddImageIdToStroke < ActiveRecord::Migration
  def change
    add_column :strokes, :image_id, :integer
  end
end
