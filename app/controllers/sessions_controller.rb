class SessionsController < ApplicationController
  before_action :require_guest, only: [:new, :create]
  before_action :require_user , only: [:destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params[:name], user_params[:password])

    if login(@login)
      redirect_to root_url + "#"
    else
      flash[:errors] = ["No user matches that name / password combination"]
      redirect_to new_session_url
    end
  end

  def destroy
    logout

    redirect_to new_session_url
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end
end
