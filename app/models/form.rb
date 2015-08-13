class Form < ActiveRecord::Base
  belongs_to :user
  has_many :fields, -> { order :ord }

  validates :user, :title, presence: true
end
