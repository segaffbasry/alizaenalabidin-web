# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # start dev server on http://localhost:3000
npm run build      # production build (also catches type errors via next build)
npm run start      # start production server
npx tsc --noEmit   # type-check only, no emit
```

## Architecture

This is a **Next.js 16 App Router** project (TypeScript, Tailwind CSS v4) for Ali Zaenal Abidin's personal brand site — an Indonesian life transformation coach and bestselling author.

### Tailwind v4 conventions

Tailwind v4 uses a CSS-first config. All design tokens live in [`styles/tokens.css`](styles/tokens.css) inside an `@theme inline {}` block, which is imported by [`app/globals.css`](app/globals.css). There is **no** `tailwind.config.ts`. Custom colors and fonts defined in `@theme` become Tailwind utilities automatically (e.g. `bg-gold`, `text-muted`, `font-display`).

### Smooth scroll (Lenis + Framer Motion)

[`components/providers/lenis-provider.tsx`](components/providers/lenis-provider.tsx) instantiates Lenis on mount and drives it via `requestAnimationFrame`. It also updates a Framer Motion `useMotionValue` on every scroll tick, making native `useScroll` from Framer Motion reflect Lenis-driven scroll position. The lenis instance is exposed through context; import it via `hooks/use-lenis.ts`.

The provider is mounted in the root layout wrapping all page content. `html { scroll-behavior: auto }` is set explicitly to prevent browser smooth scroll from conflicting with Lenis.

### Provider stack (root layout)

```
ThemeProvider (next-themes, light only)
  └─ LenisProvider
       └─ {children}
```

`AnimatePresence` for page transitions should be added inside a client boundary component wrapping `{children}` if needed.

### Design tokens

| Token | Value |
|---|---|
| `--color-primary` | `#F5F0E8` — warm off-white, used as page background |
| `--color-accent` | `#1A1A1A` — deep charcoal, headings and default text |
| `--color-gold` | `#C8A96E` — warm gold, decorative accents |
| `--color-muted` | `#6B6560` — muted grey-brown, secondary text |
| `--font-display` | Playfair Display (Google Fonts, via `--font-playfair` CSS var) |
| `--font-body` | DM Sans (Google Fonts, via `--font-dm-sans` CSS var) |

Font CSS variables are injected by `next/font/google` in the root layout and referenced in `tokens.css`.

### Key directories

- `app/` — App Router pages and layouts
- `components/ui/` — unstyled-first primitives: `Button`, `Card`, `Badge`. Use `cn()` from `lib/utils` for variant composition.
- `components/providers/` — client-side context providers (Lenis)
- `hooks/` — custom React hooks (re-exports from providers)
- `lib/utils.ts` — `cn()` helper (`clsx` + `tailwind-merge`)
- `styles/tokens.css` — all design token definitions
