// no-var rule
// var를 쓰지않도록
var poo = 'poo';

// single-quotes rule
// 문자열 사용시 홀따옴표만 사용
const foo = "foo";
const bar = `bar`;
console.log(poo, foo, bar);

// no-unused-vars
// 선언되었으나 사용하지 않는 변수
function func1(a, b, c) {
  return a + b;
}

// no-undef
function func2(a, b) {
  return a + b + c;
}

// no-unreachable
function func3() {
  return 1;
  return 2;
}

func1();
func2();
func3();
