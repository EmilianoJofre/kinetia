# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_01_000008) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "equipos", force: :cascade do |t|
    t.string "nombre", null: false
    t.string "categoria"
    t.string "entrenador"
    t.string "temporada"
    t.string "logo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "estadisticas_jugador", force: :cascade do |t|
    t.bigint "jugador_id", null: false
    t.bigint "partido_id", null: false
    t.integer "minutos_jugados", default: 0
    t.integer "goles", default: 0
    t.integer "asistencias", default: 0
    t.integer "tarjetas_amarillas", default: 0
    t.integer "tarjetas_rojas", default: 0
    t.decimal "rating", precision: 3, scale: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jugador_id"], name: "index_estadisticas_jugador_on_jugador_id"
    t.index ["partido_id"], name: "index_estadisticas_jugador_on_partido_id"
  end

  create_table "evaluaciones_fisicas", force: :cascade do |t|
    t.bigint "jugador_id", null: false
    t.date "fecha", null: false
    t.decimal "peso", precision: 5, scale: 2
    t.decimal "velocidad_maxima", precision: 4, scale: 1
    t.decimal "resistencia", precision: 4, scale: 1
    t.decimal "fuerza", precision: 4, scale: 1
    t.decimal "agilidad", precision: 4, scale: 1
    t.decimal "vo2_max", precision: 4, scale: 1
    t.text "notas"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jugador_id"], name: "index_evaluaciones_fisicas_on_jugador_id"
  end

  create_table "jugadores", force: :cascade do |t|
    t.string "nombre", null: false
    t.string "apellido", null: false
    t.string "posicion"
    t.integer "edad"
    t.decimal "altura", precision: 4, scale: 2
    t.decimal "peso", precision: 5, scale: 2
    t.integer "numero"
    t.bigint "equipo_id", null: false
    t.string "foto_url"
    t.boolean "activo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipo_id"], name: "index_jugadores_on_equipo_id"
  end

  create_table "lesiones", force: :cascade do |t|
    t.bigint "jugador_id", null: false
    t.string "tipo", null: false
    t.text "descripcion"
    t.date "fecha_inicio", null: false
    t.date "fecha_estimada_retorno"
    t.string "estado", default: "activa"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jugador_id"], name: "index_lesiones_on_jugador_id"
  end

  create_table "partidos", force: :cascade do |t|
    t.bigint "equipo_local_id", null: false
    t.bigint "equipo_visitante_id", null: false
    t.integer "goles_local", default: 0
    t.integer "goles_visitante", default: 0
    t.datetime "fecha"
    t.string "estado", default: "programado"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipo_local_id"], name: "index_partidos_on_equipo_local_id"
    t.index ["equipo_visitante_id"], name: "index_partidos_on_equipo_visitante_id"
  end

  create_table "sesiones_entrenamiento", force: :cascade do |t|
    t.bigint "equipo_id", null: false
    t.datetime "fecha"
    t.integer "duracion"
    t.string "tipo"
    t.string "intensidad"
    t.text "descripcion"
    t.integer "asistentes", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipo_id"], name: "index_sesiones_entrenamiento_on_equipo_id"
  end

  create_table "usuarios", force: :cascade do |t|
    t.string "nombre", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "rol", default: "analista"
    t.boolean "activo", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_usuarios_on_email", unique: true
  end

  add_foreign_key "estadisticas_jugador", "jugadores", column: "jugador_id"
  add_foreign_key "estadisticas_jugador", "partidos"
  add_foreign_key "evaluaciones_fisicas", "jugadores", column: "jugador_id"
  add_foreign_key "jugadores", "equipos"
  add_foreign_key "lesiones", "jugadores", column: "jugador_id"
  add_foreign_key "partidos", "equipos", column: "equipo_local_id"
  add_foreign_key "partidos", "equipos", column: "equipo_visitante_id"
  add_foreign_key "sesiones_entrenamiento", "equipos"
end
