var http = require('http');
var url = require('url');
// 1. fs(파일시스템) 모듈 사용
var fs = require('fs');
// 1. mime 모듈 추가. 서비스하려는 파일의 타입을 알아내기 위해서 필요
var mime = require('mime');


//1. 서버생성
var server = http.createServer((request, response) => {
  var parsedUrl = url.parse(request.url);
  var res = parsedUrl.pathname; //이제 요청한 주소이름을 가져올 수 있다.
  //제일 앞에 / 를 제거하면 fs.readFile에서 실제 경로상의 파일을 접근할 수 있다.

if(res == "/"){
  res = "/index.html";
}


  res = res.substring(1);

  var resMime = mime.lookup(res); //파일의 mimeType을 가져온다

  console.log("mime=" + resMime);

  //요청된 파일의 mimetype이 text/html일 경우만 처리
  if(resMime == "text/html"){
    // 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
    // 스트림 / 버퍼 전부다 처리 되어있음
    fs.readFile(res, 'utf-8', function(error, data) {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end(data);
    });
    // 그 이외의 mimetype은 여기서 처리
  }else{
    fs.readFile(res, (error, data) => {
      if(error){
        response.writeHead(404, {'Content-Type' : 'text/html'});
        response.end("<h1>404Error!</h1>"+error);
      }else{
        response.writeHead(200, {'Content-Type' : resMime});
        response.end(data);
      }
    });
  }

});

server.listen(10000, () => {
  console.log("Server is running...");
});
