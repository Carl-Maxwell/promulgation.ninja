Field.create!([
  {form_id: 1, label: "Phone", value: "", ord: 2, field_type: "phone", options: {}, field_id: nil},
  {form_id: 1, label: "Website", value: "", ord: 3, field_type: "website", options: {}, field_id: nil},
  {form_id: 1, label: "Would you like a response?", value: nil, ord: 6, field_type: "radio", options: {"classes"=>"", "title"=>"", "sublabel"=>"", "placeholder"=>""}, field_id: nil},
  {form_id: nil, label: "No", value: "", ord: 1, field_type: "radio-item", options: {}, field_id: 8},
  {form_id: nil, label: "Yes", value: "true", ord: 0, field_type: "radio-item", options: {}, field_id: 8},
  {form_id: 1, label: "Name", value: "", ord: 0, field_type: "text", options: {"classes"=>"", "required"=>"on", "title"=>"", "sublabel"=>"", "placeholder"=>""}, field_id: nil},
  {form_id: 1, label: "Email", value: "", ord: 1, field_type: "email", options: {"classes"=>"", "required"=>"on", "duplicates"=>"on", "title"=>"", "sublabel"=>"", "placeholder"=>""}, field_id: nil},
  {form_id: 1, label: "Body", value: "", ord: 5, field_type: "textarea", options: {"classes"=>"", "required"=>"on", "title"=>"", "sublabel"=>"", "placeholder"=>""}, field_id: nil},
  {form_id: 1, label: "Subject", value: "", ord: 4, field_type: "text", options: {"classes"=>"", "required"=>"on", "title"=>"", "sublabel"=>"", "placeholder"=>""}, field_id: nil}
])
Form.create!([
  {user_id: 1, title: "Contact Us", version: nil, slug: nil}
])
Session.create!([
  {session_token: "q0X9haO9FwyHfvEixKZug5IaEN89YmGUEqFduiq4PP-HO7kaogOG1b-13TQC0Iy98CDRUD8M-4ybnizQl1w3U-qHcAMD6UW9-HncRWRz9dUWZlgW6eQxdYMwfLaqm2I0HLNwNRO3tATePW-VdkXbQmULyMJDmkZ48hVPuOMRPiw", user_id: 1, useragent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"}
])
User.create!([
  {email: "guest@promulgation.ninja", password_digest: "$2a$10$QYw64SYlXJiBhov8z2Xi8.nZqJ4nkAR.E0D0yVNgj9dmrOC63wBym", name: "Guest"}
])
