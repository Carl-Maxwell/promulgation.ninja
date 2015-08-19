json.extract! field, :id, :value, :ord, :label, :field_type, :options, :form_id, :field_id

json.fields(field.fields) do |subfield|
  json.partial! "api/fields/field", field: subfield
end
