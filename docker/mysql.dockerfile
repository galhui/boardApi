FROM mysql:8.0.28
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

EXPOSE 3306