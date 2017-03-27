var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function(request,response){
  // 1. post로 전달된 데이터를 담을 변수를 선언
  var postdata = '';
  // 2. request객체에 on( ) 함수로 'data' 이벤트를 연결
  // 안드로이드의 리스너와 완전히 동일한 동작을 합니다.
  // data이벤트 발생시 등록된 callback함수가 동작한다.
  // data가 아예 없으면 이벤트가 발생하지 않는다.(업로드등..)
  // 요청이 post일떄만 동작
  request.on('data', function (data) { //얘네가 미리 정해놓은 data이벤트, end이벤트가 있는데 거기다 request.on으로 리스너를 달아준것
    // 3. data 이벤트가 발생할 때마다 callback을 통해 postdata 변수에 값을 저장
    console.log("찍히냐?");
    postdata = postdata + data;
  });

  // 4. request객체에 on( ) 함수로 'end' 이벤트를 연결
  request.on('end', function () { // end는 끝나면 무조건 호출
    // 5. end 이벤트가 발생하면(end는 한버만 발생한다) 3번에서 저장해둔 postdata 를 querystring 으로 객체화
    var parsedQuery = querystring.parse(postdata);
    // 6. 객체화된 데이터를 로그로 출력
    console.log(parsedQuery);
    // 7. 성공 HEADER 와 데이터를 담아서 클라이언트에 응답처리
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('var1의 값 = ' +  parsedQuery.aaa);
  });

});

server.listen(8080, function(){
    console.log('Server is running...');
});
