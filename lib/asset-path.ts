export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** Prefix public asset paths for GitHub Pages subpath deployments. */
export function assetPath(path: string): string {
  if (!path) return path
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${basePath}${normalized}`
}
