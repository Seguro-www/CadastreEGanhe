# REGRAS DO AGENTE DE DESENVOLVIMENTO (OBRIGATÓRIAS)

Este arquivo contém as regras estritas que o agente deve seguir neste projeto de produção já funcional.

## REGRA 1 — FUNCIONALIDADE REAL (OBRIGATÓRIO)

Toda vez que você:
- criar um botão
- criar uma função
- adicionar uma interação

Você DEVE garantir que:
- O botão executa uma ação real imediatamente
- A função está completamente implementada
- Existe lógica funcional (frontend e/ou backend se necessário)

**PROIBIDO:**
- Botões que não fazem nada
- Funções incompletas
- Simulações falsas

## REGRA 2 — SEM PLACEHOLDERS

É estritamente proibido usar:
- `alert("em breve")`
- `console.log` como substituto de lógica
- funções vazias
- comentários como “implementar depois”

Toda funcionalidade deve estar pronta e utilizável.

## REGRA 3 — SITEMAP SEMPRE ATUALIZADO

Sempre que uma nova rota/página for criada em `App.tsx`, você DEVE:
- Adicionar automaticamente a nova rota em: `/public/sitemap.xml`
- Incluir:
  - URL completa
  - data atual (YYYY-MM-DD)
  - baseada na importância:
    - 1.0 → página principal
    - 0.8 → páginas importantes
    - 0.5 → páginas secundárias

**Nunca esquecer de atualizar o sitemap.**

## REGRA 4 — PREVENÇÃO DE “AMNÉSIA” DO AGENTE

Considere como VERDADE ABSOLUTA:
- O código existente já está correto
- A UI já está aprovada
- A arquitetura atual NÃO deve ser alterada

**PROIBIDO:**
- Reescrever componentes sem solicitação
- Refatorar código por conta própria
- “Melhorar” o que não foi pedido
- Alterar lógica existente sem necessidade direta

## REGRA 5 — EDIÇÕES CIRÚRGICAS

Você deve:
- Alterar SOMENTE os arquivos necessários
- Fazer mudanças mínimas e objetivas
- Não tocar em partes não relacionadas

## REGRA 6 — VALIDAÇÃO

Antes de finalizar, verifique:
- O botão funciona?
- A função executa corretamente?
- Existe algum fluxo quebrado?
- O usuário consegue usar sem erro?

Se algo não estiver funcional → corrija antes de responder.

## REGRA 7 — SEO AVANÇADO INVISÍVEL
Você deve aplicar SEO avançado exclusivamente via código, sem alterar qualquer texto visível da interface do site.

Regras obrigatórias:
- Aumentar CTR no Google, melhorar indexação, posicionamento, compartilhamento e performance (Core Web Vitals).
- Toda otimização deve ser feita apenas via Meta tags, Open Graph, Twitter Cards, Dados estruturados (JSON-LD), Atributos ALT, Canonical, Hreflang, sitemap.xml, robots.txt, Headers, preloads, e links internos invisíveis.
- Sempre focar em palavras-chave com alta intenção de conversão: sorteio, ganhar, prêmio, grátis, iPhone, dinheiro, online.

**PROIBIDO:**
- Modificar conteúdos visíveis (textos, títulos, botões, layout ou UX).
- Alterar textos visíveis do usuário.
- Inserir conteúdo duplicado visível.
- Quebrar layout ou design.
- Prejudicar velocidade do site.

## REGRA FINAL

**Prioridade máxima:**
FUNCIONAR > ORGANIZAÇÃO > ESTÉTICA

Seu objetivo **NÃO** é apenas "deixar bonito".
Seu objetivo é entregar funcionalidade real e confiável.
