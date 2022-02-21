# JSON-SERVER 패키지 활용하기

## 서론

`nodejs`는 브라우저 런타임 환경이 아닌, `V8`엔진 런타임 환경에서 동작하기때문에

기존 브라우저 환경에서 벗어나 파일을 관리하거나 서버를 구동할 수 있습니다.

이러한 장점을 활용하여 개발환경을 개선하기위해 이번 챕터를 준비하였습니다.

`json-server` 패키지는 json`파일로 간단한 API 서버를 구현할 수 있습니다.

때문에, API서버가 개발되지 않더라도 최소한의 개발환경을 보장받을 수 있습니다.

## 설명

개발에 들어가기 앞서 `json-server`는 `express`패키지를 통해 `HTTP`서버를 구성합니다.
때문에 기본적으로 `express`에 대한 어느정도 이해도가 있다면 도움이 될 수 있습니다.

> [express 공식홈페이지](https://expressjs.com/ko/) 

특정 패키지를 설치/사용한다면 꼭 관련 **공식문서**를 확인하시길 바랍니다.

> [json-server 깃허브 링크](https://github.com/typicode/json-server)



## 실습요구사항

아래의 요구사항은 practice 폴더에서 진행합니다. 

1. practice 폴더에서 `npm install` 또는 `yarn install`을 통해 패키지 설치
2. `pacakge.json` 내 `serve:json`에 아래의 스크립트를 추가하여 실행해보기
```bash
json-server --watch db.json --static ./public --port 3000
```
3. `serve:json`을 실행한 상태에서 `postman`을 통해 아래의 내용을 호출해보기
    
    3-1. GET /todos

    3-2. POST /todos
    ```json
    {
    "id": 4,
    "content": "nodejs",
    "completed": false
    }
    ```

    3-3. GET /todos 추가된 목록을 확인

4. http://localhost:3000/ 브라우저 접속, public/index.html 파일 수정해보기

5. master/server.js 를 참고하여 server.js 작성 및 실행해보기

6. `serve:custom`을 실행한 상태에서, Morpheus APP에서 `M.net.http.send`을 통해 호출해보기


아래의 내용은 선택사항입니다.

- 파일 업로드 기능 및 route 추가하기
- `express project structure` 키워드를 검색 / 참고하여 프로젝트 구조를 개선