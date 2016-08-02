var mongoose = require('mongoose');

const pattern_valid_url = new RegExp('([a-z]://.+)');
const pattern_valid_alias = new RegExp('[a-zA-Z0-9_.-]+');

// Schemas
var shortURLSchema = new mongoose.Schema({
  original: String,
  short: String
});

var aliasURLSchema = new mongoose.Schema({
  original: String,
  alias: String,
});


var Short = mongoose.model('shorturl', shortURLSchema);
var Alias = mongoose.model('aliasurl', aliasURLSchema);


// Validate it is an actual URL
Short.schema.path('original').validate(function (value, respond){
  respond(pattern_valid_url.test(value))},
  'INVALID_URL');

// Validate that the random generated is not repeated already
Short.schema.path('short').validate(function (value, respond){
    Short.findOne({'short': value}, function(err, url){
      if(url) respond(false);
      respond(true);
    });
  }, 'UNIQUE_ERROR');

// Validate that the 'URL is not already in the collection'
Short.schema.path('original').validate(function (value, respond){
      Short.findOne({'original': value}, function(err, url){
        if(url) respond(false);
        respond(true);
      });
    }, 'UNIQUE_ERROR');

// Validate the original url is an actual URL
Alias.schema.path('original').validate(function (value, respond){
    respond(pattern_valid_url.test(value))},
    'INVALID_URL');

// Validate that the alias is valid (view regex at the top)
Alias.schema.path('alias').validate(function (value, respond){
    respond(pattern_valid_alias.test(value))}, 'INVALID_ALIAS');

// Validate that alias is unique.
Alias.schema.path('alias').validate(function (value, respond){
    Alias.findOne({'alias': value}, function(err, url){
      if(url) respond(false);
      respond(true);
    });
  }, 'UNIQUE_ERROR');



module.exports.Short = Short;
module.exports.Alias = Alias;
