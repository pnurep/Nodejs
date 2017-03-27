//1. 서버생성을 위해 http모듈을 사용한다
var http = require('http'); //java에서 import http와 같다

//2. http 모듈안에 Api로 서버를 생성한다
var server = http.createServer(

	function(request, response){ //콜백함수는 함수이름없이 함수 몸통을 작성한다.
								 // 사용자로부터 요청이 있으면 호출

		response.writeHead(200, {'Content-Type':'text/html'});
		response.end('Hello node.js!<br/> I am Heo kum'); //끝났다는것을 알림.

	}

);

//3.생성된 서버를 열어준다
// 8080으로 소켓이열리면서 리슨이 돈다
server.listen(8080, function(){ // 이 콜백함수는 서버가 열리고 나면 호출된다..
	console.log('Server is Running...');
});
