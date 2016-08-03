FROM ubuntu:latest

ENV DB_LOC=mongodb://127.0.0.1:7080/onsitedb
ENV PORT=8080
ENV SERVER=127.0.0.1

EXPOSE 8080

RUN apt-get update && apt-get install -y git nodejs npm && \
    git clone https://github.com/mira0993/learning_js.git /opt

RUN cd /opt/ && npm install --production

CMD  nodejs /opt/server.js
