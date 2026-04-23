class CreateActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :activities do |t|
      t.string :title
      t.text :description
      t.decimal :price
      t.string :location
      t.decimal :latitude
      t.decimal :longitude
      t.string :category
      t.integer :status
      t.integer :duration_minutes
      t.integer :max_capacity
      t.integer :operator_id

      t.timestamps
    end
  end
end
