(function(fieldHelper){
  var types = [
    { field_type: "text"         , value: ""     },
    { field_type: "textarea"     , value: ""     },

    undefined,

    // { field_type: "date"         , value: ""     },
    { field_type: "email"        , value: ""     },
    { field_type: "number"       , value: ""     },
    { field_type: "phone"        , value: ""     },
    { field_type: "price"        , value: ""     },
    { field_type: "website"      , value: ""     },

    undefined,

    // { field_type: "checkbox"                     },
    { field_type: "dropdown"                     },
    { field_type: "radio"                        },

    // { field_type: "rating"       , value: "", options: {min: 1, max: 5}  },

    // { field_type: "visual text"  , value: ""  },

    // { field_type: "section break"             },
    // { field_type: "page break"                },

    // { field_type: "address"      , fields: [] },

    // { field_type: "likert"       , value: ""  },
    // { field_type: "code editor"  , value: ""  },
    // { field_type: "markup editor", value: ""  }

    // { field_type: "video"        , value: ""  }
  ];

  var makeField = fieldHelper.makeField = function(field) {
    var h = "";

    // if (field.attributes) field = field.attributes;

    return (new Field(field.attributes, field.fields())).outerHtml();
  };

  var hasChildren = fieldHelper.hasChildren = function(field) {
    field.fields();

    return !!(new Field(field.attributes, field.fields())).child();
  };

  var possibilities = fieldHelper.possibilities = function() {
    return types.map(function(e) {
      if (e) {
        e.label = e.field_type[0].toUpperCase() + e.field_type.slice(1);
      }

      return e;
    });
  };

  var Field = fieldHelper.Field = function(model, children) {

    if (typeof model.label != "undefined") this.label = model.label;

    this.field_type = model.field_type;
    this.value = model.value;

    model.options = model.options || {};

    this.required = model.options.required;
    this.sublabel = model.options.sublabel;
    this.title = model.options.title;
    this.placeholder = model.options.placeholder;
    this.classes = model.options.classes;

    var n;

    switch(model.field_type) {
      case 'number'  :
      case 'website' :
      case 'date'    :
      case 'phone'   :
      case 'email'   :
      case 'price'   :
      case 'text'    : n = new Node({type: 'text'});              break;
      case 'textarea': n = new Node({tag: 'textarea', html: ''}); break;

      case 'dropdown': n = new Node({tag: 'select'  , html: ''}); break;
      case 'radio'   : n = new Node({tag: 'fieldset', html: ''}); break;
      case 'checkbox': n = new Node({tag: 'fieldset', html: ''}); break;

      case 'radio-item'   : n = new Node({type: 'radio'             }); break;
      case 'checkbox-item': n = new Node({type: 'checkbox'          }); break;
      case 'dropdown-item': n = new Node({tag:  'option'  , html: ''}); break;

      default:
        alert('tried to make unsupported field!');
        debugger;
        return this;
    }

    this.n = n;

    var field_id = model.id;

    if (model.field_id) field_id = model.field_id;

    n.name = "fields[field_" + field_id + "]";

    // n.sublabel    = this.sublabel;
    if (this.title)       n.title       = this.title;
    if (this.placeholder) n.placeholder = this.placeholder;
    if (this.classes)     n.class       = this.classes;

    switch(model.field_type) {
      case 'text':
        n.value = model.value;
      break;

      case 'textarea':
        n.html = model.value;
      break;

      case 'dropdown':
      case 'radio'   :
      case 'checkbox':
        children.forEach(function(child) {
          if (child.attributes) child = child.attributes;
          n.html += this.child(child).outerHtml();
        }.bind(this));
      break;

      case 'radio-item'   :
      case 'checkbox-item':
        n.value = model.label;
        n.label = model.label;
        if (model.value) n.checked  = "true";
      break;

      case 'dropdown-item':
        n.html = model.label;
        if (model.value) n.selected = "true";
      break;
    }
  };

  Field.prototype.outerHtml = function() {
    this.n.class = (this.n.class || "") + " " + this.field_type;

    var h = this.n.outerHtml();

    if (this.n.label) {
      if (this.field_type == 'radio-item' || this.field_type == 'checkbox-item') {
        h = h + this.n.label;
      } else {
        h = this.n.label + h;
      }

      h = (new Node({tag: 'label', html: h})).outerHtml();
    }

    return h;
  };

  Field.prototype.child = function(child) {
    child = child || {};

    switch (this.field_type) {
      case 'radio'   : child.field_type = 'radio-item'   ; break;
      case 'dropdown': child.field_type = 'dropdown-item'; break;
      case 'checkbox': child.field_type = 'checkbox-item'; break;

      default: return null;
    }

    return (new Field(child, []));
  };

  var Node = fieldHelper.Node = function(options) {
    options = _.defaults(options, {
      tag: 'input',
      html: undefined,
      label: undefined
    });

    for (var key in options) {
      // if (['tag', 'html', 'label'].indexOf(key) < 0) continue;
      this[key] = options[key];
    }
  };

  Node.prototype.outerHtml = function() {
    var h = '<' + this.tag;

    for (var attr in this) {
      if (['tag', 'html', 'label'].indexOf(attr) >= 0 || attr in this.constructor.prototype) continue;
      h += ' ' + attr + '="' + this[attr] + '"';
    }

    if (typeof this.html == 'undefined') {
      h += '/>';
    } else {
      h += '>';
      h += this.html;
      h += '</' + this.tag + '>';
    }

    return h;
  };
})(window.fieldHelper = window.fieldHelper || {});
