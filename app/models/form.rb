class Form < ActiveRecord::Base
  belongs_to :user
  has_many :fields, -> { order :ord }

  validates :user, :title, presence: true

  # def to_param
  #   # TODO use env or the like to get a salt
  #
  #   slug ? Hashids.new("this is a salt, man", 5, '234679acdefghjkmnpqrtvwxyz').encode(slug) : ''
  # end
end
