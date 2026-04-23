class Activity < ApplicationRecord
  belongs_to :operator, class_name: "User"
  has_many :activity_images, dependent: :destroy
  has_many :bookings, dependent: :destroy
  has_many :reviews, dependent: :destroy

  enum status: { draft: 0, published: 1, paused: 2 }

  validates :title, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :operator, presence: true

  scope :published, -> { where(status: :published) }
  scope :by_category, ->(cat) { where(category: cat) if cat.present? }
  scope :near, ->(lat, lng, km = 50) {
    where(
      "earth_box(ll_to_earth(?, ?), ?) @> ll_to_earth(latitude, longitude)",
      lat, lng, km * 1000
    )
  } if false # enable when earthdistance extension added
end
