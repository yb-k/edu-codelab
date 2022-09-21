# JS(JavaScript) 개념 및 ES6 정리

## 서론

진행되는 내용들의 이해 돕기 위해 알아두면 좋은 내용을 정리하였습니다.

간단하게 쭉 읽고 넘어가시는 것을 추천드립니다.

## 기본 개념

### JavaScript란

웹 브라우저에서 정적인 HTML을 동적으로 표현하기 위해 사용되는 언어로

별도의 컴파일 작업을 수행하지 않는 **인터프리터**(컴파일과 실행을 동시에 처리) 언어이다.

각각의 웹 브라우저에서 독자적인 기능 개발로 인한 `JavaScript` 파편화를 막기위해

**ECMA(컴퓨터 시스템 표준)** 기구를 통해 `JavaScript` 표준화가 되었으며,

표준화된 언어를 `ECMAScript` 즉, `ES`라고 한다.

특징

1. 웹 브라우저에서 동작하는 유일한 프로그래밍 언어

2. 기본 문법은 `C`, `Java`와 유사

3. 프로토타입 기반 객체지향 언어

4. 일급 함수의 개념 사용

---

### Prototype(프로토 타입) 이란

클래스 기반 객체지향 언어는 객체 생성 이전에 클래스를 정의하여 객체를 생성,

하지만 프로토타입 기반 객체지향 프로그래밍 언어는 클래스 없이도 객체를 생성할 수 있다.

자바스크립트의 모든 객체는 `[[Prototype]]`이라는 인터널 슬롯(interna slot)을 가지며

`[[Prototype]]`의 값은 `Prototype` 객체이며 `__proto__`이라는 속성 접근자(accessor property)로 접근할 수 있다.

---

### 일급 함수란

Function(함수)를 1급 시민으로써 취급

1급 시민이란, 다음과 같은 특징을 가진다.

1. 변수를 담을 수 있다.

2. 인자로 전달할 수 있다.

3. 반환값으로 전달할 수 있다.

일급함수에서는 추가적으로 다음과 같은 특징을 가진다.

4. Runtime 생성이 가능하다.

5. 익명(anonymous)로 생성이 가능하다.

때문에 함수를 주고받을 수 있다는 점에서 일급함수는 고차함수가 가능하다는 특징을 가진다.

---

### Scope 관리

`JavaScript`는 파일별로 scope가 존재하지 않고 하나의 scope를 공유하기 때문에

전역변수를 관리하기위해 즉시 호출 함수 표현식 **IIFE(Immediately Invoked Function Expressions)** 을 이용하여

관리한다. 함수 안에서 선언된 변수의 참조는 함수 밖에서 참조할 수 없는 특징을 이용하여 관리하고

`IIFE`는 인터프리터가 해당 표현식을 만나면 즉시 실행되기 때문에 즉시 실행 함수라고도 한다.

```js
// 기본적으로 전역 스코프를 가진다.
const poo = "poo";

(function () {
  // 즉시실행함수를 통해 스코프를 관리한다.

  const poo = "bar";
  console.log(poo); // bar 출력
})();

console.log(poo); // poo 출력
```

---

### 클로저

클로저란, 내부 함수 범위에서 외부 함수 범위에 있는 변수에 접근할 수 있지만
반대로 외부에서 접근하지 못하는 원리를 말한다.

```js
function makeFunc() {
  // 외부 함수 스코프
  var name = "kim"; // 외부함수 변수
  function displayName() {
    // 내부 함수 스코프
    alert(name); // 외부 함수를 참조한다.
  }
  return displayName;
}

var myFunc = makeFunc();
// makeFunc 함수에 대한 동작은 끝났지만
// name 변수가 리턴된 displayName 함수에서 참조 하고있기때문에
// 해당 변수는 가비지컬렉트를 통해 메모리상 해제되지않고 유지한다.
// 이러한 원리를 클로저라고한다.

myFunc(); // kim 출력
```

---

### 모듈

기존 `CDN`방식을 통한 `js`로드방식은 여러 문제를 야기했습니다.

**기존 방식**

```html
<!-- 중략 -->
<script src="main.js"></script>
<script src="common.js"></script>
<script src="library1.js"></script>
<script src="library2.js"></script>
```

```js
/* main.js */
window.onload = function () {
  // common에 대한 의존성을 확인할 수 없음!
  common.init(); // common.js에 정의된 변수 호출
};
```

이를 해결하기 위한 방법으로 `모듈화`가 필수적으로 진행되었고
많은 방식 중 결국 두가지 방식을 사용하게 됩니다.

`nodejs`에서 사용하는 `commonjs` 방식

```js
const _ = require("lodash"); // 가져오기

module.export = {
  // 내보내기
  add: function Add(a, b) {
    return a + b;
  },
};
```

`브라우저`에서 사용하는 `ES6`

```js
import _ from "lodash"; //가져오기

// 내보내기
export function Add(a, b) {
  return a + b;
}

export default Add;
```

이 두가지 방식 모두 기본적으로 전역 스코프가 아닌 로컬한 스코프를 가지게됩니다.

---

### this bind 정리

자바스크립트 함수 내부의 `this` 값이 결정되는 방식은 아래와 같다.

1. 기본 바인딩(default binding)
2. 암시적 바인딩(implicit binding)
3. `new` 바인딩(new binding)
4. 명시적 바인딩(explict binding)

**기본 바인딩(default binding)**

```js
// case 1
function incrementValue() {
  this.val++;
}

incrementValue.val = 0;

incrementValue();
incrementValue();
incrementValue();

console.log(incrementValue.val); // 0 출력

// 함수 안에서 this 바인딩 값은 오직 함수 호출부에 의해 결정되며, 함수 정의부와는 아무런 상관이 없다.
//상단의 this는 window 즉, 전역객체에 바인딩 된다.
```

```js
// case2
var obj = {
  val: 0,
  incrementValue: function incrementValue() {
    this.val++;
  },
};

var incrementRef = obj.incrementValue;
incrementRef();
incrementRef();
incrementRef();

console.log(obj.val); //0 출력

// obj객체를 통해 맨함수를 호출을 한것 뿐
// this는 동일하게 window를 가르킨다.
```

```js
// case3
var obj = {
  val: 0,
  incrementValue: function incrementValue() {
    "use strict";
    //엄격모드에서 'this'는 기본적으로 window가 아닌 undefined에 바인딩된다.
    this.val++;
  },
};

var incrementRef = obj.incrementValue;

incrementRef(); // Error 출력
```

**암시적 바인딩(implicit binding)**

```js
// case 1
var obj = {
  val: 0,
  incrementValue: function incrementValue() {
    this.val++;
  },
};

obj.incrementValue(); // obj를 통해 호출하고있다
obj.incrementValue();
obj.incrementValue();
console.log(obj.val); // 3 출력
```

```js
// case 2
function valIncrementor() {
  this.val++;
}

var obj = {
  val: 0,
  incrementValue: valIncrementor,
};

obj.incrementValue();
obj.incrementValue();
obj.incrementValue();
console.log(obj.val); // 3 출력
```

**`new` 바인딩**

```js
// case 1
function Counter() {
  this.val = 0;
}

Counter.prototype.incrementValue = function () {
  this.val++;
};

var cnt = new Counter();
cnt.incrementValue();
cnt.incrementValue();
cnt.incrementValue();

console.log(cnt.val); // 3

// 생성자 함수를 new 키워드로 실행하면
// this는 새 객체에 바인딩 된다.
```

```js
// case 2
"use strict";

function Counter() {
  this.val = 0;
}

Counter.prototype.incrementValue = function () {
  this.val++;
};

var cnt = new Counter();
var incrementRef = cnt.incrementValue;

incrementRef(); // ERROR 출력
// 엄격한 모드 에서는
// 함수 안에서의 'this'는 이 함수 호출 시 객체 인스턴스를 분명히 가리켜야 하므로
// 아직까진 암시적 바인딩에 따라 참조한다.
```

**명시적 바인딩(explict binding)**

`call`, `apply`, `bind` 메서드를 사용하여 명시적으로 `this`을 할당한다.

```js
var ReliableJavaScript = ReliableJavaScript || {};

ReliableJavaScript.addValues = function (val1, val2) {
  ///두 인자를 받는 addValues는 this에 printResult가 있다.
  this.printResult(val1 + val2);
};

var contextObject = {
  printResult: function printResult(result) {
    console.log(result);
  },
};

// addValues 함수를 call 메서드로 실행한다.
ReliableJavaScript.addValues.call(contextObject, 2, 3); // 5 출력

// addValues 함수를 apply 메서드로 실행한다.
ReliableJavaScript.addValues.apply(contextObject, [2, 3]); // 5 출력

// addValues 함수를 bind 함수를 통해 명시적으로 this를 바인딩한다.
var bindFunc = ReliableJavaScript.addValues.bind(contextObject);
bindFunc(2, 3); // 5 출력
```

---

### ES6 문법 정리

`ES6`는 `ECMA`에서 2015년에 채택한 자바스크립트 표준이다.
때문에 `ECMA2015`라고도 할 수 있다.

`ES6` , `ES2015`, `ECMA2015` 다 동일한 표준이다.

#### let, const 키워드

기존 `var` 와 호이스팅

- 정의된 변수가 함수 스코프를 가진다.

```js
function foo() {
  var i = 1;
}
console.log(i); //Uncaught ReferenceError: i is not defined
```

- `for`문을 벗어나도 변수가 사라지지 않는다.

```js
for (var i = 0; i < 10; i++) {
  console.log(i);
}

console.log(i); // 9
```

- 동일한 이름의 변수를 여러번 생성할 수 있다.

```js
var foo = 123;
console.log(foo); // 123 출력
var foo = 456;
console.log(foo); // 456 출력
```

- 호이스팅을 적용한다.

호이스팅이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미

`var`로 선언한 변수의 경우 `undefined`로 변수를 초기화한다.
반면 `let`과 `const`로 선언한 변수의 경우 호이스팅 시 변수를 초기화 하지 않는다.

**호이스팅 예제**

1. 존재하지 않는 변수 참조 시

```js
console.log(foo); // Uncaught ReferenceError: foo is not defined
```

2. 호이스팅되어 초기화된 변수를 참조하는 경우

```js
console.log(foo); // undefined
var foo = 1;
```

3. 2번 예시가 실제로 호이스팅되어 처리된 동작

```js
var foo = undefined;
console.log(foo); // undefined
foo = 1;
```

4. 변수 정의 이전에 값 할당

```js
function foo() {
  bar = 2;
  console.log(bar); // 2
  var bar = 1;
}
foo();
console.log(bar); // Uncaught ReferenceError: bar is not defined
```

---

`const`,`let` 는 블록 스코프 영역을 가진다.

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}

console.log(i); // Uncaught ReferenceError: i is not defined
```

또한 호이스팅을 지원하지만 `var`키워드와는 다르게 동작한다.

정의된 위치와 호이스팅된 위치 사이에서 변수를 참조하는 경우 **에러**가 발생된다.

이러한 구간을 **임시적 사각지대**(temporal dead zone)라고도 한다.

```js
console.log(foo); // Uncaught ReferenceError: Cannot access 'foo' before initialization
const foo = 1;
```

```js
let foo = 1;
{
  // 이해를 돕기위해 ++  호이스팅이 되지않았다면 1을 정상적으로 출력했어야함.
  console.log(foo); // Uncaught ReferenceError: Cannot access 'foo' before initialization
  let foo = 2;
}
```

`const`는 재할당이 불가능하다.
다만, 객체 내부 속성값은 수정이 가능하다.

```js
const foo = 1;
foo = 2; // Uncaught TypeError: Assignment to constant variable.
```

```js
// Object
const foo = {
  age: 1,
  name: "Park",
};
foo.age = 5;
console.log(foo.age); // 5

// Array
const foo = [1, 2, 3];
foo[0] = 0;
foo.push(100);
console.log(foo); // [0,2,3,100]
```

기본적으로 `const`를 사용하여 의도하지 않은 초기화가 최소화되도록 작성하는것이 좋다.

---

#### 화살표 함수(Arrow Function)

화살표 함수는 아래의 특징을 고려해야한다.

1. `this`를 가지지 않는다. (상위 `scope`의 `this`를 가르킨다.)
2. `arguments`을 생성하지 않는다.
3. 때문에 `method`, `prototype`, `생성자함수`, `addEventListener 콜백함수`로는 부적절하다.

```js
// case 1
const obj = {};
obj.arrowFunc = () => {
  console.log(this);
};

obj.arrowFunc(); // window 출력

// case 2
const arrowFunc = () => "hello world";

console.log(arrowFunc()); // hello world 출력
```

---

#### 전개연산자와 비구조화 할당(destructuring assignment)

**단축 속성명**

```js
const name = "Park";
const person = {
  age: 10,
  name,
  getName() {
    return this.name;
  }, // person.getName = function getName() {} 과 동일
};
```

**계산된 속성명**

```js
const key = "age";
const value = 12;
const obj = { [key]: value }; // {age: 12}
```

**전개 연산자**

```js
// 전개 연사자 미사용
Math.max(1, 2, 3, 4);

// 전개 연산자 사용시
const nums = [1, 2, 3, 4];
Math.max(...nums);

// 예제
const nums2 = [...nums, 5, 6]; // [1,2,3,4,5,6]
const nums3 = [1, 2, ...[3, 4], 5, 6]; // [1,2,3,4,5,6] 순서 유지됨
const obj = { age: 1 };
const person = {
  ...obj,
  name: "Park",
}; // { 'age': 1, 'name': 'Park' }

const person2 = {
  ...person,
  name: "Kim",
}; // { ''age : 1, 'name': 'Kim'}
```

**비구조화 할당**

```js
// case1 배열에서의 할당

const arr = [1, 2];
const [a, b] = arr; // 비구조화 할당
console.log(a); // 1
console.log(b); // 2

// 아래와 같이 사용할 수 도 있다
let a, b;
[a, b] = [1, 2]; // [1,2]
[a, b] = [b, a]; // [2,1]

// 할당을 원치 않는 값
const [a, , c] = [1, 2, 3]; // a = 1, c = 3
```

```js
// case2 객체에서의 할당

const obj = { a: 1, b:2 };
const {a, b} = obj; // a = 1, b = 2
// 키값을 통해 할당된다.
const {b, a} = obj; // a = 1, b = 2

// 별칭 사용시
const {a:foo, b} = obj; // foo = 1, b = 2

function bar({a,b}) {
   console.log(a+b);
}

bar({1,2}); // 3출력
```

```js
// case3 함수를 사용한 기본값 설정
const getNum = () => 1;
const { num = getNum(), name } = { name: "kim" };
// num = 1, name = 'kim'
```

---

#### 함수(Function)

**매개변수 기본값**

```js
function foo(a = 1) {
  console.log(a);
}
function foo(a = bar()) {
  // 함수도 가능하다
  console.log(a);
}

foo(); // 1
```

> 이를 이용하여 필수값 체크가 가능하다

```js
function required() {
  throw new Error("no parameter");
}

function foo(a = required()) {
  console.log(a);
}

foo(); // error! no parameter!
```

**나머지 매개변수**

```js
function foo(a, ...rest) {
  console.log({ a, rest });
}
foo(1, 2, 3); // {a: 1, rest: [2,3]}
```

---

#### 비동기 프로그래밍

**Promise**

기존 비동기 프로그래밍 방식으로 `callback`패턴을 많이 사용하였다.

콜백지옥이라는 말이 나올정도로 중첩되면 복잡해지기 쉬운 구조이다.

하지만, `Promise`에서는 순차적으로 실행되도록 작성이 가능하다.

```js
req_01()
  .then((data) => {
    console.log(data);
    return req_02();
  })
  .then((data) => {
    console.log(data);
    // ...
  });
```

`Promise` 예제

```js
const p1 = new Promise((resolve, reject) => {
  // ...
  // resolve(data); //성공 시
  // reject('error'); // 실패 시
});

// 또는 성공 실패를 기정의하여 리턴할 수 있다.
const p2 = Promise.reject("error");
const p3 = Promise.resolve(param);
```

`Promise.all` 병렬처리

```js
// p1, p2 Promise 객체
Promise.all([req_01(), req_02()]).then((data1, data2) => {
  console.log(data1, data2);
});
/*
Promise.all은 모든 프로미스가 정상적으로 처리될 경우에만 then 을 실행,
하나만 실패하더라도 reject로 실패처리된다.
*/
```

**`async`와 `await`**

`async`, `await` 함수는 `Promise`를 반환한다.

`Promise`는 객체, `async`, `await`는 함수 이다

```js
async function req() {
  return 123;
}
req().then((data) => console.log(data)); // 123
```

**사용 예제**

```js
// req_1, req_2 는 프로미스 객체를 리턴하는 함수이다.
async function getData() {
  const data1 = await req_1();
  // reject에 대한 처리시 try..catch를 사용한다.
  try {
    const data2 = await req_2(data1);
  } catch (e) {
    // reject 또는 error
    data2 = "some";
  }
  console.log(data1, data2);
}
```

결과적으로 실패에 대한 처리를 위해 `try..catch` 구문를 통해 작성해야하는데,

인터프리터에서 발생되는 런타임 오류 `error`와 인지하고 있는 실패에 대한 `reject`을 통한 처리를 구별할 수 없다.

---

### 템플릿 리터럴

템플릿 리터럴은 작은 따움표와 큰따옴표의 혼용이 가능하다.

여러 줄의 문자열을 작성할 수 있다.

문자열 안에서 `${}`을 이용해 변수를 사용할 수 있다.

```js
const msg = `확인 결과
'${name}'은 평균 ${score / 10}점입니다.`;
// "확인\s결과\n'홍길동'은\s평균\s100점입니다."; 출력
```
