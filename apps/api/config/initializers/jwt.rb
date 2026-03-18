module JsonWebToken
  SECRET_KEY = ENV.fetch('JWT_SECRET', 'kinetia_jwt_secret_key_2024')

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError => e
    raise ExceptionHandler::InvalidToken, e.message
  end
end
