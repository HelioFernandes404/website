export const READING_THEME_STORAGE_KEY = "helio-blog-reading-theme";

const SUPPORTED_READING_THEME_PREFERENCES = new Set(["light", "dark", "system"]);

export function normalizeReadingThemePreference(value) {
  if (SUPPORTED_READING_THEME_PREFERENCES.has(value)) {
    return value;
  }

  return "system";
}

export function resolveReadingTheme(preference, systemPrefersDark) {
  const normalizedPreference = normalizeReadingThemePreference(preference);

  if (normalizedPreference === "system") {
    return systemPrefersDark ? "dark" : "light";
  }

  return normalizedPreference;
}

export function getShareUrl(canonicalUrl, currentUrl) {
  if (typeof canonicalUrl === "string" && canonicalUrl.trim().length > 0) {
    return canonicalUrl;
  }

  return currentUrl;
}
