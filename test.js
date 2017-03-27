// 주석
/*
	여러줄주석
*/

//1. 변수의 선언 - 타입이 없다 var로 통일

var integer = 50;


//2. 숫자연산
var result = integer + 30;

//3.콘솔에 출력
console.log(result);

function sum(param1, param2){
	return param1 + param2;
}


function sumPrint(param1, param2){
	console.log(sum(param1, param2));
}

console.log("sum = " + sum(1,5));
sumPrint(5,7);