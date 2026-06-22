# UXiD Lampung

Website komunitas UXiD Lampung berbasis Astro.

## Ringkas

- Halaman utama, blog, dan about masih memakai struktur konten lokal Astro/markdown.
- Halaman event sudah disiapkan untuk menarik data runtime dari Google Script di browser.
- Jika endpoint Google Script belum diisi, halaman event akan memakai arsip lokal sebagai fallback aman.

## Konfigurasi Event Runtime

Set environment variable berikut saat ingin menyalakan data live:

```bash
PUBLIC_GOOGLE_SCRIPT_EVENTS_URL=https://script.google.com/macros/s/....../exec?sheet=event
```

### Bentuk payload yang didukung

Loader event menerima payload dalam salah satu bentuk berikut:

- Array langsung: `[{ ...event }]`
- Object dengan properti array: `{ items: [...] }`
- Object dengan properti array lain seperti `data`, `results`, `events`, atau `records`

### Field yang dikenali

- `title`
- `category`
- `description`
- `image`
- `pubDate`
- `url`
- `link`
- `formLink`
- `detailUrl`
- `ctaUrl`
- `slug`
- `id`

Field yang paling penting untuk tampilan event adalah `title`, `pubDate`, dan salah satu target URL.

## GitHub Pages

Repository ini disiapkan untuk deploy ke GitHub Pages.

- Base path Astro sudah diarahkan ke `/Blog-UXiD-Lampung`
- Site URL mengikuti `https://akbarhlubis.github.io/Blog-UXiD-Lampung`
- Build output yang dipublish adalah folder `dist/`

Jika kamu mengganti nama repo atau custom domain, update konfigurasi Astro sebelum deploy.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Struktur Utama

- `src/pages` - route Astro dan halaman konten
- `src/components` - komponen UI reusable
- `src/layouts` - layout halaman dan layout markdown
- `src/lib` - helper base URL, slug, dan event feed normalization
- `public` - asset statis untuk site

## Catatan Teknis

- Event runtime memakai fetch di browser, bukan server-side rendering.
- Layout markdown event dan blog sudah memakai slug TOC yang stabil.
- PWA lama sudah dibersihkan dari layout utama.
