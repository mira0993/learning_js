require('babel-register');

import express from 'express';
import path from 'path';

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const urlrouter = require('./urls/urls');

const db_server = process.env.DB_LOC||'mongodb://127.0.0.1:27017/onsitedb'
const address = process.env.SERVER_LOC||'0.0.0.0';
const port = process.env.PORT||8080;

const app = express()

// Middleware settings
//app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Default handler. This is necessary beause I am using the same index.html
// to render all the front-end with React.
var defaultHandler = function(req, res){
  res.sendFile(path.join(__dirname,'public/index.html'))
};

app.get('/', defaultHandler);
app.get('/onsite*', defaultHandler);
app.get('/form', defaultHandler);

// ------------- API ------------------ //
app.get('/urls', urlrouter.getAllURLs);
app.post('/urls', urlrouter.insertURL);
app.get('/urls/:id', urlrouter.showURL);
// URL redirection
app.get('/:type/:url_alias', urlrouter.redirectURL);

// Connect to database
mongoose.connect(db_server);
var db = mongoose.connection;
// Async wait events
db.on('error', function(error){
  console.error('DB Error - '+ error.toString());
  process.exit(1);
});
db.once('open', function(){
  console.log('Connection to database '+db_server+' was successful' );
  // Start server
  var server = app.listen(port, address, function(){
    console.log('Server is listening now on '+
    server.address().address+':'+server.address().port);
  });
});
