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
      if field.field_slug.nil?
        field.field_slug = field.id
        field.save
      end

      new_field = field.dup
      field.fields.each do |sub_field|
        new_field.fields << sub_field.dup
      end
      form.fields << new_field
    end

    form.slug ||= original_form.id

    form.version = Form.where(slug: form.slug).length || 1

    if form.save
      form.fields.each(&:save)
      original_form.update(slug: form.slug) if original_form.slug.nil?

      form.submissions.each do |submission|
        submission.submission_fields.each do |submission_field|
          field = form.fields.find_by(field_slug: submission_field.field.field_slug)
          if field
            submission_field.field = field
            submission_field.save
          end
        end
      end

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
