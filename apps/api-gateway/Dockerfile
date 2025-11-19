# 1️⃣ Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copia manifestos da raiz e do app
COPY package*.json ./
COPY apps/api-gateway/package.json ./apps/api-gateway/
COPY apps/api-gateway/tsconfig*.json ./apps/api-gateway/
COPY apps/api-gateway/src ./apps/api-gateway/src

# Instala dependências (com dev)
RUN npm install --legacy-peer-deps

# Compila o projeto
WORKDIR /usr/src/app/apps/api-gateway
RUN npm run build

# 2️⃣ Runtime stage
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# 👉 Copia node_modules do builder (em vez de reinstalar)
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copia arquivos necessários pro runtime
COPY package*.json ./
COPY --from=builder /usr/src/app/apps/api-gateway/dist ./apps/api-gateway/dist

# Variáveis e porta
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

# Executa o app
CMD ["node", "apps/api-gateway/dist/main.js"]
