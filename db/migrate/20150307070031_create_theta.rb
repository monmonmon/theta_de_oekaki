class CreateTheta < ActiveRecord::Migration
  def change
    create_table :theta do |t|
      t.string :url_hash
      t.string :image_url

      t.timestamps
    end
  end
end
