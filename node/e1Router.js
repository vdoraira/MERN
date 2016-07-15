var Http=require('http');
var Router=require('router'),router,server;
router = new Router();
server = Http.createServer(function (request,response) {
  router(request,response,function(error) {
    if (!error) {
      response.writeHead("404");

    } else {
      console.log(error.message,error.stack);
      response.writeHead("400");
    }
    response.end("\n");
    });

});

var counter=0,
messages={};

var BodyParser=require('body-parser');
router.use(BodyParser.text());
//router.use(function (request,response,next) {console.log("middleware executed");next(null);} );

function createMessage (request,response) {
  var id=counter+=1,
      message=request.body;
  console.log("create message",id,message);
  messages[id]=message;
  response.writeHead(201,{'Content-Type':'text/plain', 'Location'  : '/message/' + id});
  response.end(message);
}
router.post('/message',createMessage);

function readMessage (request,response) {
var id=request.params.id;
    message=messages[id];
    if (typeof message !== 'string') {
      console.log("Message not found");
      response.writeHead(404);
      response.end("\n");
      return;
    }
    console.log("Read message",id,message);
    response.writeHead(201,{'Content-Type':'text/plain'});
    response.end(message);
}
router.get('/message/:id',readMessage);

function deleteMessage (request,response) {
var id=request.params.id;
    message=messages[id];
    if (typeof message !== 'string') {
      console.log("Message not found");
      response.writeHead(404);
      response.end("\n");
      return;
    }
    messages[id]=undefined;
    console.log("Delete message",id);
    response.writeHead(204,{});
    response.end('');
}
router.delete('/message/:id',deleteMessage);

function readMessages (request,response) {
  var message,messageString,messageList=[];
      for (id in messages) {
        if (!messages.hasOwnProperty(id)) { continue; }
        message=messages[id];
        if (typeof message !== 'string') { continue; }
        messageList.push(message);
      }
      console.log("Read Messages",JSON.stringify(messageList,null,' '));
      messageString=messageList.join('\n');
      response.writeHead(201,{'Content-Type':'text/plain'});
      response.end(messageString);
}
router.get('/message',readMessages);
server.listen(8080,function() {console.log("Listening on port 8080");});
