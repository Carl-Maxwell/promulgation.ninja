class FormsController < ApplicationController
  def show
    # TODO use env or the like to get a salt
    # slug = Hashids.new("this is a salt, man", 5, '234679acdefghjkmnpqrtvwxyz').decode(params[:slug]).try(:first)

    # TODO should do version IS NOT NULL, order version: :desc, .first

    @form = Form
      .includes(fields: :fields)
      .where(slug: params[:slug])
      .order(version: :desc)
      .limit(1)
      .first
  end
end
