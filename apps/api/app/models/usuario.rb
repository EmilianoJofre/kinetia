class Usuario < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :nombre, presence: true
  validates :rol, inclusion: { in: %w[admin entrenador analista] }

  scope :activos, -> { where(activo: true) }
end
