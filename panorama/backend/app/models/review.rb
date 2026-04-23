class Review < ApplicationRecord
  belongs_to :user
  belongs_to :activity

  validates :rating, inclusion: { in: 1..5 }
  validates :user_id, uniqueness: { scope: :activity_id, message: "already reviewed this activity" }
end
