require_relative "boot"
require "rails/all"
Bundler.require(*Rails.groups)

module KinetiaApi
  class Application < Rails::Application
    config.load_defaults 7.1
    config.api_only = true
    config.time_zone = 'Madrid'
    config.i18n.default_locale = :es
    config.autoload_paths << Rails.root.join('lib')
  end
end
