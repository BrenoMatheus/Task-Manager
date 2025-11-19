# 1️⃣ Build stage
FROM node:20-alpine AS builder

# O WORKDIR é a raiz do monorepo no container
WORKDIR /usr/src/app

# Copia os manifestos da raiz e do app
COPY package*.json ./

# Copia os arquivos de configuração do AUTH-SERVICE a partir da raiz do contexto
COPY apps/auth-service/package.json ./apps/auth-service/
COPY apps/auth-service/tsconfig*.json ./apps/auth-service/

# Copia o código-fonte do AUTH-SERVICE
COPY apps/auth-service/src ./apps/auth-service/src

# Instala todas as dependências do monorepo na raiz (necessário para o build)
RUN npm install --legacy-peer-deps

# Roda o build (compilação TypeScript) no diretório do serviço
WORKDIR /usr/src/app/apps/auth-service
RUN npm run build
# 2️⃣ Runtime stage
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Copia o node_modules completo da etapa de build
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copia o build final do serviço
COPY --from=builder /usr/src/app/apps/auth-service/dist ./apps/auth-service/dist
COPY --from=builder /usr/src/app/apps/auth-service/package*.json ./apps/auth-service/

WORKDIR /usr/src/app/apps/auth-service

ENV NODE_ENV=production
ENV PORT=3002
EXPOSE 3002

CMD ["node", "dist/main.js"]
