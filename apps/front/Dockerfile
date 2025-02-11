FROM nginx:latest

COPY apps/front/nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]