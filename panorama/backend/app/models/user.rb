class User < ApplicationRecord
  has_secure_password

  enum role: { traveler: 0, operator: 1, business: 2 }

  has_many :bookings, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :activities, foreign_key: :operator_id, dependent: :destroy

  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :role, presence: true

  before_save { self.email = email.downcase }
end
