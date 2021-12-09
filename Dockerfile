FROM apache:latest

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

EXPOSE 80

VOLUME ./:/var/html

WORKDIR /var/html