var http = require('http');

var EventEmitter = require('events');
var custom_object = new EventEmitter();
custom_object.on('call', ()=> {
    console.log('called events!');
});


var server = http.createServer((request, response) => {

  //요청한 url이 /call과 같으면 위에 작성된 call 이벤트를 발생시킨다..
  if(request.url == "/call"){
    custom_object.emit('call');
  }

  response.end("");
});


server.listen(10000, ()=>{
  console.log("Server is running...");
});
