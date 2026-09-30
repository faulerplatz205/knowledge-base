export const AVAILABLE_LOCALES = new Set([ "en", "de" ]);
export const DEFAULT_LOCALE = "en";
export const STORAGE_KEY = "preferred-locale";

export function localeFromPath(path: string): string {
    const locale = path.split("/")[1];
    return AVAILABLE_LOCALES.has(locale) ? locale : DEFAULT_LOCALE;
}

export function isHomePath(path: string): boolean {
    const segments = path.split("/").filter(Boolean);
    return segments.length === 0 || (segments.length === 1 && AVAILABLE_LOCALES.has(segments[0]));
}
