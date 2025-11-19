# 1️⃣ Build stage
FROM node:20-alpine AS builder

# O WORKDIR é a raiz do monorepo no container
WORKDIR /usr/src/app

# Copia os manifestos da raiz e do app
COPY package*.json ./

# Copia os arquivos de configuração do notifications-SERVICE a partir da raiz do contexto
COPY apps/notifications-service/package.json ./apps/notifications-service/
COPY apps/notifications-service/tsconfig*.json ./apps/notifications-service/

# Copia o código-fonte do notifications-SERVICE
COPY apps/notifications-service/src ./apps/notifications-service/src

# Instala todas as dependências do monorepo na raiz (necessário para o build)
RUN npm install --legacy-peer-deps

# Roda o build (compilação TypeScript) no diretório do serviço
WORKDIR /usr/src/app/apps/notifications-service
RUN npm run build
# 2️⃣ Runtime stage
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Copia o node_modules completo da etapa de build
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copia o build final do serviço
COPY --from=builder /usr/src/app/apps/notifications-service/dist ./apps/notifications-service/dist
COPY --from=builder /usr/src/app/apps/notifications-service/package*.json ./apps/notifications-service/

WORKDIR /usr/src/app/apps/notifications-service

ENV NODE_ENV=production
ENV PORT=3004
EXPOSE 3004

CMD ["node", "dist/main.js"]
