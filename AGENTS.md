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

## REGRA 7 — OTIMIZAR SEO COMPLETO

**OBJETIVO:**
Analisar automaticamente o conteúdo de cada página, identificar palavras-chave principais e otimizar totalmente o SEO para mecanismos de busca como Google e Bing (Microsoft Edge).

**REGRAS GERAIS:**

Analisar o conteúdo da página e identificar:
- Palavra-chave principal
- Palavras-chave secundárias
- Intenção de busca (informacional, comercial, comparação, dúvida)

Aplicar SEO VISÍVEL (sem prejudicar UX):
- Otimizar título (H1) com palavra-chave principal
- Garantir presença natural da palavra-chave no conteúdo
- Melhorar subtítulos (H2, H3) com variações de palavras-chave
- Ajustar densidade de palavras-chave sem exagero
- Melhorar legibilidade e escaneabilidade do conteúdo

Aplicar SEO INVISÍVEL (prioridade alta):
- Criar title otimizado com foco em CTR
- Criar meta description persuasiva
- Adicionar meta keywords relevantes
- Implementar Open Graph (Facebook/WhatsApp)
- Implementar Twitter Cards
- Adicionar canonical correto
- Configurar meta robots (index, follow)
- Inserir dados estruturados (JSON-LD) usando:
  - Article (todas páginas)
  - Review (quando aplicável)
  - Product (comparações/plataformas)
  - WebSite (global)
- Adicionar ALT em imagens com palavras-chave
- Criar linkagem interna (visível e invisível)
- Otimizar URLs (curtas, com hífen, minúsculas)
- Implementar sitemap.xml atualizado
- Configurar robots.txt corretamente

PERFORMANCE (impacto direto no ranking):
- Implementar lazy loading em imagens
- Preload e preconnect de recursos
- Reduzir scripts desnecessários
- Garantir carregamento rápido (Core Web Vitals)

INDEXAÇÃO:
- Garantir que todas as páginas estejam indexáveis
- Evitar conteúdo duplicado (usar canonical)
- Criar estrutura de links internos forte (cluster SEO)

ESTRATÉGIA DE PALAVRAS-CHAVE:
- Priorizar palavras com alta intenção de conversão (renda online, sorteio, ganhar, prêmio, grátis, iPhone, dinheiro, online)
- Criar variações long-tail automaticamente

BOAS PRÁTICAS:
- Não usar técnicas que possam gerar penalização
- Não exagerar em palavras-chave
- Não prejudicar experiência do usuário
- Garantir compatibilidade com SEO moderno (2025+)

RESULTADO ESPERADO:
Melhor posicionamento no Google e Bing, Maior taxa de cliques (CTR), Aumento de tráfego orgânico, Melhor indexação e rastreamento, Crescimento sustentável no ranking

Sempre aplicar otimizações de forma automática e contínua com base no conteúdo existente da página.

## REGRA 8 — PADRÃO VISUAL E DESIGN (OBRIGATÓRIO)

**OBJETIVO:**
Garantir que todas as páginas, componentes e layouts criados sigam estritamente a mesma identidade visual já estabelecida (padrão Premium Dark, estilo Apple/Microsoft).

**DIRETRIZES DE ESTILO:**
- **Fundo Global**: Preto sólido (`#000000` ou `bg-black`).
- **Texto**: Primário em `#f5f5f7` ou `text-white/90`. Secundário e descrições em `text-white/50`, `text-white/60` ou `text-white/40`.
- **Cards e Containers**: Fundo `#111` ou `bg-white/5`, bordas sutis `border-white/5` ou `border-white/10`, bordas muito arredondadas (`rounded-2xl`, `rounded-3xl`), sombras profundas (`shadow-2xl`).
- **Tipografia**: Clean, sem serifa (`font-sans`), com headings pesados (`font-bold`, `tracking-tight`, `tracking-tighter`). Textos de apoio devem ter boa legibilidade (ex: `leading-relaxed`).
- **Botões (CTAs)**: 
  - Primário Premium: Branco com texto preto (`bg-white text-black font-semibold rounded-full/xl`).
  - Destaque/Ação: Laranja (`bg-orange-500 hover:bg-orange-600 text-white`).
  - Secundários: Transparentes ou com fundo sutil (`bg-white/5 hover:bg-white/10`).
- **Efeitos de Glow / Atmosfera**: Uso de luzes de fundo muito desfocadas para destacar seções (ex: `bg-blue-600/20 blur-[120px]`, ou gradientes purpura/azul).
- **Animações (UX)**: Transições suaves usando `motion/react` (`opacity`, `scale`, `y`), efeitos de hover sutis (`whileHover={{ y: -10 }}` e `group-hover:scale-XXX`), `backdrop-blur` em modais e navbars.

Sempre que criar uma interface nova, aplique este visual automaticamente, copiando os padrões e as cores exatas descritas nas páginas originais.

## REGRA 9 — COMPONENTES DE MONETIZAÇÃO OBRIGATÓRIOS

**OBJETIVO:**
Garantir que os modelos de monetização nativos estejam presentes em todos os novos sorteios criados.

**DIRETRIZES:**
- Toda página de sorteio deve ter, ao final dela (logo antes da seção de urgência/cronômetro), o banner premium oferecendo o mesmo produto para comprar no Mercado Livre ("Não quer esperar o sorteio?").
- O visual do componente Mercado Livre (`MercadoLivreAdIphone`, `MercadoLivreAdMouse`, etc) já criado deve ser usado como componente padrão: fundo escuro (ex: `#050505`), com a caixa (#111 e glow amarelo p/ Mercado Livre), indicativo de valor do produto destacado, e botão amarelo do mercado livre (`#FEE600`).

## REGRA FINAL

**Prioridade máxima:**
FUNCIONAR > ORGANIZAÇÃO > ESTÉTICA

Seu objetivo **NÃO** é apenas "deixar bonito".
Seu objetivo é entregar funcionalidade real e confiável.
