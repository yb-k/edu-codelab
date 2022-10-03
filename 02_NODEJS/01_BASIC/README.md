# NODEJS

## 서론

기본적으로 `Vue` 또는 `React`는 노드 프로젝트을 통해 개발환경을 구성합니다.

`nodejs`에 대한 기본적인 생성, 관리를 학습할 필요가 있습니다.

## 실습

아래의 요구사항은 practice 폴더에서 진행합니다.

진행한 이후 master 폴더를 확인합니다.

1. `package.json`을 생성합니다. TIP : `npm`을 사용합니다.
2. `lodash` 패키지를 설치합니다.
3. `npm run start`를 입력하였을때 index.js를 node로 실행시킵니다.
4. `.gitignore`파일을 생성하여 필요없는 폴더/파일을 `git`에서 추적하지 않도록 제외합니다.

# 설명

## 1) 프로젝트 생성

`npm`을 사용하여 프로젝트를 생성합니다.

```bash
npm init
# 또는
npm init -y
```

## 2) 패키지 설치

`npm`을 통해 패키지를 설치할 수 있습니다.

아래의 링크에서 설치할 패키지를 검색해볼 수 있습니다.

[NPM 공식홈페이지](https://www.npmjs.com/)

`lodash` 패키지 설치

```bash
npm install lodash
```

입력시 `package.json` 파일에 `lodash`에 대한 의존성이 추가되며, 버전을 확인할 수 있습니다.

```js
  "dependencies": {
    "lodash": "^4.17.21"
  }
```

또는 `package.json`에 있는 등록된 의존성 패키지를 설치하려는 경우 아래의 커맨드를 입력하여 설치합니다.

```bash
 npm install
```

해당 패키지는 `node_modules`에 폴더에 설치됩니다.

패키지 간의 의존성(설치) 정보를 가진 `package-lock.json` 이 생성됩니다.

### `npm`을 대신하는 `yarn`

추가적으로 페이스북에서 만든 패키지 매니저인 `yarn`이 있습니다.

**`yarn` 설치 방법**

```bash
  npm install -g yarn
```

**`yarn`을 통한 패키지 설치**

```bash
# package.json의 패키지를 설치
yarn install
# 특정 패키지 설치
yarn add loadsh
```

패키지 설치시 `yarn.lock`파일이 생성됩니다.

기존 프로젝트에 `yarn.lock`이 포함된 경우 `yarn`을 통해 패키지를 설치하셔야하며,

`package-lock.json`이 포함된 경우 `npm`을 통해 설치를 진행하면 됩니다.

## 스크립트 설정

`nodejs`에서는 실행될 스크립트를 정의하여 호출하여 사용합니다.

해당 정의 부분은 `package.json`파일 내 `scripts` 속성에 추가하여 작성하면 됩니다.

`package.json`

```js
  "scripts": {
    "start":"node index.js"
  },
```

## 제외할 폴더/파일

`node_modules`는 설치된 패키지 폴더이기 때문에 포함하지 않습니다.

`yarn.lock` 또는 `package-lock.json`은 설치된 패키지 내 의존성 트리에 대한 정보를 가지기 때문에 포함되어야합니다.
