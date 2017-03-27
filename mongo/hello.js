var Client = require('mongodb').MongoClient;

//mongodb.js

Client.connect('mongodb://localhost:27017/bbs', function(error, db){
   if(error) {
       console.log(error);
   } else {
       // 1. 입력할 document 생성
       var post = {title:'제목입니다2', content:'내용2', name:'아무개2'};
       // 2. student 컬렉션의 insert( ) 함수에 입력
       db.collection('qna').insert(post);

       db.close();
   }
});
