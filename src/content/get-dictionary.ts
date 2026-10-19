import "server-only";
import type { Dictionary, Locale } from "./types";
import en from "./dictionaries/en";
import fr from "./dictionaries/fr";
import ar from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = { en, fr, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
