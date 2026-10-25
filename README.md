# @kcoh/localizations

🇺🇸 English · 🇧🇷 [Português](./README.pt-br.md)

Localization files for the game **Knights: Clash of Heroes (KCOH)**, rebuilt from the files recovered from the original game cache.

> [!WARNING]
> **This localization is incomplete.** Only the **Portuguese** locale could be recovered, and a few dozen keys that the game references are missing. See [Status](#status) for exactly what is and is not covered.

## Status

| Locale       | Keys  | State                                                          |
| ------------ | ----- | -------------------------------------------------------------- |
| `Portuguese` | 9,124 | Recovered as-is from the original `lang` file. **Incomplete.** |
| other locales (English, Russian, German, ...) | 0 | **Not recovered.** The client supports them, but the original cache only had Portuguese. |

What is incomplete in `Portuguese`:

- **57 keys are referenced but absent** from the file. They are listed in [`missing-keys.json`](./missing-keys.json) with the place they were found (`db` = game database, `client` = decompiled client code). Many look obsolete or debug-only (`#BUILDING_TOWER_OLD_*`, `#UNIT_TEST`, `#UNIT_MEMO`), but some are real, such as `#BUFF_MIND_CONTROL`, `#ITEM_CASHBOX`, `#UNIT_ARCMAGE` and `#SPELL_POWER_ACT`. The client shows the raw key when one is missing.
- **3 entries still contain Russian text** that was never translated: `#CASH_HELP_SPEEDUP` (a Russian grammar tag, `[target|родит]`), `#MISSION_LEVEL_17_CQB_FRENZY_LOCALUNITS_1` and `#MISSION_LEVEL_26_POST_SCRIPTUM_LOCALUNITS_5`. They are listed in [`untranslated-keys.json`](./untranslated-keys.json).
- **No missing key was invented.** The file only contains what was recovered; the missing keys are left for contributors rather than filled with guesses.
- Keys that the client builds at runtime (for example `#GW_ACTION_` + a name) were checked by prefix, and every such prefix has matching keys in the file. Individual runtime-built keys cannot be verified from the recovered files alone.

## Repository structure

- **`lang/Portuguese.json`**: the localization, in the exact structure the client reads: `{ "<Locale>": { "<#KEY>": ["text", "plural/alternate text"] } }`.
- **`missing-keys.json`**: keys referenced by the game but absent from the file.
- **`untranslated-keys.json`**: entries that still contain untranslated (Russian) text.
- **`scripts/check.mjs`**: sanity check (`npm run check`): every value is a non-empty array of non-empty strings, there are no case-insensitive duplicate keys, and nothing in `missing-keys.json` is already translated.

### Format

- Keys start with `#` and are matched **case-insensitively** by the client.
- Each value is an array. The first item is used by default; a second item (present on ~1,150 keys) is the alternate form, used for example for plurals and by the language rules of the locale.
- Texts can contain placeholders such as `[name]`, `[strength]` or `[dmg_buff]`, which the client replaces at runtime. Keep them untouched when translating.

## How the file was rebuilt

1. The game manifest lists a `lang` resource (`lang_571a8ac6a65ce722d6094f10f9d2577b`). Its file was in the recovered cache (a zlib-compressed JSON) and was extracted as-is.
2. It contains a single locale, `Portuguese`, with 9,124 keys.
3. To measure what is missing, every `"#KEY"` string was collected from the game database (`db`), the quests, the map and the decompiled client scripts and compared with the file (case-insensitively). Hex colors and internal ids that look like keys were discarded.

The recovery material itself (cache, decompiled client, protocol notes) lives in the `recovery` folder of the main workspace, not in this repository.

## Contributing

- To translate a missing key, add it to `lang/Portuguese.json` and remove it from `missing-keys.json`, then run `npm run check`.
- To add a new locale, create `lang/<Locale>.json` with the same structure and add the locale name to `scripts/check.mjs`. The locale name must match what the server returns in `get_launch_info.php` (`locale`).

## Disclaimer

This project is an independent work and has no affiliation with Playkot. It is **open-source** and **not-for-profit**, created by fans to preserve a game that no longer exists. The texts belong to their respective authors.
