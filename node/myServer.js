var Http=require('http'),
    fs=require('fs'),
    url=require('url'),
    path=require('path');
var server=Http.createServer(function (req,res) {
  var pathName=url.parse(req.url).pathname;
  var fileName=path.basename(pathName);
  console.log("Request for " + fileName + " received");

  fs.readFile(fileName,function(err,data){
    if (err) {
        res.writeHead(404,{'content-type':'text/plain'});
        res.write(fileName + " is not found in server");
    }
    else {
        res.writeHead(200,{'content-type':'text/html'});
        res.write(data.toString());
    }
    res.end();
  }//function to process data
); // readFile
  //res.end(fileName);
}); // http createServer

server.listen(8080);
console.log("Server started and listening on port:8080 ");
