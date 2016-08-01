const mongoose = require('mongoose');
const utils = require('../utils/utils');
const model = require('../db/model');
var exports = module.exports;

exports.getAllURLs = function(req, res){
  // Return only short URLs
  if(req.query.short && req.query.short==='true'){
    model.Short.find({}, function(err, short_urls){
      if(err)
        return res.status(400).send(err.message);
      return res.json(short_urls);
    });
  }else if(req.query.alias && req.query.alias==='true'){
    model.Alias.find({}, function(err, alias_urls){
      if(err)
        return res.status(400).send(err.message);
      return res.json(alias_urls);
    });
  }else{
    model.Short.find({}, function(err, short_urls){
      if(err)
        res.status(400).send(err.message);
      model.Alias.find({}, function(err, alias_urls){
        if(err)
          res.status(400).send(err.message);
        res.json({'short': short_urls,
                  'alias': alias_urls});
      });
    });
  }
}

exports.insertURL = function(req, res){
  if('alias' in req.body){
    var alias_url = new model.Alias({
      original: req.body.original,
      alias: req.body.alias
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
      res.json(doc);
    });
  }else{
    var insertShortURL = function(random_string){
      var short_url = new model.Short({
        original: req.body.original,
        short: random_string
      });

      short_url.save(function(err, doc){
        if(err){
          if(err.errors.original)
            res.status(400).send(err.errors.original.message);
          else if(err.errors.short)
            if(err.errors.short.message == 'UNIQUE_ERROR'){
              console.log('repeating');
              return utils.genShortURL(insertShortURL);
            }else
              res.status(400).send(err.errors.short.message);
          else
            res.status(400).send(err.message);
        }
        res.json(doc);
      });
    }

    utils.genShortURL(insertShortURL);
  }
}

exports.showURL = function(req, res){
  if(req.query.alias){
    model.Alias.findOne({'_id': req.params.id}, function(err, url){
      if(err) res.status(400).send(err.message);
      res.json(url);
    });
  }else{
    model.Short.findOne({'_id': req.params.id}, function(err, url){
      if(err) res.status(400).send(err.message);
      res.json(url);
    });
  }
}

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
