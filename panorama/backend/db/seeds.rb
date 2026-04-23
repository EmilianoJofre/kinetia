puts "Seeding Panorama..."

operator1 = User.find_or_create_by!(email: "guia@panorama.cl") do |u|
  u.name = "Rodrigo Expediciones"
  u.password = "password123"
  u.role = :operator
  u.bio = "Guía certificado con 10 años de experiencia en la Patagonia"
  u.avatar_url = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200"
end

operator2 = User.find_or_create_by!(email: "outdoor@panorama.cl") do |u|
  u.name = "Aventura Sur"
  u.password = "password123"
  u.role = :operator
  u.bio = "Agencia especializada en deportes extremos y rafting"
  u.avatar_url = "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200"
end

traveler = User.find_or_create_by!(email: "viajero@gmail.com") do |u|
  u.name = "Catalina López"
  u.password = "password123"
  u.role = :traveler
  u.bio = "Aventurera chilena en busca de experiencias únicas"
  u.avatar_url = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
end

activities_data = [
  {
    title: "Trekking Volcán Villarrica",
    description: "Sube a la cumbre del volcán activo más famoso de Chile. Una experiencia única que incluye crampones, piolet y guía certificado. Vistas espectaculares de la Araucanía.",
    price: 85000,
    location: "Pucón, La Araucanía",
    latitude: -39.4199,
    longitude: -71.9523,
    category: "trekking",
    duration_minutes: 480,
    max_capacity: 8,
    operator: operator1,
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800"
    ]
  },
  {
    title: "Rafting Río Futaleufú",
    description: "El río Futaleufú es considerado uno de los mejores ríos de rafting del mundo. Clase IV-V, adrenalina pura en la Patagonia chilena.",
    price: 120000,
    location: "Futaleufú, Los Lagos",
    latitude: -43.1842,
    longitude: -71.8701,
    category: "aventura",
    duration_minutes: 300,
    max_capacity: 10,
    operator: operator2,
    images: [
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ]
  },
  {
    title: "Stargazing Atacama",
    description: "El desierto más árido del mundo ofrece los cielos más limpios del planeta. Tour nocturno con telescopios profesionales y guía astrofísico.",
    price: 45000,
    location: "San Pedro de Atacama",
    latitude: -22.9087,
    longitude: -68.1997,
    category: "astronomia",
    duration_minutes: 180,
    max_capacity: 15,
    operator: operator1,
    images: [
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800",
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800"
    ]
  },
  {
    title: "Kayak Valle de Elqui",
    description: "Recorre el río Elqui en kayak rodeado de viñedos y montañas andinas. Incluye cata de pisco artesanal al regreso.",
    price: 55000,
    location: "Vicuña, Coquimbo",
    latitude: -30.0323,
    longitude: -70.7106,
    category: "kayak",
    duration_minutes: 240,
    max_capacity: 6,
    operator: operator2,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    ]
  },
  {
    title: "Torres del Paine W Trek",
    description: "El trekking más icónico de Sudamérica. 5 días recorriendo los senderos del Parque Nacional Torres del Paine, con transporte y alojamiento incluido.",
    price: 450000,
    location: "Puerto Natales, Magallanes",
    latitude: -51.7269,
    longitude: -72.4998,
    category: "trekking",
    duration_minutes: 7200,
    max_capacity: 6,
    operator: operator1,
    images: [
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=800",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800"
    ]
  }
]

activities_data.each do |data|
  images = data.delete(:images)
  activity = Activity.find_or_create_by!(title: data[:title]) do |a|
    a.assign_attributes(data)
    a.status = :published
  end

  images.each_with_index do |url, i|
    ActivityImage.find_or_create_by!(activity: activity, url: url) { |img| img.position = i }
  end
end

puts "Done! #{User.count} users, #{Activity.count} activities"
