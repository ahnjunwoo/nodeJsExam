var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql      = require('mysql');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'cutesboy',
  password : 'dkswnsdn13!',
  database : 'test'
});

conn.connect();
var app = express();
app.locals.pretty=true;
app.set('view engine','jade');
app.set('views','./views_mysql');
app.use(express.static('public_file'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/topic/add', function(req, res) {
  var sql = 'SELECT id,title FROM topic';
  conn.query(sql,function(err,topics,fields){
    res.render('add',{topics:files});
  });
});

app.get(['/topic','/topic/:id'],function(req,res){
  var sql = 'SELECT id,title FROM topic';
  conn.query(sql,function(err,topics,fields){
    var id = req.params.id;
    if(id){
      var sql  = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql,[id],function(err,topic,fields){
        if(err){
          console.log(err);
        }else{
          res.render('view',{topics:topics,topic:topic[0]});
        }
      });
    }else{
      res.render('view',{topics:topics});
    }
  });
});

app.post('/topic',function(req,res){
  var title = req.body.title; //파일이름으로 설정
  var desc = req.body.desc; //파일내용으로 설정
  fs.writeFile('data/'+title,desc,function(err){
    if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });

});
app.listen(3000,function(){
  console.log("Connect, 3000 port!!!!!!!!!!!");
});
