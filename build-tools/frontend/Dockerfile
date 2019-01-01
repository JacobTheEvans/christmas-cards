FROM nginx:1.15-alpine
COPY ./index.html /app/web_root/
COPY ./dist /app/web_root/dist
COPY ./static /app/static
COPY ./nginx-default.template.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
