source 'https://rubygems.org'
ruby '2.4.0'

gem 'rails', '5.0.2'
gem 'jquery-rails'
gem 'autoprefixer-rails', '~> 6.7', '>= 6.7.6'
gem 'sass-rails', '~> 5.0.6'
gem 'compass-rails', '~> 3.0', '>= 3.0.2'
gem 'foundation-rails', '6.3.0'
gem 'sprockets-rails', '2.3.3'
gem 'uglifier', '~> 3.1.5'
gem 'httparty'
gem 'typhoeus'
gem 'useragent'
gem 'carrierwave'
gem 'fog'
gem 'mini_magick'
gem 'unf'
gem 'requirejs-rails', '1.0.0'
gem 'rack-reverse-proxy', '~> 0.11.0', :require => 'rack/reverse_proxy'
# Amazon Ruby sdk for file upload to S3
gem 'aws-sdk', '~> 2'

# http://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html#responders
gem 'responders', '~> 2.0'

gem 'nokogiri', '~> 1.7.0.1'

group :development, :test do
  gem 'rspec-rails', '~> 3.5.2'
  gem 'show_me_the_cookies'
  gem 'factory_girl_rails'
  gem 'shoulda-matchers'
  gem 'database_cleaner'
  gem 'byebug'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'foreman'
  gem 'spring'
  gem 'web-console', '~> 2.0'
end

group :production do
  gem 'rails_12factor'
end

group :test do
  gem 'rails-controller-testing'
  gem 'simplecov'
  gem 'vcr'
end

gem 'newrelic_rpm'
gem 'puma'

gem 'dotenv-rails', :groups => [:development, :test]
