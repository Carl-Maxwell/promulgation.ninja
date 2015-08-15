(function(fieldHelper){
  var types = [
    { type: "text"         , value: ""  },
    { type: "textarea"     , value: ""  },

    { type: "dropdown"     , fields: [] },
    { type: "radio"        , fields: [] },
    { type: "checkbox"     , fields: [] },

    { type: "website"      , value: ""  },
    { type: "date"         , value: ""  },
    { type: "rating"       , value: ""  },
    { type: "phone"        , value: ""  },
    { type: "email"        , value: ""  },

    { type: "visual text"  , value: ""  },

    { type: "section break"             },
    { type: "page break"                },

    { type: "address"      , fields: [] },

    { type: "likert"       , value: ""  },
    { type: "code editor"  , value: ""  },
    { type: "markup editor", value: ""  }
  ];

  var makeField = fieldHelper.makeField = function(field) {
    var h = "";

    // if (field.attributes) field = field.attributes;

    return (new Field(field.attributes, field.fields())).outerHtml();
  };

  var possibilities = fieldHelper.possibilities = function() {
    return types;
  };

  var Field = fieldHelper.Field = function(model, children) {
    this.name  = model.name;
    this.type  = model.type;
    this.value = model.value;

    var n;

    switch(model.type) {
      case 'text'    : n = new Node({type: 'text'});              break;
      case 'textarea': n = new Node({tag: 'textarea', html: ''}); break;

      case 'dropdown': n = new Node({tag: 'select'  , html: ''}); break;
      case 'radio'   : n = new Node({tag: 'fieldset', html: ''}); break;
      case 'checkbox': n = new Node({tag: 'fieldset', html: ''}); break;

      default: alert('tried to make unsupported field!'); debugger;
    }

    this.n = n;

    n.name = model.key;

    switch(model.type) {
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
          child = this.child(child);
          n.html += child.outerHtml();
        }.bind(this));
      break;
    }
  };

  Field.prototype.outerHtml = function() {
    return this.n.outerHtml();
  };

  Field.prototype.child = function(child) {
    child = child || {};

    switch (this.type) {
      case 'radio'   : child = {type: 'radio-item'   }; break;
      case 'dropdown': child = {tag : 'dropdown-item'}; break;
      case 'checkbox': child = {type: 'checkbox-item'}; break;
    }

    return makeField(child);
  };

  var Node = fieldHelper.Node = function(options) {
    options = _.merge(options, {
      tag: 'input',
      html: undefined
    });

    for (var key in options) {
      if (['tag', 'html'].indexOf(key) < 0) continue;
      this[key] = options[key];
    }
  };

  Node.prototype.outerHtml = function() {
    var h = '<' + this.tag;

    for (var attr in this) {
      if (['tag', 'html'].indexOf(attr) < 0) continue;
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
