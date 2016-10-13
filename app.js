var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.locals.pretty=true;
app.set('view engine','jade');
app.set('views','./views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/form', function(req, res) {
    res.render('form');
});
app.get('/form_receiver', function(req, res) {
    var title = req.query.title;
    var desc = req.query.desc;
    res.send(title+','+desc);
});
app.post('/form_receiver', function(req, res) {
  var title = req.body.title;
  var desc = req.body.desc;
  res.send(title+','+desc);
});
app.get('/topic/:id', function(req,res){
  var topics=[
    'Javascript is....',
    'Node is....',
    'Express si...'
  ];
  var output = `
    <a href="/topic/0">Javascript</a><br/>
    <a href="/topic/1">Node js</a><br/>
    <a href="/topic/2">Express</a><br/>
    ${topics[req.params.id]}
  `;
  res.send(output);
});
app.get('/topic/:mode', function(req,res){
  res.send(req.params.id+','+req.params.mode);
});
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
