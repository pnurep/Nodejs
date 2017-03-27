var http = require('http');

// 1. 요청한 url을 객체로 만들기 위해 url 모듈사용
// 주소같은것을 쉽게 꺼내기 위해 url객체를 사용
var url = require('url');
// 2. 요청한 url 중에 Query String 을 객체로 만들기 위해 querystring 모듈 사용
var querystring = require('querystring');


var EventEmitter = require('events');
// 2. 생성된 이벤트 모듈을 사용하기 위해 custom_object로 초기화
var custom_object = new EventEmitter();
//리스너이벤트 등록
custom_object.on('call', ()=> {
    console.log('called events!');
});




var server = http.createServer(function(request,response){
    // 3. 콘솔화면에 로그 시작 부분을 출력
    console.log('--- log start ---');
		// // 4. 브라우저에서 요청한 주소를 parsing 하여 객체화 후 출력
		var parsedUrl = url.parse(request.url);
		console.log(request.url);
		// // 5. 객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
		var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
		// http://localhost:8080/aaa/bbb/ccc?abc=dsafdasfa&bcd=1234545
		console.log(parsedQuery);
		console.log("adc=" + parsedQuery.abc);
		console.log("bcd=" + parsedQuery.bcd);

		if(parsedQuery.abc == "call"){
			custom_object.emit("call");
		}

      // 6. 콘솔화면에 로그 종료 부분을 출력
    console.log('--- log end ---');
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('Hello node.js!!');
});

server.listen(8080, function(){
    console.log('Server is running...');
});
