var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.send('Hello World');
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
