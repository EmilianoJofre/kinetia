class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :activity

  enum status: { pending: 0, confirmed: 1, cancelled: 2, completed: 3 }

  validates :date, presence: true
  validates :participants, numericality: { greater_than: 0 }
  validates :status, presence: true
end
