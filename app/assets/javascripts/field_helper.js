(function(fieldHelper){
  var types = [
    { type: "text"         , value: ""  },
    { type: "textarea"     , value: ""  },

    { type: "dropdown"     , value: ""  },
    { type: "radio"        , value: ""  },
    { type: "checkbox"     , value: ""  },

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

    if (field.attributes) field = field.attributes;

    return (new Field(field)).$el;
  };

  var possibilities = fieldHelper.possibilities = function() {
    return types;
  };

  var Field = fieldHelper.Field = function(options) {
    this.name = options.key;
    this.type = options.value.type;
    this.value = options.value.value;

    var h = "";

    switch(options.value.type) {
      case "text"    : h = "<input type=\"text\">"; break;
      case "textarea": h = "<textarea></textarea>"; break;

      case "dropdown": h = "<select></select>";     break;
      case "radio"   : h = "<div></div>";           break;
      case "checkbox": h = "<select></select>";     break;
    }

    var $el = this.$el = $(h);
    $el.attr('name', options.key);

    switch(options.value.type) {
      case "text":
      case "textarea":
      case "dropdown":
        $el.val(options.value.value);
        break;
      case "dropdown":
      case "radio"   :
      case "checkbox":
        options.value.fields.forEach(function(field) {
          $el.append(this.child());
        }.bind(this));
      break;
    }
  };

  Field.prototype.outerHtml = function() {
    return $('<div>').append(this.$el).html();
  };

  Field.prototype.child = function() {
    switch (this.type) {
      case 'radio'   : return '<input type="radio" name="" value="" />';
      case 'dropdown': return '<option value="">Display Value</option>';
      case 'checkbox': return '<input type="checkbox" name="" value="" />';
    }
  };
})(window.fieldHelper = window.fieldHelper || {});
