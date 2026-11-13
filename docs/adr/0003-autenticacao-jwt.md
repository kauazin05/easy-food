# ADR 0003 — Autenticação com JWT

**Status:** Aceita

## Contexto
Apenas restaurantes autenticados devem se cadastrar, e favoritos pertencem a um usuário. Rotas de escrita precisam ser protegidas.

## Alternativas
1. Sessão no servidor (cookie + store).
2. JWT enviado em `Authorization: Bearer`.

## Decisão
JWT (expira em 2h) com senha guardada como hash (bcrypt). Um middleware (`auth.middleware.js`) valida o token e preenche `req.user`. `GET /restaurants` segue público; `POST /restaurants` e `/favorites` exigem login.

## Consequências
- (+) API *stateless*, simples de escalar; middleware reutilizável.
- (−) Token não pode ser revogado antes de expirar (sem lista de bloqueio/refresh token).
- (−) `JWT_SECRET` precisa ser protegido (variável de ambiente).
