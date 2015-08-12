json.extract! form, :id, :title

if true
  json.fields(form.fields) do |field|
    # json.extract! field, :id, :title, :form_id, :ord
    json.partial! "api/fields/field", field: field
  end
end
