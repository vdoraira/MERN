var m=require('mongoose'),
    mdb='mongodb://localhost/test';

    m.connect(mdb);
var dbSchema=m.Schema({
                  Title: String,
                  Year:String,
                  Director:String,
                  Actors:String,
                  Language:String,
                  imdbID:String
                });
var movieM=m.model('movie',dbSchema);

var movie1=new movieM({
            Title: "roja",
            Year:"1992",
            Director:"Mani Ratnam",
            Actors:"Arvind Swamy, Madhoo, Pankaj Kapur, Nasser",
            Language:"Hindi, Telugu, Tamil,Marathi",
            imdbID:"tt0105271"
});

var db=m.connection;
db.once('open',function() {
console.log("DB connected");
//movie1.save();
movieM.find({},function(err,a) {console.log(a)});

}); //db once
