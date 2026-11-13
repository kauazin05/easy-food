# ADR 0004 — Serviço de e-mail genérico e tolerante a falhas

**Status:** Aceita

## Contexto
Cadastro de usuário e de restaurante devem enviar e-mail. O objetivo principal (salvar o cadastro) não pode falhar porque uma ação secundária (e-mail) falhou.

## Alternativas
1. Enviar e-mail dentro de cada service, com a lib escolhida.
2. Serviço genérico em `shared/email.service.js`, sem regra de negócio, usado por vários módulos.
3. Fila + worker dedicado.

## Decisão
Opção 2. O `email.service` só recebe `to/subject/text`. Quem o usa envolve a chamada em `try/catch`: se falhar, registra um aviso e o cadastro continua com sucesso.

## Consequências
- (+) Reutilizável, baixo acoplamento, trocar o provedor mexe em um único arquivo.
- (−) Sem retentativa: e-mails que falham são perdidos (uma fila resolveria, com mais complexidade).
