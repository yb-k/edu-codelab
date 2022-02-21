# HTTP-SERVER 패키지 활용하기

## 서론

`npm`을 통해서 특정 패키지를 전역에 설치 할 수 있습니다.

이를 통해 자주 사용하는 패키지 또는 도구를 전역으로 설치하여 이후 CLI를 통해 사용할 수 있습니다. 

또한, `http-server`에서는 `proxy server`기능을 제공하고 있기 때문에

개발환경에서 발생될 수 있는 `cors` 에러에 유연하게 대응할 수 있습니다.

`http-server`를 설치하여 활용해봅시다.

## 설명

[http-server](https://www.npmjs.com/package/http-server)

전역 패키지 설치를 하기위해서는 `-g` 플래그를 추가합니다.

```bash
  npm i -g http-server
```

## 요구사항

1. 전역 패키지로 `http-server` 설치

2. master/public 폴더를 기준으로 `http-server` 실행하기

3. 02_JSONSERVER에서 `serve:json`을 통해 실행한 서버를 프록시 대상 서버로 지정하여

   'getlist'버튼을 클릭하여 할일목록을 불러오도록 처리하기