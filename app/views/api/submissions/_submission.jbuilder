json.extract! submission, :id, :slug, :useragent, :ip, :created_at, :form_id

json.submission_fields(submission.submission_fields) do |field|
  json.partial! "api/submission_fields/submission_field", submission_field: field
end
