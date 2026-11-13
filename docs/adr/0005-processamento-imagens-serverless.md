# ADR 0005 — Processamento de imagens com função serverless

**Status:** Proposta (função implementada em `functions/optimize-image.js`)

## Contexto
Restaurantes poderão enviar imagem de perfil (ex.: 12 MB, 4000x3000). Processar dentro da API consome CPU/memória e deixa o usuário esperando.

## Alternativas
1. Processar dentro da API (Sharp).
2. Serviço independente sempre ligado.
3. Função serverless disparada pelo upload (ex.: S3 -> AWS Lambda).

## Decisão
Opção 3: a API só recebe/registra o upload; uma função serverless redimensiona (800px) e converte para WebP de forma assíncrona.

## Consequências
- (+) A API não é sobrecarregada; escala por demanda; paga-se pelo uso.
- (−) Cold start, limites de execução, dependência do provedor, imagem otimizada não é imediata.
