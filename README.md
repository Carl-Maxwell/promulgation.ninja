# Promulgation.ninja

[Heroku link][heroku]

[heroku]: http://.herokuapp.com

## Minimum Viable Product
Promulgation.ninja is a clone of Wufoo built on Rails and Backbone. It allows
users to create forms which can either be embedded in a user's site or hosting
can be provided by Promulgation.ninia. Two example use cases are embedded
Contact Us forms on websites, and email questionnaires.

- [ ] creating, viewing, editing, and deleting accounts
- [ ] creating, and deleting sessions (log in, log out)
  - [ ] multiple logins
- [ ] change password
  - [ ] delete sessions on password change
- [ ] forgot password feature
- [ ] creating, viewing, editing, and deleting forms
  - [ ] forms should have a name
- [ ] creating, viewing, editing, and deleting fields within forms
  - [ ] fields belong to a form
  - [ ] fields have a type (text, textarea, dropdown, radio, checkbox, date, etc)
- [ ] resorting fields within forms
  - [ ] drag & drop
- [ ] auto-saving forms as they're being edited
- [ ] confirm deletion of field (by typing in password)
- [ ] rendering the form
- [ ] outputting embed code for the form
- [ ] users filling out and submitting form
  - [ ] storing user form submissions
  - [ ] reviewing user form submissions
  - [ ] searching through user form submissions
  - [ ] submissions must be paginated
- [ ] notificiations
  - [ ] email
  - [ ] text message
- [ ] commenting on submissions


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. I will also setup the Heroku app & final domain name.

### Phase 2: Database (~0.25 day)
I will implement the schema outlined in the schema.md file and setup the
initial models.

### Phase 3: CSS & static pages (~1 day)
I will write CSS & html for all the page views.

### Phase 4: Form Definition (~2 days)
By the end of this phase, users will be able to create forms using simple
inputs (text, textarea). This may include a drag and drop interface (provided by
jQuery UI).

### Phase 5: Complex Inputs (~1 day)
I will implement these features:
- users filling out and submitting form
  - storing user form submissions
  - reviewing user form submissions
  - searching through user form submissions
  - submissions must be paginated

### Phase 6: Submissions (~1 day)
I will implement the feature that will allow users to submit entries for forms
have been made.

### Bonus Features (TBD)
- [ ] Additional [security measures](http://guides.rubyonrails.org/security.html)
- [ ] Saving data after its field has been changed
- [ ] Allow viewing a list of your sessions
- [ ] Further complex inputs (likert, code editor, markup (commonmark) editor, etc)
