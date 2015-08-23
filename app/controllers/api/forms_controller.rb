class Api::FormsController < ApplicationController
  before_action :api_require_user, except: [:show]

  def index
    @forms = current_user.forms.includes(fields: :fields)
  end

  def show
    # TODO add permission check

    if params[:submissions]
      @show_submissions = true
      @form = Form.includes(:submissions).find(params[:id]);
    else
      @form = Form.includes(fields: :fields).find(params[:id]);
    end
  end

  def create
    @form = Form.new(form_params.merge(user: current_user))

    if @form.save
      render :show
    else
      render json: @form.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @form = Form.find(params[:id])

    if @form.update(form_params)
      render :show
    else
      render json: @form.errors.full_messages
    end
  end

  def destroy
    @form = Form.find(params[:id])

    @form.destroy!

    render :show
  end

  private

  def form_params
    params.require(:form).permit(:title)
  end
end
