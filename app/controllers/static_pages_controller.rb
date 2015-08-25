class StaticPagesController < ApplicationController
  before_action :require_user

  def index
    # debugger
    # redirect_to root_url + "#" if request.url == "boop"

    render :homepage unless logged_in?
  end

  def contact
    # TODO render some seed-ed form
    # => like: @form = Form.find_live(slug: 1)
    # => then render forms show ... somehow
  end

  def privacy
  end

  def about
  end

  def terms
  end

  def developers
  end
end
