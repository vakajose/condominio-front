# Dockerfile para Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa de servidor web para servir los archivos compilados
FROM nginx:alpine
COPY --from=build /app/dist/condominio-front /usr/share/nginx/html
EXPOSE 80
