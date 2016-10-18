var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.locals.pretty=true;
app.set('view engine','jade');
app.set('views','./views_file');
app.use(express.static('public_file'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/topic/new', function(req, res) {
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error')
    }
    res.render('new',{topics:files});
  });
});
app.get(['/topic','/topic/:id'],function(req,res){
  var id = req.params.id;
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error')
    }
    if(id){
      //id값이 있는 경우만
      fs.readFile('data/'+id,'utf-8',function(err,data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error')
        }
        res.render('view',{topics:files, title:id, desc:data})
      });
    }else{
      //id값이 없을 때
      res.render('view',{topics:files, title:'Welcome',desc:'Hello Javascript for Server'});
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
