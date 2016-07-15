express=require('express');
//var bodyParser = require('body-parser');
app=express();
var data=require('./data');



app.use('/data',data);

 app.get('/',function(rq,rs){
 rs.send("Hello!");
 });

 app.get('/:id',function(rq,rs){
   var i=rq.params['id'];
   rs.send(i);
 });

app.listen(8080);
//module.exports=app;
