FROM mysql:8.0-debian

RUN apt-get update && apt-get install -y --no-install-recommends \
vim \
net-tools

RUN chown -R mysql:root /var/lib/mysql

ENV MYSQL_DATABASE test

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./db.sql /docker-entrypoint-initdb.d/

