class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.integer :user_id
      t.integer :activity_id
      t.integer :status
      t.date :date
      t.integer :participants
      t.text :notes

      t.timestamps
    end
  end
end
