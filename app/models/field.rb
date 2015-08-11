class Field < ActiveRecord::Base
  belongs_to :form

  validates :form, :key, :value, presence: true

  # TODO value is JSON, dunno if JSON validation is available
end
