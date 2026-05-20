# Controle financeiro familiar

Aplicativo local em HTML, CSS e JavaScript para organizar faturas de cartao, contas do mes e projecoes.

## Como usar

Abra `index.html` no navegador e suba as faturas em PDF, CSV ou Excel.

O app valida a importacao antes de salvar: se a soma dos itens lidos nao bater com o total oficial da fatura, nada e importado.

## Privacidade

Os dados ficam no armazenamento local do navegador. As faturas em PDF nao sao versionadas neste repositorio.

## Sincronizacao com Supabase

Projeto configurado para:

```text
https://wwqylztfvgjauiwxieii.supabase.co
```

Antes de usar no celular:

1. Abra o SQL Editor do Supabase.
2. Rode o conteudo de `supabase-schema.sql`.
3. Copie a `anon public key` em Project Settings > API.
4. Cole a chave em `SUPABASE_ANON_KEY` no arquivo `app.js`.
5. Publique novamente no GitHub Pages.

O app usa login por link de e-mail e Row Level Security. Cada usuario autenticado acessa apenas a propria linha na tabela `finance_states`.
