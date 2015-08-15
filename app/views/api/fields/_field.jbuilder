json.extract! field, :id, :name, :value, :ord, :label, :fieldType, :options, :form_id, :field_id

json.fields(field.fields) do |subfield|
  json.partial! "field", field: subfield
end
