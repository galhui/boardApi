FROM node:17-stretch-slim

EXPOSE 3000

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

RUN apt-get update -y
RUN apt-get install -y curl tar make gcc build-essential
RUN npm i -g @nestjs/cli

ADD config ./config
ADD tsconfig.build.json ./tsconfig.build.json
ADD tsconfig.json ./tsconfig.json
ADD package.json ./package.json
ADD package-lock.json ./package-lock.json
ADD nest-cli.json ./nest-cli.json

RUN npm install
RUN node_modules/mecab-ya/bin/install-mecab ko

# 코드 수정에 의해 빌드가 위에서부터 안되도록 mecab 아래로 내리자 
ADD src ./src

RUN npm run build

CMD ["node", "dist/main"]
