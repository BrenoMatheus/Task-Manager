
# Jungle Task Manager – Desafio Técnico

Um gerenciador de tarefas completo desenvolvido para o desafio técnico da  , aplicando boas práticas de arquitetura, microsserviços, mensageria, autenticação JWT e uma UI moderna com React + TanStack Router + React Query.

## Tecnologias Utilizadas
* Backend
* Node.js + NestJS
* TypeORM
* PostgreSQL
* RabbitMQ (mensageria)
* Microsserviços (Auth + Tasks + API Gateway)
* JWT (Access + Refresh Tokens)
* Frontend
* React + Vite
* TanStack Router
* React Query
* TailwindCSS
* Shadcn UI

## Funcionalidades
### Autenticação

* Registro e Login
* Refresh Token automático
* Proteção de rotas no front e no gateway
* Logout com revogação do refresh token

### Gerenciamento de Tarefas

* Criar tarefas
* Atualizar tarefas
* Deletar tarefas
* Listar com filtros
* Prioridade, status e data de vencimento

### Comentários e Histórico

* Adicionar comentários
* Histórico de alterações (quem fez e quando)

### Notificações

* Notificações geradas ao criar, atualizar ou excluir tarefas
* Cada notificação ligada ao userID responsável
* Atualização em tempo real via React Query

### Arquitetura
```

├── apps/
│   ├── web/                     
│   │   ├── src/                  # React + TanStack Router + shadcn + Tailwind
│   │   ├── Dockerfile   
│   │   ├── .env.example          # variáveis de ambiente do frontend
│   │   ├── package.json              
│   ├── api-gateway/   
│   │   ├── src/                  # HTTP + WebSocket + Swagger
│   │   ├── Dockerfile
│   │   ├── .env.example          # variáveis do API Gateway (Nest.js)
│   │   ├── package.json
│   ├── auth-service/            
│   │   ├── src/                  # Nest.js (microserviço de autenticação)
│   │   ├── migrations/
│   │   ├── Dockerfile
│   │   ├── .env.example          # variáveis do serviço de autenticação
│   │   ├── package.json
│   ├── tasks-service/   
│   │   ├── src/                  # Nest.js (microserviço RabbitMQ)
│   │   ├── migrations/
│   │   ├── Dockerfile        
│   │   ├── .env.example          # variáveis do serviço de tarefas
│   │   ├── package.json
│   └── notifications-service/   
│       ├── src/                  # Nest.js (microserviço RabbitMQ + WebSocket)
│       ├── migrations/
│       ├── Dockerfile
│       ├── .env.example          # variáveis do serviço de notificações
│       ├── package.json                
├── packages/
│   ├── types/                   
│   ├── utils/                   
│   ├── eslint-config/           
│   └── tsconfig/                
├── docker-compose.yml
├── turbo.json
├── package.json
└── README.md

```

## Como Rodar o Projeto

### Pré-requisitos

* Node 18+
* PostgreSQL
* RabbitMQ
* Yarn ou NPM

 ou

* docker
* docker composer

### Rodando Tudo via Docker (Recomendado)

``` bash
docker compose up --build -d
```

A aplicação iniciará:

* Backend: http://localhost:3001
* Frontend: http://localhost:3000
* RabbitMQ: http://localhost:15672
* PostgreSQL: porta 5432
