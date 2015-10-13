class FormsController < ApplicationController
  def show
    # TODO use env or the like to get a salt
    # slug = Hashids.new("this is a salt, man", 5, '234679acdefghjkmnpqrtvwxyz').decode(params[:slug]).try(:first)

    @form = Form
      .includes(fields: :fields)
      .where(slug: params[:slug])
      .where.not(version: nil)
      .order(version: :desc)
      .limit(1)
      .first
  end
end
