import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { AVAILABLE_LOCALES, DEFAULT_LOCALE, isHomePath, localeFromPath, STORAGE_KEY } from "../utils/locale";

if (ExecutionEnvironment.canUseDOM) {
    const currentLocale = localeFromPath(location.pathname);
    const currentPath = location.pathname;
    let storedLocale: string | null = null;
    try {
        storedLocale = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        console.warn("Preferred locale could not be read from localStorage:", error);
    }

    if (storedLocale && AVAILABLE_LOCALES.has(storedLocale) && isHomePath(currentPath) && storedLocale !== currentLocale) {
        location.replace(storedLocale === DEFAULT_LOCALE ? "/" : `/${storedLocale}`);
    }
}
