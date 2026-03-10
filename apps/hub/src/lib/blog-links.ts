const WEBSITE_ORIGIN = "https://heliosuns404.com";

export const WEBSITE_BLOG_ROOT = new URL("/blog/", WEBSITE_ORIGIN).toString();

export function getWebsiteBlogUrl(slug?: string) {
  if (!slug) {
    return WEBSITE_BLOG_ROOT;
  }

  return new URL(`/blog/${slug}/`, WEBSITE_ORIGIN).toString();
}
