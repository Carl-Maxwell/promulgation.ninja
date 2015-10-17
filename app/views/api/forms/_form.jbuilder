json.extract! form, :id, :title, :slug, :submission_count

json.time_ago time_ago_in_words(form.created_at) + " ago"
json.exact_time form.created_at.strftime("%B #{form.created_at.day.ordinalize}, %Y, at %l:%M %P")

json.fields(form.fields) do |field|
  json.partial! "api/fields/field", field: field
end

if @show_submissions
  json.submissions(form.submissions) do |submission|
    json.partial! "api/submissions/submission", submission: submission
  end
end
