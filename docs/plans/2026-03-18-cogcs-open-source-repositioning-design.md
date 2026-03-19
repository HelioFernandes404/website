# Cogcs Open Source Repositioning Design

**Goal:** reposicionar o `Cogcs` no portfolio como projeto de estudo em transicao para open source, e nao como segundo emprego, SaaS ou produto comercial paralelo.

## Contexto

O repositorio ainda descrevia o `Cogcs` com sinais de produto: app, waitlist, website comercial e ate uma entrada em catalogo de tools. Isso conflita com a narrativa desejada para portfolio e com a leitura defendida nos artigos de referencia: problema real, escopo pequeno, impacto observado, aprendizado e documentacao publica.

## Direcao aprovada

Abordagem escolhida: case tecnico com abertura gradual para open source, mas com linguagem centrada em projeto de aprendizado.

Mensagem principal:

- `Cogcs` e um projeto de estudo em transicao para open source.
- Nasceu de uma dor real no processo de aprendizado.
- Serve para explorar repeticao espacada, features e decisoes de produto em publico.
- Nao deve parecer emprego paralelo, produto comercial ou SaaS.

## Mudancas de narrativa

- remover sinais de produto comercial como `waitlist`, `app`, `platform`, `primary application site`.
- trocar descricoes orientadas a negocio por descricoes de problema, escopo e aprendizado.
- adicionar dois CTAs:
  - acompanhamento da abertura no GitHub;
  - case study com problema, solucao, impacto e aprendizados.

## Superficies afetadas

- `apps/site`:
  - card da home;
  - pagina do projeto `Cogcs`;
  - novo case study;
  - suporte a CTA principal + CTA secundario no template de projetos.
- `apps/hub`:
  - pagina `Craft` para listar abertura no GitHub/case e remover linguagem de produto.
- `apps/tools`:
  - remover `Cogcs` do catalogo de tools para evitar classificacao errada.

## Assuncao

Nao existe repositorio publico do `Cogcs` no GitHub neste momento. Como fallback seguro, o CTA principal aponta para a busca do GitHub filtrada para o usuario `HelioFernandes404` e o termo `cogcs`, comunicando abertura gradual sem inventar uma URL falsa.
