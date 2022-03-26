

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



# 서버 기동 설명

```bash
$ docker-compose up -d --build
```




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


