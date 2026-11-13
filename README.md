# EasyFood

API de restaurantes (monólito modular) + interface HTML. Node.js, Express, Prisma (SQLite) e JWT.

## Evolução do projeto
`GET /restaurants` → `POST /restaurants` → Persistência (Prisma) → Monólito modular → Autenticação (JWT) → Separação de responsabilidades → Serviços compartilhados (e-mail) → Favoritos → Função serverless de imagens.

## Como rodar
```bash
npm install
npm run setup     # cria o banco (migration) e popula os restaurantes
npm start         # http://localhost:3000
```
O arquivo `.env` já vem configurado (copie de `.env.example` se precisar). A interface abre em `http://localhost:3000`.

## Estrutura
```
easy-food/
├── prisma/            schema.prisma (User, Restaurant, Favorite) e seed
├── public/index.html  interface (login, lista, filtro, busca, cadastro, favoritos)
├── functions/         função serverless de otimização de imagem (Sharp)
├── docs/adr/          decisões arquiteturais (ADRs)
└── src/
    ├── app.js / server.js
    ├── shared/        prisma, email.service, errors
    └── modules/
        ├── auth/         routes → controller → service (+ middleware JWT)
        ├── restaurants/  routes → controller → service
        └── favorites/    routes → controller → service
```
Fluxo de uma requisição: `Requisição → Route → Middleware → Controller → Service → Prisma → Banco`.

## Endpoints
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/auth/register` | não | Cria usuário (201, 400, 409) |
| POST | `/auth/login` | não | Retorna `token` JWT (200, 400, 401) |
| GET | `/restaurants?category=&search=` | não | Lista restaurantes |
| POST | `/restaurants` | **sim** | Cadastra restaurante (201, 400, 401) |
| GET | `/favorites` | **sim** | Lista favoritos do usuário |
| POST | `/favorites/:restaurantId` | **sim** | Favorita (201, 404) |
| DELETE | `/favorites/:restaurantId` | **sim** | Remove favorito (204) |
| GET | `/health` | não | Status |

### Teste rápido (curl)
```bash
curl -X POST localhost:3000/auth/register -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@teste.com","password":"123456"}'
# copie o token e use:
curl -X POST localhost:3000/restaurants -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" -d '{"name":"Taco Loco","category":"Pizza","rating":4.3}'
```

## Decisões arquiteturais
Veja `docs/adr/` (monólito modular, Prisma, JWT, e-mail tolerante a falhas, serverless).

## Publicar no GitHub
```bash
git init && git add . && git commit -m "EasyFood: entrega completa"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/easy-food.git
git push -u origin main
```
(O `.env` e o banco local não vão para o repositório: estão no `.gitignore`.)
