class Api::FieldsController < ApplicationController
  before_action :require_user, except: [:show]

  def index
    @fields = current_user.forms.first.fields
  end

  def show
    # TODO add permission check

    @field = Field.find(params[:id])
  end

  def create
    @field = Field.new(field_params)

    if @field.save
      render :show
    else
      render json: @field.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @field = Field.find(params[:id])

    if @field.update(field_params)
      render :show
    else
      render json: @field.errors.full_messages
    end
  end

  def destroy
    @field = Field.find(params[:id])

    @field.destroy!

    render :show
  end

  private

  def field_params
    params.require(:field).permit(
      :id        ,
      :value     ,
      :ord       ,
      :label     ,
      :field_type,
      :form_id   ,
      :field_id  ,
      options: [
        :classes,
        :min,
        :max,
        :required,
        :duplicates,
        :title,
        :sublabel,
        :placeholder
      ]
    )
  end
end
