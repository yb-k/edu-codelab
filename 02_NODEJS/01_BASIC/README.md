# NODEJS

## 서론

기본적으로 `Vue` 또는 `React`는 노드 프로젝트을 통해 개발환경을 구성합니다. 

`nodejs`에 대한 기본적인 생성, 관리를 학습할 필요가 있습니다.


## 설치

`nodejs`는 두가지 방식으로 설치가 가능합니다.

> LTS 란, Long Term Support로 안정적인 버전을 뜻합니다. 때문에 LTS 버전을 꼭 설치하시길 바랍니다.

> 공식 도큐먼트에서 설치 방법을 가이드해드리고있습니다.

> [설치가이드 확인하기](https://docs.morpheus.co.kr/client/spa/overview.html#id4)


1. `nvm`을 통해 여러가지 버전을 관리/설치하는 방법 **(권장)**

- Mac OS인 경우

  **HomeBrew 사용**
  
  ```bash
  brew install nvm
  ```

  > [nvm-sh](https://github.com/nvm-sh/nvm) 참고


- Windows

  > [nvm-windows](https://github.com/coreybutler/nvm-windows) 참고


2. 한가지 버전을 설치하여 관리하는 기본적인 방법

[nodejs 공식 홈페이지](https://nodejs.org/)

위의 링크에서 LTS 버전을 다운로드하여 설치합니다.

해당 링크는 Install 매니저를 제공하기 때문에

옵션에서 `PATH`설정을 클릭하시면 자동으로 `환경변수`에 세팅됩니다.

 또는

 - `HomeBrew`를 통한 설치 (Only Mac OS)

 ```bash
 # nodejs 버전 검색
 brew search node
 ```

 ```bash
 # LTS(짝수)버전 설치
 brew install node@16
 ```

설치 후 PATH를 설정해주어야합니다.
```bash
# .bash_profile 또는 .zshrc
export PATH="/usr/local/opt/node@16/bin:$PATH"
```

```bash
node -v
# 노드가 설정된 경우 버전을 확인할 수 있습니다.
v12.21.0
```

***

## 실습요구사항

아래의 요구사항은 practice 폴더에서 진행합니다.

진행한 이후 master 폴더를 확인하여 정답을 확인합니다.

1. `package.json`을 생성합니다. TIP : `npm`을 사용합니다.
2. `lodash` 패키지를 설치합니다.
3. `npm run start`를 입력하였을때 index.js를 node로 실행시킵니다.
4. `.gitignore`파일을 생성하여 필요없는 폴더/파일을 `git`에서 추적하지 않도록 제외합니다.




