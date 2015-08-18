# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create({
  email: "guest@promulgation.ninja",
  name: "Guest",
  password: BCrypt::Password.create('password')
});

contact_us = user.forms.create({title: 'Contact Us'});

contact_us.fields.create({ord: 0, field_type: 'text'    , name: 'Name'});
contact_us.fields.create({ord: 1, field_type: 'text'    , name: 'Email'});
contact_us.fields.create({ord: 2, field_type: 'text'    , name: 'Subject'});
contact_us.fields.create({ord: 4, field_type: 'textarea', name: 'Body'});

dropdown =
contact_us.fields.create({ord: 3, field_type: 'dropdown', name: 'Topic'});

dropdown.fields.create({ord: 0, field_type: 'dropdown-item', name: 'User Interface'});
dropdown.fields.create({ord: 1, field_type: 'dropdown-item', name: 'Report a Bug'});
dropdown.fields.create({ord: 2, field_type: 'dropdown-item', name: 'Marketing'});
dropdown.fields.create({ord: 3, field_type: 'dropdown-item', name: 'General Concerns'});
dropdown.fields.create({ord: 4, field_type: 'dropdown-item', name: 'Mars Mission'});
