var exports = module.exports;
const randomstring = require('randomstring');
const string_size = process.env.SHORT_SIZE||8

exports.genShortURL = function(callback){
  var short_alias =  randomstring.generate({
    length: string_size,
    capitalization: 'lowercase'
  });
  return callback(short_alias);
}
