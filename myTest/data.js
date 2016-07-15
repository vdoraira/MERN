var express=require('express');
var router=express.Router();

router.get('/',function(rq,rs){
  var obj={name:"Ram",age:39};
  rs.json(obj);

});


module.exports=router;
