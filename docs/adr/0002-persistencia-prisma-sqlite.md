# ADR 0002 — Persistência com Prisma + SQLite

**Status:** Aceita

## Contexto
Com array em memória, os restaurantes cadastrados se perdiam ao reiniciar o servidor.

## Alternativas
1. Continuar em memória.
2. Arquivo JSON.
3. Prisma ORM com SQLite (dev) e troca por PostgreSQL em produção.

## Decisão
Prisma com SQLite. Models em `prisma/schema.prisma`, migrations versionadas e acesso ao banco somente dentro dos *services*, via `shared/prisma.js`.

## Consequências
- (+) Dados persistem, schema versionado, consultas tipadas, fácil trocar de banco (só o `provider`/URL).
- (−) Dependência de uma ferramenta a mais (`prisma generate`/`migrate`).
- (−) SQLite não é indicado para alta concorrência em produção.
