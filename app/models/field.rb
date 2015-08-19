class Field < ActiveRecord::Base
  validates :form , presence: { if: -> { field.nil? } }
  validates :field, presence: { if: -> { form.nil?  } }
  validates :ord, :field_type, presence: true
  validates :label, length: { minimum: 0, allow_nil: false }

  validate :field_logic

  serialize :options, JSON

  belongs_to :form
  belongs_to :field
  has_many :fields, -> { order :ord }

  after_save :update_parent

  def field_logic
    if ['radio-item', 'dropdown-item'].include? field_type
      if value != ""
        # TODO this is not a validation.
        self.field.fields.where.not(id: id).update_all(value: "")
      end
    elsif field_type == 'checkbox-item'
      # ...
    end
  end

  def update_parent
    # do stuff
  end
end
