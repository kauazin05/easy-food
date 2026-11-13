# ADR 0001 — Monólito modular

**Status:** Aceita

## Contexto
A EasyFood começou com `GET /restaurants` em um único arquivo. Com cadastro, autenticação e favoritos, o código precisava crescer sem virar uma bagunça, mas o time é pequeno e o sistema ainda não exige escalar partes de forma independente.

## Alternativas
1. Arquivo único (`server.js` com tudo).
2. Monólito modular (módulos `auth`, `restaurants`, `favorites` + `shared`).
3. Microsserviços.

## Decisão
Monólito modular. Cada módulo tem `routes -> controller -> service`, e o que é reutilizável fica em `shared/` (Prisma, e-mail, erros).

## Consequências
- (+) Responsabilidades claras, fácil de testar e de evoluir; um único deploy.
- (+) Um módulo pode virar serviço separado no futuro.
- (−) Todos os módulos escalam juntos; um erro grave pode afetar toda a API.
