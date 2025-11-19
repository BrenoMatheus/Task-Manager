# 1️⃣ Build stage
FROM node:20-alpine AS builder

# O WORKDIR é a raiz do monorepo no container
WORKDIR /usr/src/app

# Copia os manifestos da raiz e do app
COPY package*.json ./

# Copia os arquivos de configuração do tasks-SERVICE a partir da raiz do contexto
COPY apps/tasks-service/package.json ./apps/tasks-service/
COPY apps/tasks-service/tsconfig*.json ./apps/tasks-service/

# Copia o código-fonte do tasks-SERVICE
COPY apps/tasks-service/src ./apps/tasks-service/src

# Instala todas as dependências do monorepo na raiz (necessário para o build)
RUN npm install --legacy-peer-deps

# Roda o build (compilação TypeScript) no diretório do serviço
WORKDIR /usr/src/app/apps/tasks-service
RUN npm run build
# 2️⃣ Runtime stage
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Copia o node_modules completo da etapa de build
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copia o build final do serviço
COPY --from=builder /usr/src/app/apps/tasks-service/dist ./apps/tasks-service/dist
COPY --from=builder /usr/src/app/apps/tasks-service/package*.json ./apps/tasks-service/

WORKDIR /usr/src/app/apps/tasks-service

ENV NODE_ENV=production
ENV PORT=3003
EXPOSE 3003

CMD ["node", "dist/main.js"]
