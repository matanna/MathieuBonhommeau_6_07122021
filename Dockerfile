FROM httpd:latest

RUN apt-get update && apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs npm

EXPOSE 80

WORKDIR /usr/local/apache2/htdocs/