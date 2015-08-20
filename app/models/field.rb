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

  def v(validatorian, extra = {})
    # TODO improve name (without shadowing anything)

    if validatorian == :Phony
      phone = value.phony_formatted(normalize: 'US', strict: true)
      if phone
        phone.phony_formatted!(normalize: 'US', spaces: '-')
      else
        self.errors[:value] << "is an invalid phone number" unless phone
      end
    else
      validates_with(
        ("ActiveModel::Validations::#{validatorian}Validator").constantize,
        {attributes: :value}.merge(extra)
      )
    end

    nil
  end

  def validate_submission_value(value_arg)
    # changing self.value allows us to leverage Active Record validations
    # take care not to self.save

    self.value = value_arg

    v(:Presence) if options[:required]

    if options[:duplicates]
      if SubmissionField.find_by(field_id: id, value: value)
        self.errors[:value] << "must be unique"
      end
    end

    if min_max?
      value >= options.min
      value <= options.max
    end

    debugger

    case field_type
    when "dropdown",
         "radio",
         "checkbox"      then v(:Inclusion, in: fields.pluck(:label))
    when "number"        then v(:Numericality)
    when "website"       then v(:Url)
    # when "date"          then is date
    when "phone"         then v(:Phony)
    when "email"         then v(:Format, with: /@/)
    # when "price"         then is price? is within min max?
    # when "rating"        then is within min max?
    # when "address"       then nothing?
    # when "likert"        then subfield stuff
    # when "code editor"   then nothing
    # when "markup editor" then nothing (javascript should validate markup to be helpful)
    # when "video"         then url is recognizable video url

     else ["invalid field_type"]
     end

     # return an array
     self.errors.full_messages
  end

  def min_max?
    ['number', 'price', 'rating'].include? field_type
  end
end
