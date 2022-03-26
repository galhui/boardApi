FROM mysql:8.0.28

# 인코딩
ENV LC_ALL=C.UTF-8
ENV character-set-server utf8
ENV collation-server utf8_general_ci
ENV default-character-set utf8
ENV default-collation utf8_general_ci

COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

EXPOSE 3306