var http = require('http');
var url = require('url');
var fs = require('fs');
// mime 모듈 추가. 서비스하려는 파일의 타입을 알아내기 위해서 필요
var mime = require('mime');
// 몽고DB 모듈 추가
var client = require('mongodb').MongoClient;
// post 데이터에 넘어온 변수,값 객체화 모듈
var querystring = require('querystring');

// 1. 서버생성
var server = http.createServer((request,response)=>{
	var parsedUrl = url.parse(request.url);
	var res = parsedUrl.pathname;

	// root 처리
	if(res == "/"){
		res = "/index.html";
	}

	// 제일앞에 / 를 제거하면 fs.readfile에서 실제 경로상의 파일을 접근할 수 있다
	res = res.substring(1);

	// post 분석
	if(res == "bbs"){
		if(request.method == "POST"){
			// 요청에 넘어온 post 의 body 를 읽어서 postdata 에 담는다.
			var postdata = '';
			request.on('data', function (data) {
				postdata = postdata + data;
			});
			// post data를 다 읽고 나면 end 이벤트가 발생해서 아래 로직이 실행된다.
			request.on('end', function () {
				console.log('line[34];'+postdata);
				var data = querystring.parse(postdata);
				createData(response, data);
			});
			//읽기
		}else if(request.method == "GET"){
				readAll(response);
		}
	}else{

		var resMime = mime.lookup(res); // 파일의 mimeType을 가져온다
		console.log("mime="+resMime);
		// 요청된 파일의 mime type 이 text/html 일 경우만 처리
		if(resMime == "text/html"){
			// 파일을 읽어서 전송한다.
			fs.readFile(res, 'utf-8', (error, data)=>{
				send200(response, data, resMime);
			});
		// 그 이외의 mime type은 모두 여기서 처리
		} else {
			// 파일을 읽어서 전송한다. 이미지 등의 바이너리 파일은 읽을 때 캐릭터셋(utf-8) 을 지정하지 않는다
			fs.readFile(res, (error, data)=>{
				if(error){
					send404(response);
				}else{
					send200(response, data, resMime);
	    		}
			});
		// 요청한 페이지가 없을 경우
		}
	}
});
server.listen(8080,()=>{
	console.log("Server is running...");
});

function send200(response, data, mimeType){
	response.writeHead(200, {'Content-Type':mimeType});
	response.end(data);
}


function send404(response){
	response.writeHead(404, {'Content-Type':'text/html'});
	response.end("<h1>404 page not found!</h1>");
}

function send500(response){
	response.writeHead(500, {'Content-Type':'text/html'});
	response.end('500 Server internal error.');
}

function createData(response, data) {
    client.connect('mongodb://localhost:27017/bbs', function(error, db){
        if(error) {
            send500(response);
        } else {
        // 1. 입력할 document 생성
            var post = {title:data.title, content:data.content, name:data.name};

            // 2. student 컬렉션의 insert( ) 함수에 입력
            db.collection('qna').insert(post);
            db.close();
            response.writeHead(200, {'Content-Type':'text/html'});
            data = '<html><head><meta charset="UTF-8"/></head><body>등록되었습니다</body></html>';
            send200(response, data, 'text/html');
        }
    });
}

function readAll(response){
		client.connect('mongodb://localhost:27017/bbs', function(error, db){
	    if(error) {
	        console.log(error);
	    } else {
	        // 1. find( ) 함수에 아무런 입력값이 없으면 컬렉션의 전체 document 를 읽어온다.
	        db.collection('qna').find().toArray(function(err, docs){
						data = '{ "data" : ' + JSON.stringify(docs)+ '}';
						console.log('line[112];'+data);
						send200(response, data, 'application/json');
					});
					db.close();
	    }
	});
}
