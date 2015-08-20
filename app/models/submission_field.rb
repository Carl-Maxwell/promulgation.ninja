class SubmissionField < ActiveRecord::Base
  belongs_to :field

  validates :field, presence: true
  validates :state, inclusion: ["live", "dead"]

  validate :field_logic

  def field_logic
    field = Field.find(field_id)

    errors = field.validate_submission_value(value)

    # add errors to the active record magic validation errors stuff
  end
end
