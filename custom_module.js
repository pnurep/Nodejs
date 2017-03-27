// 모듈은 자바에서의 클래스(자체적으로 실행은 안되는 클래스 -> 주로 어디서 가져다 쓰기 위한것(유틸, 라이브러리 개념))
// 1. exports 객체를 사용해서 sum이라는 변수를 만들고, sum 변수에 function 을 사용해서 하나의 파라미터를 가진 함수식을 대입
exports.sum =  function(max) {
    // 2. 입력된 값을 최대값으로 1부터 최대값까지 더해서 반환하는 로직
    return (max+1)*max/2;
}

// 3. var1 변수에 'NEW VALUE 100' 입력
var var1 = 'NEW VALUE 100';

exports.getVar1 = function(){
  return var1;
}
