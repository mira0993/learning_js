var exports = module.exports;
const randomstring = require('randomstring');
const string_size = process.env.SHORT_SIZE||8

// Generate a random os size string_size. THis will be the short alias of
// any URL provided.
exports.genShortURL = function(callback){
  var short_alias =  randomstring.generate({
    length: string_size,
    capitalization: 'lowercase'
  });
  return callback(short_alias);
}
