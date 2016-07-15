var m=require('mongoose');
m.connect('mongodb://localhost/test');

// Schema
var mySchema=m.Schema({name : String });
mySchema.methods.speak=function() {
  var greeting=(this.name?"Pup name is " + this.name : "Yet to be named");
  console.log(greeting);
}; // schema methods
//Model
var pup=m.model('pup',mySchema);

// Create Document (with model)
var p1=new pup({name:'tinku'});
//console.log(p1.name);
/*

*/

var p2=new pup({name:'jimmy'});
p2.speak();

var db=m.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open',function () {
  console.log("Mongo DB connected");

p1.save(function(err,p1) {
  if (err) return console.error(err);
  p1.speak();
}); //p1 save

p2.save(function(err,p2) {
  if (err) return console.error(err);
  p2.speak();
}); //p2 save

//pup.find({name:/^j/},function (err,pups) {
  pup.find({},function (err,pups) {
  if (err) console.error(err);
  console.log( pups);
  } //function
); //find
}); // db once
