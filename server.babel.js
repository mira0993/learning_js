require('babel-register');
import express from 'express';
import path from 'path';

const port = process.env.PORT||8080;
const app = express()

app.use(express.static(path.join(__dirname, 'public')));

app.get('/urls', function(req, res){
    res.sendFile(__dirname + '/public/index.html', function() {
      res.end();
    });
    //res.render();
    //res.end();
});

/*

class layout = <div>{this.props.children}</div>
class body = <h3>Hello world!</h3>

router path="/" component={layout}
  router path="about"

*/

var server = app.listen(port, function(){
  console.log('Server listening on '+server.address().address+':'+
  server.address().port);
});
