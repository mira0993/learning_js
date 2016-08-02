const mongoose = require('mongoose');
const utils = require('../utils/utils');
const model = require('../db/model');
var exports = module.exports;

// GET - /urls
exports.getAllURLs = function(req, res){
  // Return only short URLs
  if(req.query.short && req.query.short==='true'){
    model.Short.find({}, function(err, short_urls){
      if(err)
        return res.status(400).send(err.message);
      return res.json({'data': short_urls, 'server': req.hostname+':'+req.socket.address().port});
    });
  // Return only personalized alias URLs
  }else if(req.query.alias && req.query.alias==='true'){
    model.Alias.find({}, function(err, alias_urls){
      if(err)
        return res.status(400).send(err.message);
      return res.json({'data': alias_urls, 'server': req.hostname+':'+req.socket.address().port});
    });
  // Return all urls
  }else{
    model.Short.find({}, function(err, short_urls){
      if(err)
        res.status(400).send(err.message);
      model.Alias.find({}, function(err, alias_urls){
        if(err)
          res.status(400).send(err.message);
        res.json({'data':{'short': short_urls,'alias': alias_urls},
                  'server': req.hostname+':'+req.socket.address().port});
      });
    });
  }
}

// POST - /urls
exports.insertURL = function(req, res){
  if('alias' in req.body){
    var alias_url = new model.Alias({
      original: req.body.original.trim(),
      alias: req.body.alias.trim()
    });
    alias_url.save(function(err, doc){
      if(err){
        if(err.errors.original)
          return res.status(400).send(err.errors.original.message);
        if(err.errors.alias)
          res.status(400).send(err.errors.alias.message);
        else
          res.status(400).send(err.message);
      }
      res.json({'data':doc,
        'server':req.hostname+':'+req.socket.address().port});
    });
  }else{
    var insertShortURL = function(random_string){
      var short_url = new model.Short({
        original: req.body.original.trim(),
        short: random_string
      });

      short_url.save(function(err, doc){
        if(err){
          if(err.errors.original){
            if(err.errors.original.message === 'UNIQUE_ERROR'){
              model.Short.findOne({'original': req.body.original.trim()},
                function(ierror, url){
                  if(ierror) return res.status(400).send(ierror.message);
                return res.json({'data':url,
                  'server':req.hostname+':'+req.socket.address().port});
              });
            }
          }else if(err.errors.short){
            if(err.errors.short.message == 'UNIQUE_ERROR'){
              return utils.genShortURL(insertShortURL);
            }else
              res.status(400).send(err.errors.short.message);
          }else
            res.status(400).send(err.message);
        }else {
          res.json({'data': doc,
            'server': req.hostname+':'+req.socket.address().port});
        }

      });
    }

    utils.genShortURL(insertShortURL);
  }
}

// GET - /urls/:id
exports.showURL = function(req, res){
  if(req.query.alias){
    model.Alias.findOne({'_id': req.params.id}, function(err, url){
      if(err) res.status(400).send(err.message);
      res.json({'data':url,
        'server':req.hostname+':'+req.socket.address().port});
    });
  }else{
    model.Short.findOne({'_id': req.params.id}, function(err, url){
      if(err) res.status(400).send(err.message);
      res.json({'data':url,
        'server':req.hostname+':'+req.socket.address().port});
    });
  }
}

// Redirect the short/alias URLs to the real ones
exports.redirectURL = function(req, res){
  if(req.params.type === 's'){
    model.Short.findOne({'short': req.params.url_alias}, function(err, url){
      console.log(url);
      if(err) return res.status(404).send('Not Found');
      return res.redirect(url['original']);
    });
  }else if(req.params.type === 'a'){
    model.Alias.findOne({'alias': req.params.url_alias}, function(err, url){
      if(err) return res.status(404).send('Not Found');
      return res.redirect(url['original']);
    });
  }else
    return res.status(404).send('Not found!');
}
