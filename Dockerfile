# Etapa 1: Build
FROM node:18 as build

WORKDIR /app

# Copie os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copie o restante dos arquivos e execute o build
COPY . .
RUN npm run build

# Etapa 2: Configuração do Nginx
FROM nginx:alpine

# Copie a configuração personalizada do Nginx
COPY nginx.file /etc/nginx/conf.d/default.conf

# Copie os arquivos de build para o diretório do Nginx
COPY --from=build /app/dist/front-end-ncv /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
