

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


