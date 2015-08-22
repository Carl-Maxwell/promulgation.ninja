json.extract! form, :id, :title, :slug

json.fields(form.fields) do |field|
  json.partial! "api/fields/field", field: field
end
