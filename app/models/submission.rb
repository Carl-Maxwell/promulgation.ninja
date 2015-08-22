class Submission < ActiveRecord::Base
  belongs_to :form
  has_many :submission_fields

  validates :form, presence: true
end
