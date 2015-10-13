class Api::FormsController < ApplicationController
  before_action :api_require_user, except: [:show]

  def index
    @forms = current_user.forms.where(version: nil).includes(fields: :fields)
  end

  def show
    # TODO add permission check

    if params[:submissions]
      @show_submissions = true
      @form = Form.includes(:submissions)
    else
      @form = Form.includes(fields: :fields)
    end

    if params[:slug]
      if params[:live]
        @form = @form.live(params[:slug])
      else
        @form = @form.draft(params[:slug])
      end
    else
      @form = @form.find(params[:id])
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

  def promulgate
    original_form = Form.includes(fields: :fields).find(params[:id])

    form = original_form.dup

    original_form.fields.each do |field|
      field = field.dup
      field.fields.map(&:dup)
      form.fields << field
    end

    form.slug ||= original_form.id

    form.version = Form.where(slug: form.slug).length || 1

    # TODO loop over submissions
      # mark deleted fields as dead
      # link SubmissionFields to their new field

    if form.save
      form.fields.each(&:save)
      original_form.update(slug: form.slug) if original_form.slug.nil?
      render json: original_form
    else
      render json: {}, status: :unprocessable_entity
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
