class CreateStrokes < ActiveRecord::Migration
  def change
    create_table :strokes do |t|
      t.references :theta, index: true
      t.integer :type_id
      t.integer :shape_id
      t.text :pos

      t.timestamps
    end
  end
end
