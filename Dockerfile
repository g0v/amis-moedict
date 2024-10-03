FROM node:14-bullseye

RUN apt-get update
RUN apt-get install -y git ca-certificates locales curl debian-archive-keyring g++ gcc make dpkg-dev
RUN echo 'zh_TW.UTF-8 UTF-8' >> /etc/locale.gen
RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen
RUN locale-gen

RUN yarn install --frozen-lockfile
RUN npm install gulp-cli --global

WORKDIR /srv/web

ENV PORT="8888"
EXPOSE ${PORT}

CMD ["bash"]
