# @kcoh/localizations

🇺🇸 [English](./README.md) · 🇧🇷 Português

Arquivos de localização do jogo **Knights: Clash of Heroes (KCOH)**, remontados a partir dos arquivos recuperados do cache original do jogo.

> [!WARNING]
> **Esta localização está incompleta.** Só foi possível recuperar o idioma **Portuguese**, e algumas dezenas de chaves que o jogo referencia não existem no arquivo. Veja o [Status](#status) para saber exatamente o que está e o que não está coberto.

## Status

| Idioma       | Chaves | Situação                                                           |
| ------------ | ------ | ------------------------------------------------------------------ |
| `Portuguese` | 9.124  | Recuperado como estava no arquivo `lang` original. **Incompleto.** |
| outros idiomas (inglês, russo, alemão, ...) | 0 | **Não recuperados.** O cliente os suporta, mas o cache original só tinha o português. |

O que está incompleto no `Portuguese`:

- **57 chaves são referenciadas, mas não existem** no arquivo. Estão em [`missing-keys.json`](./missing-keys.json), com o local onde foram achadas (`db` = banco de dados do jogo, `client` = código decompilado do cliente). Muitas parecem obsoletas ou de depuração (`#BUILDING_TOWER_OLD_*`, `#UNIT_TEST`, `#UNIT_MEMO`), mas algumas são reais, como `#BUFF_MIND_CONTROL`, `#ITEM_CASHBOX`, `#UNIT_ARCMAGE` e `#SPELL_POWER_ACT`. O cliente mostra a chave crua quando ela falta.
- **3 entradas ainda têm texto em russo** que nunca foi traduzido: `#CASH_HELP_SPEEDUP` (uma marca gramatical russa, `[target|родит]`), `#MISSION_LEVEL_17_CQB_FRENZY_LOCALUNITS_1` e `#MISSION_LEVEL_26_POST_SCRIPTUM_LOCALUNITS_5`. Estão em [`untranslated-keys.json`](./untranslated-keys.json).
- **Nenhuma chave faltante foi inventada.** O arquivo só contém o que foi recuperado; as chaves faltantes ficam para os colaboradores, em vez de preenchidas com palpites.
- As chaves que o cliente monta em tempo de execução (por exemplo `#GW_ACTION_` + um nome) foram conferidas pelo prefixo, e todos esses prefixos têm chaves correspondentes no arquivo. Chaves individuais montadas em tempo de execução não dá para verificar só com os arquivos recuperados.

## Estrutura do repositório

- **`lang/Portuguese.json`**: a localização, na estrutura exata que o cliente lê: `{ "<Idioma>": { "<#CHAVE>": ["texto", "plural/texto alternativo"] } }`.
- **`missing-keys.json`**: chaves referenciadas pelo jogo, mas ausentes do arquivo.
- **`untranslated-keys.json`**: entradas que ainda têm texto sem tradução (russo).
- **`scripts/check.mjs`**: verificação básica (`npm run check`): todo valor é um array não vazio de strings não vazias, não há chaves duplicadas ignorando maiúsculas e minúsculas, e nada em `missing-keys.json` já está traduzido.

### Formato

- As chaves começam com `#` e o cliente as compara **sem diferenciar maiúsculas de minúsculas**.
- Cada valor é um array. O primeiro item é o usado por padrão; um segundo item (presente em ~1.150 chaves) é a forma alternativa, usada por exemplo para plurais e pelas regras de idioma.
- Os textos podem ter marcadores como `[name]`, `[strength]` ou `[dmg_buff]`, que o cliente substitui em tempo de execução. Mantenha-os intactos ao traduzir.

## Como o arquivo foi remontado

1. O manifesto do jogo lista um recurso `lang` (`lang_571a8ac6a65ce722d6094f10f9d2577b`). O arquivo estava no cache recuperado (um JSON comprimido com zlib) e foi extraído sem alterações.
2. Ele tem um único idioma, `Portuguese`, com 9.124 chaves.
3. Para medir o que falta, toda string `"#CHAVE"` foi coletada do banco de dados do jogo (`db`), das missões, do mapa e dos scripts decompilados do cliente, e comparada com o arquivo (sem diferenciar maiúsculas e minúsculas). Cores hexadecimais e ids internos que parecem chaves foram descartados.

O material de recuperação em si (cache, cliente decompilado, notas do protocolo) fica na pasta `recovery` do workspace principal, não neste repositório.

## Como contribuir

- Para traduzir uma chave faltante, adicione-a em `lang/Portuguese.json` e remova-a de `missing-keys.json`, depois rode `npm run check`.
- Para adicionar um novo idioma, crie `lang/<Idioma>.json` com a mesma estrutura e inclua o nome do idioma em `scripts/check.mjs`. O nome precisa ser igual ao que o servidor devolve em `get_launch_info.php` (`locale`).

## Aviso

Este projeto é um trabalho independente, sem afiliação com a Playkot. É **open-source** e **sem fins lucrativos**, criado por fãs para preservar um jogo que não existe mais. Os textos pertencem aos seus respectivos autores.
