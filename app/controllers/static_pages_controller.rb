class StaticPagesController < ApplicationController
  before_action :require_user

  def index
    render :homepage unless logged_in?
  end
end
