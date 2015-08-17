class StaticPagesController < ApplicationController
  before_action :require_user

  def index
    # debugger
    # redirect_to root_url + "#" if request.url == "boop"

    render :homepage unless logged_in?
  end
end
