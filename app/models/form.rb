class Form < ActiveRecord::Base
  belongs_to :user
  has_many :fields

  validates :user, :title, presence: true
end
