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

## fields
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
form_id     | integer   | not null, foreign key (references forms)
key         | string    | not null
value       | text      |

* to clarify, the value here is serialized JSON (for complex fields like dropdowns and radios that need stuff), the key is the presentable
name of the field ("First Name", "Subject", etc)

## submissions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
field_id    | integer   | not null, foreign key (references field)
key         | string    | not null
value       | string    |
state       | string    |

* the value here is a string, the key is the presentable
name of the field ("First Name", "Subject", etc)
* the state is either "live" or "dead", used to 'delete' fields in a recoverable
manner
