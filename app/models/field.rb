class Field < ActiveRecord::Base
  belongs_to :form

  validates :form, :key, :value, presence: true

  serialize :value, JSON

  # TODO value is JSON, dunno if JSON validation is available
end
