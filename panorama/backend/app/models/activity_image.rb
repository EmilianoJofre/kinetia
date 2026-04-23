class ActivityImage < ApplicationRecord
  belongs_to :activity
  validates :url, presence: true
  default_scope { order(:position) }
end
