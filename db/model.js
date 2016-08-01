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

Short.schema.path('original').validate(function (value, respond){
  respond(pattern_valid_url.test(value))},
  'INVALID_URL');

Short.schema.path('short').validate(function (value, respond){
    Short.findOne({'short': value}, function(err, url){
      if(url) respond(false);
      respond(true);
    });
  }, 'UNIQUE_ERROR');

Short.schema.path('original').validate(function (value, respond){
      Short.findOne({'original': value}, function(err, url){
        if(url) respond(false);
        respond(true);
      });
    }, 'UNIQUE_ERROR');

Alias.schema.path('original').validate(function (value, respond){
    respond(pattern_valid_url.test(value))},
    'INVALID_URL');

Alias.schema.path('alias').validate(function (value, respond){
    respond(pattern_valid_alias.test(value))}, 'INVALID_ALIAS');

Alias.schema.path('alias').validate(function (value, respond){
    Alias.findOne({'alias': value}, function(err, url){
      if(url) respond(false);
      respond(true);
    });
  }, 'UNIQUE_ERROR');



module.exports.Short = Short;
module.exports.Alias = Alias;
