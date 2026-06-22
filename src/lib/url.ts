export function withBase(path: string, base = import.meta.env.BASE_URL): string {
  if (!path) {
    return base || "/";
  }

  if (/^https?:\/\//i.test(path) || path.startsWith("//")) {
    return path;
  }

  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!normalizedBase) {
    return normalizedPath;
  }

  if (normalizedBase === "/" && normalizedPath === "/") {
    return "/";
  }

  return `${normalizedBase}${normalizedPath}`;
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

