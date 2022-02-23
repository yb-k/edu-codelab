# WebPack

**Webpack 5 버전을 기준으로 작성합니다.**

> [webpack document](https://webpack.js.org/)

## 설명

`webpack`은 자바스크립트 정적 모듈 번들러 입니다.

쉽게 애기해서 여러개의 파일을 하나의 파일로 묶어주는 역할을 합니다.

> `bundle` - 꾸러미,묶음

시작하기 전 아래의 컨셉은 짚고 넘어가야합니다.

1. Entry : 의존성 그래프의 시작점을 지정합니다.

2. Output : `webpack`이 생성한 번들을 내보낼 위치와 파일이름을 지정합니다.

3. Loaders : 사용할 파일 유형(sass, css, woff, png 등)을 `webpack`이 지원할 수 있도록 처리하는 역할입니다. (기본적으로 `webpack`은 `js, json`만 지원합니다.)

4. Plugins : 로더에서의 작업 이외의 처리를 담당합니다.

5. Mode : `development`, `production` , `none`을 설정하고 각 환경에 대한 최적화가 자동으로 진행됩니다.
