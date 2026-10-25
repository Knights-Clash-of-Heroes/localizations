import { readFileSync } from "node:fs"

const read = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), "utf-8"))

const locales = ["Portuguese"]
const missing = read("missing-keys.json").keys
const errors = []

for (const locale of locales) {
    const entries = read(`lang/${locale}.json`)[locale]
    const seen = new Set()

    for (const [key, values] of Object.entries(entries)) {
        const lower = key.toLowerCase()

        if (seen.has(lower)) errors.push(`${locale}: duplicate key (case-insensitive) ${key}`)
        seen.add(lower)

        if (!Array.isArray(values) || values.length === 0 || values.some((value) => typeof value !== "string" || !value.trim())) {
            errors.push(`${locale}: ${key} must be a non-empty array of non-empty strings`)
        }
    }

    for (const key of Object.keys(missing)) {
        if (seen.has(key.toLowerCase())) errors.push(`${locale}: ${key} is now translated, remove it from missing-keys.json`)
    }

    console.log(`${locale}: ${seen.size} keys, ${Object.keys(missing).length} still missing`)
}

if (errors.length > 0) {
    console.error(errors.join("\n"))
    process.exit(1)
}
