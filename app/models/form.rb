class Form < ActiveRecord::Base
  belongs_to :user
  has_many :fields, -> { order :ord }

  has_many(
    :submissions,
    primary_key: :slug,
    foreign_key: :slug,
    class_name: Submission
  )

  validates :user, :title, presence: true

  scope :live, ->(slug) {
    where(slug: slug)
    .where.not(version: nil)
    .order(version: :desc)
    .limit(1)
    .first
  }

  scope :draft, ->(slug) { find_by(slug: slug, version: nil) }

  # def to_param
  #   # TODO use env or the like to get a salt
  #
  #   slug ? Hashids.new("this is a salt, man", 5, '234679acdefghjkmnpqrtvwxyz').encode(slug) : ''
  # end
end
