FROM ruby:3.2

RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  libyaml-dev \
  nodejs \
  curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock* ./
RUN bundle install

COPY . .

RUN mkdir -p tmp/pids log

EXPOSE 3000

CMD ["bash", "-c", "rm -f tmp/pids/server.pid && bundle exec rails server -b '0.0.0.0'"]
