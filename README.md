
# 프로젝트 설명

게시글, 댓글 작성시 제목과 본문을 형태소분석하여 keyword를 추출합니다.

keyword 알림을 등록한 해당 사용자에게 알림을 보내줍니다.

형태소 분석기 mecab 설치가 되어있어야 정상적으로 작동합니다.

- mecab은 window환경에서 설치하기 어렵습니다. docker를 이용해 실행해보는게 가장 편합니다.

<br>

# 서버 기동 및 시현 설명

docker가 사전에 설치되어있어야 합니다. docker 설치후 아래 커맨드를 이용해서 서버를 기동할수 있습니다.

https://www.docker.com/products/docker-desktop/

```bash
$ docker-compose up -d --build
```

위 명령어를 입력하면 mysql 서버와 node서버가 기동됩니다. 

기동이 완료되면 아래 URL에서 API 동작을 확인 할 수 있습니다.

http://localhost:8080/swagger

mysql에는 기본 테이블들이 자동으로 생성되고, keyword dump 데이터가 생성됩니다.

mysql DB 접속 기본 정보는 아래와 같습니다.

host : localhost:3306
user : root
password : password

<br>

# 폴더/파일 구조 설명

```bash
├── config              # 환경 변수
├── db_design           # Mysql Workbench에서 열수 있는 DB Model 파일
├── docker              # API, DB 서버 docker build 파일
├── entities            # typeorm-model-generator로 생성된 파일
├── sql-script          # DB Model로 생성된 테이블 스키마, API docker 이미지 생성시 기본 테이블 생성시 필요
├── src                 # 프로램 메인코드
│   ├── core            # 서버 설정 관련코드 및 공통코드
│   └── service_modules # 비지니스 로직 관련 코드
├── docker-compose.yml  # 최종 서버 기동용
├── nest-cli.json       # nest build시 설정
├── ormconfig.json      # typeorm-model-generator 설정
├── pakage.json         # 프로젝트 종속성 설정
├── tsconfig.build.json # typescript 빌드 설정
└── tsconfig.json       # typescript 실행 설정
``` 

<br>

# 로컬 테스트 관련 설명

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



# 그외 툴팁
## NestJs cli

```bash
$ npm i -g @nestjs/cli

# 프로젝트 생성
$ nest new boardapi

# reousrce 생성
$ nest g reousrce board

# 모듈 생성
$ nest g module notice

```

## typeorm-model-generator 사용

```bash
$ npm i -g typeorm-model-generator

# 디비에 생성된 테이블을 기준으로 entity 생성
$ typeorm-model-generator -h localhost -d board -p 3306 -u root -x password -e mysql -o ./
```


