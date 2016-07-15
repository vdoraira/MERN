var express = require("express");

var app = express();
var routes = require("./routes/index");
var adroutes = require("./routes/admin");

app.use("/", routes);
app.use("/admin", adroutes);

app.listen(8080, function(err){
  console.log("Listening at port 8080");
})
