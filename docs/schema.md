# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null
password_digest | string    | not null

## sessions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
session_token   | string    | not null
user_id         | integer   | not null, foreign key (references users)
user_agent      | string    |

## forms
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null
version     | integer   |

* there will be multiple copies of each form in the database, the `null`
versioned one will be the 'draft' version that is used by the autosave feature.
When the user publishes a new version of the form the form and all the fields
associated with it will be copied and a non-null versioned copy will be made

## fields
column name | data type | details                                   | uses
------------|-----------|-------------------------------------------|-----
id          | integer   | not null, primary key                     |
form_id     | integer   | not null, foreign key (references forms)  |
label       | string    |                                           |
type        | string    |                                           |
field_id    | integer   | foreign key (references fields)           | id of parent field
draft_id    | integer   | foreign key (references fields)           | id of draft version of this field
ord         | integer   |                                           |
value       | string    |                                           |
options     | text      | (is json serialized into a string)        |

these are some of the values that `options` might hold:

key name   | uses
-----------|----------
classes    | css classes
min        | minimum value (for numeric fields)
max        | maximum value (for numeric fields)
required   | is this value required? (validation)
duplicates | should we enforce uniqueness? (validation)
title      | title for the html (accessibility &c)

## submission
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
form_id     | integer   | not null, foreign key (references form)
useragent   | string    |
ip          | string    |

## submission_fields
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
field_id    | integer   | not null, foreign key (references fields)
value       | string    |
state       | string    | default "alive"

* the value here is a string, the key is the presentable
name of the field ("First Name", "Subject", etc)
* the state is either "alive" or "dead", used to 'delete' submission fields in a
recoverable manner

### Likerts
A single likert field on a form will have multiple submission fields mapping to
it.
