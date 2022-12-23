FROM nginx:stable-alpine

ENV CLIENT_APP wolf-admin

ENV NGINX_PATH /etc/nginx/sites-enabled

COPY build /var/www/$CLIENT_APP

RUN rm /etc/nginx/conf.d/default.conf

COPY nginxconfig.conf /etc/nginx/conf.d/default.conf
