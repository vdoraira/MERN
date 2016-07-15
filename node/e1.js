var Http=require('http');
var Router=require('router'),router;
router = new Router();
//function requestHandler (request,response) { }



function requestHandler(request,response) {
  var message,
      status=200;
  count+=1;
  switch (request.url) {
    case '/path':
      message=count.toString();
      break;
    case '/hello':
      message='Hello World';
      break;
    default:
      message="Not Found";
      status=404;
      break;
  }
  //message=("Visitor number : " + count + " path : " + request.url);
  response.writeHead(201,{'content-type': 'text/plain'});
  console.log(request.url,status,message);
  response.end(message);
}
var count=0;
var server=Http.createServer(requestHandler);
server.listen(8080,function() {console.log("Listening on port 8080");});
