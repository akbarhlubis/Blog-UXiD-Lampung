import { slugify, withBase } from "./url";

export type EventFeedSource = Record<string, unknown>;

export type NormalizedEventItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  pubDate: string;
  pubDateSort: number;
  url: string;
  isExternal: boolean;
};

const DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

function asObject(value: unknown): EventFeedSource {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as EventFeedSource)
    : {};
}

function firstString(source: EventFeedSource, keys: string[]): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return "";
}

function parseDateInfo(value: string): { label: string; sort: number } {
  if (!value) {
    return { label: "", sort: 0 };
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return {
      label: DATE_FORMATTER.format(parsed),
      sort: parsed.getTime(),
    };
  }

  return { label: value, sort: 0 };
}

function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value) || value.startsWith("//");
}

function normalizeUrl(value: string, fallbackPath: string): string {
  if (value && (isExternalUrl(value) || value.startsWith("/"))) {
    return value;
  }

  if (value) {
    return withBase(value);
  }

  return fallbackPath;
}

function extractRecords(payload: unknown): EventFeedSource[] {
  if (Array.isArray(payload)) {
    return payload.map(asObject);
  }

  const source = asObject(payload);
  const candidates = [
    source.items,
    source.data,
    source.results,
    source.events,
    source.records,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate.map(asObject);
    }
  }

  return [];
}

export function normalizeEventFeed(
  payload: unknown,
  baseUrl = import.meta.env.BASE_URL,
): NormalizedEventItem[] {
  return extractRecords(payload).map((raw, index) => {
    const title = firstString(raw, ["title", "name", "eventTitle"]);
    const category = firstString(raw, ["category", "type", "tag"]) || "Event";
    const description = firstString(raw, ["description", "summary", "excerpt"]);
    const image = firstString(raw, ["image", "cover", "thumbnail", "poster"]);
    const pubDateRaw = firstString(raw, [
      "pubDate",
      "date",
      "eventDate",
      "publishedAt",
      "published_at",
    ]);
    const targetUrlRaw = firstString(raw, [
      "formLink",
      "url",
      "link",
      "detailUrl",
      "ctaUrl",
    ]);
    const slug = firstString(raw, ["slug", "id"]);
    const fallbackId = slugify(`${title || "event"}-${pubDateRaw || index + 1}`);
    const id = slugify(slug) || fallbackId;
    const pubDateInfo = parseDateInfo(pubDateRaw);
    const url = normalizeUrl(targetUrlRaw, withBase(`/events/${id}`, baseUrl));

    return {
      id,
      title: title || `Event ${index + 1}`,
      category,
      description,
      image: image || undefined,
      pubDate: pubDateInfo.label,
      pubDateSort: pubDateInfo.sort,
      url,
      isExternal: isExternalUrl(url),
    };
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderEventCardHtml(item: NormalizedEventItem): string {
  const title = escapeHtml(item.title);
  const category = escapeHtml(item.category);
  const pubDate = escapeHtml(item.pubDate);
  const description = item.description ? escapeHtml(item.description) : "";
  const href = escapeHtml(item.url);
  const image = item.image ? escapeHtml(item.image) : "";

  const media = image
    ? `<img alt="${title}" class="block h-56 w-full object-cover" src="${image}" loading="lazy" />`
    : `<div class="flex h-56 w-full items-center justify-center bg-gradient-to-br from-primary/15 via-white to-secondary/30 text-primary">
        <div class="text-center">
          <div class="text-xs uppercase tracking-[0.3em] text-primary/60">UXiD Lampung</div>
          <div class="mt-2 text-lg font-bold">${title}</div>
        </div>
      </div>`;

  return `
    <article class="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <a class="block" href="${href}">
        ${media}
      </a>
      <div class="flex flex-1 flex-col gap-3 p-4">
        <div class="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span class="rounded-full bg-primary/10 px-3 py-1 text-primary">${category}</span>
          <span>${pubDate}</span>
        </div>
        <h3 class="text-lg font-bold leading-snug text-slate-900">
          <a class="hover:text-primary" href="${href}">${title}</a>
        </h3>
        ${description ? `<p class="text-sm leading-6 text-slate-600">${description}</p>` : ""}
        <div class="mt-auto pt-2">
          <a class="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90" href="${href}">
            Lihat detail
          </a>
        </div>
      </div>
    </article>
  `;
}

