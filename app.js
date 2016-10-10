var express = require('express');
var app = express();
app.locals.pretty=true;
app.set('view engine','jade');
app.set('views','./views');
app.use(express.static('public'));
app.get('/template', function(req, res) {
    res.render('temp',{time:Date(),title:'Jade'});
});
app.get('/', function(req, res) {
    res.send('Hello World');
});
app.get('/dynamic',function(req,res){
    var lis = '';
    for(var i=0; i<5; i++){
      lis = lis +'<li>coding</li>d';
    }
    var time = new Date();
    var output = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
          Hello Dynamic!
          <ul>
          ${lis}
          </ul>
          ${time}
      </body>
    </html>`;
    res.send(output);
});
app.get('/route',function(req,res){
    res.send('Hello 보노보노, <img src="/K-001.jpg"></img>');
});
app.get('/junwoo', function(req, res) {
    res.send('Hello Junwoo22---');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})
