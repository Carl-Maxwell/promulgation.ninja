json.extract! form, :id, :title

json.fields(form.fields) do |field|
  json.partial! "api/fields/field", field: field
end
