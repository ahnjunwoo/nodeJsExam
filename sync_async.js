var fs = require('fs');
//sync
console.log(1);
var data = fs.readFileSync('D:/nodejs/data.txt',{encoding:'utf8'});
console.log(data);

//async
console.log(2);
var data = fs.readFile('D:/nodejs/data.txt',{encoding:'utf8'},function(err,data){
  console.log(data);
});
console.log(3);
