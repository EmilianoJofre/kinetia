class CreateActivityImages < ActiveRecord::Migration[7.1]
  def change
    create_table :activity_images do |t|
      t.integer :activity_id
      t.string :url
      t.integer :position

      t.timestamps
    end
  end
end
