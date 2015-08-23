json.extract! form, :id, :title, :slug

json.fields(form.fields) do |field|
  json.partial! "api/fields/field", field: field
end

if @show_submissions
  json.submissions(form.submissions) do |submission|
    json.partial! "api/submissions/submission", submission: submission
  end
end
