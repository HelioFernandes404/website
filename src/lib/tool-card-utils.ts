export function getToolHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

export function getFaviconUrl(url: string): string | null {
  const hostname = getToolHostname(url);

  if (!hostname) {
    return null;
  }

  return `https://www.google.com/s2/favicons?sz=64&domain_url=${hostname}`;
}
