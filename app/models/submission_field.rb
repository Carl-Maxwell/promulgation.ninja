class SubmissionField < ActiveRecord::Base
  belongs_to :field

  validates :field, presence: true
  validates :state, inclusion: ["alive", "dead"]

  validate :field_logic

  def field_logic
    field = Field.find(field_id)

    errors = field.validate_submission_value(value)

    # TODO why doesn't `self.errors[:value] += errors` work?

    errors.each do |error|
      self.errors[:value] << error
    end
  end
end
