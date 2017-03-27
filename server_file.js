var http = require('http');
var url = require('url');
// 1. fs(파일시스템) 모듈 사용
var fs = require('fs');

//1. 서버생성
var server = http.createServer((request, response) => {
  var parsedUrl = url.parse(request.url);
  var res = parsedUrl.pathname; //이제 요청한 주소이름을 가져올 수 있다.

  if(res == "/index.html"){
    // 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
    // 스트림 / 버퍼 전부다 처리 되어있음
    fs.readFile('index.html', 'utf-8', function(error, data) {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end(data);
    });
    //요청한 페이지 없을경우
  }else if (res == "/temp.jpg") {
    fs.readFile('temp.jpg', function(error, data) {
      response.writeHead(200, {'Content-Type' : 'image/jpeg'});
      response.end(data);
    });
  }else{
    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.end("<h1>Page not found</h1>");
  }

});

server.listen(10000, () => {
  console.log("Server is running...");
});
