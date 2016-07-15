var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

var m=require('mongoose');
m.connect('mongodb://localhost/test');
var dbSchema=m.Schema({
                  Title: String,
                  Year:String,
                  Director:String,
                  Actors:String,
                  Language:String,
                  imdbID:String
                });
var movieM=m.model('movie',dbSchema);


router.get('/',function (rq,rs) {
  //rs.send("Received GET request on / ");
  movieM.find({},function(err,a) {
    if (err) {console.log(err);}
    else {
      //console.log("no error" + a);
      //rs.send(a);
      rs.json(a);

    }

  });
});


router.post('/',function (rq,rs) {
  var ip=rq.body;
  rs.send("Received POST request on / " );
  var m1=new movieM(ip);
  m1.save();
  console.log(movieM.find());
});


router.put('/:old-:new',function (rq,rs) {
  var id1=rq.params['old'];
  var id2=rq.params['new'];
  console.log(id1,id2);

  movieM.findOneAndUpdate({Title : id1}, {Title: id2} ,function(err,a) {
    rs.send("Received Update request " + a);
  });


});

router.delete('/:Title',function (rq,rs) {
  var title=rq.params['Title'];

  console.log(title);
  movieM.findOneAndRemove({Title: title},function(err,a){

    console.log("deleting " + a);
  });
rs.send("Received Delete request for Title= " + title);
});

module.exports = router;
