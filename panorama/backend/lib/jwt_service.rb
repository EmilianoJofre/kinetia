class JwtService
  SECRET = Rails.application.credentials.secret_key_base || ENV.fetch("SECRET_KEY_BASE")
  EXPIRY = 30.days

  def self.encode(payload)
    payload[:exp] = EXPIRY.from_now.to_i
    JWT.encode(payload, SECRET, "HS256")
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET, true, algorithm: "HS256")
    HashWithIndifferentAccess.new(decoded[0])
  rescue JWT::DecodeError, JWT::ExpiredSignature
    nil
  end
end
