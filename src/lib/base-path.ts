/**
 * The GitHub Pages preview is served under /merithyre-website/. next/link adds that
 * prefix automatically, but plain <img src> / raw HTML and next/image `src` do not.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string) {
  return basePath && path.startsWith("/") ? `${basePath}${path}` : path;
}

/** Prefix root-relative src/href attributes inside a trusted HTML string. */
export function withBaseHtml(html: string) {
  if (!basePath) return html;
  return html.replace(/(\s(?:src|href)=")\/(?!\/)/g, `$1${basePath}/`);
}
