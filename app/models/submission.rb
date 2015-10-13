class Submission < ActiveRecord::Base
  belongs_to :form
  has_many :submission_fields

  validates :form, presence: true

  scope :form_draft, -> { Form.draft(slug) }
  scope :form_live,  -> { Form.live(slug) }
end
