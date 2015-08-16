class Field < ActiveRecord::Base
  validates :form, presence: true
  validates :name, :ord, :field_type, presence: true

  serialize :options, JSON

  belongs_to :form
  belongs_to :field
  has_many :fields
end
