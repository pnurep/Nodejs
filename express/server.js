var http = require('http');
var express = require('express');
var client = require('mongodb').MongoClient;
var bodyParser = require('body-parser');


var app = express();

//일반적인 쿼리스트링 형태를 처리하는 파서 모듈사용
app.use(bodyParser.urlencoded({extended: false}))
//제이슨을 처리하는 파서모듈사용
app.use(bodyParser.json())


app.get("/bbs", (request, response)=>{
  readAll(response, NaN, NaN);
});


app.get("/bbs/:skip/:offset",(request, response)=>{
  var skip = parseInt(request.params.skip);
  var offset = parseInt(request.params.offset);
  console.log("skip = " + skip + "offset" + offset);
  readAll(response, skip, offset);
});

app.post("/bbs", (request,response)=> {
  //디비에 입력
  var postdata = request.body;
  createData(response, postdata);
});

http.createServer(app).listen(8080, ()=>{
  console.log("Server is running...");
});


function readAll(response, skip, offset){
	var data = '';

	client.connect('mongodb://localhost:27017/bbs', function(error, db){
	    if(error) {
	        send500(response, error);
	    } else {
	        db.collection('qna').find().skip(skip).limit(offset).toArray(function(err,docs){
	        	data = '{"data":'+JSON.stringify(docs)+'}';
	        	send200(response, data, 'application/json');
	        });
	        db.close();
	    }
	});
}

function send200(response, data, mimeType){
	response.writeHead(200, {'Content-Type':mimeType});
	response.end(data);
}

function send404(response){
	response.writeHead(404, {'Content-Type':'text/html'});
	response.end("<h1>404 page not found!</h1>");
}

function send500(response, msg){
	console.log(msg);
	response.writeHead(500, {'Content-Type':'text/html'});
	response.end('500 Server internal error.');
}


function createData(response, data){
	client.connect('mongodb://localhost:27017/bbs', (error, db)=>{
		if(error) {
			send500(response, error);
		} else {
			var post = {title:data.title, content:data.content, name:data.name};
			db.collection('qna').insert(post);
			db.close();
			data = '<html><head><meta charset="utf-8"/></head><body>등록되었습니다.</body></html>';
			send200(response, data, 'text/html');
		}
	});
}
