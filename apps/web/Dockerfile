FROM node:20

WORKDIR /app

# Copia apenas os package.json do web para instalar dependências
COPY apps/web/package*.json ./apps/web/

WORKDIR /app/apps/web

# Instala dependências corretamente com glibc
RUN npm install

# Agora copia todo o projeto
COPY apps/web /app/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
