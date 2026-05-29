import { NewsletterForm } from "@/components/layout/newsletter-form";
import { FooterNavLink } from "@/components/layout/footer-nav-link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Ali", href: "/about" },
  { label: "Revisi Hidup", href: "/revisi-hidup" },
  { label: "Mindful Manifestation", href: "/mindful-manifestation" },
  { label: "Products", href: "/products" },
  { label: "Login", href: "/login" },
  { label: "Chat With Ali", href: "/tanya" },
];

function InstagramIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8.1-3.3 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2zM8.3 18.3H5.6V9.7h2.7v8.6zM6.95 8.6a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12zm11.35 9.7h-2.7v-4.2c0-1-.02-2.3-1.4-2.3-1.4 0-1.62 1.1-1.62 2.22v4.28H9.88V9.7h2.6v1.17h.04a2.85 2.85 0 0 1 2.57-1.41c2.75 0 3.26 1.81 3.26 4.16v4.68z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="flex justify-center px-4 md:px-8" style={{ background: "linear-gradient(to bottom, #f9faf7, #ffffff)", paddingTop: 20, paddingBottom: 20 }}>
      {/* Rounded card — max-width 1200px, padding 40px, border-radius 24px (from Framer) */}
      <div
        className="relative w-full"
        style={{
          maxWidth: "1200px",
          borderRadius: "24px",
          minHeight: "640px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/footer bg.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Copyright bar */}
        <div className="relative w-full">
          <p style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 400, fontSize: 14, color: "#555" }}>
            Copyright © {new Date().getFullYear()} – All Right Reserved
          </p>
        </div>

        {/* Main grid — 1 col mobile, 2 col md, 3 col lg */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-0 items-center">
          {/* Col 1 — newsletter form */}
          <div>
            <h3
              className="mb-6"
              style={{ fontFamily: "'Work Sans', 'Work Sans Placeholder', sans-serif", fontWeight: 600, fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.2, color: "rgb(0,0,0)" }}
            >
              Get notified<br />for Ali&apos;s update
            </h3>
            <NewsletterForm />
          </div>

          {/* Col 2 — empty spacer (hidden on mobile/tablet) */}
          <div className="hidden lg:block" />

          {/* Col 3 — quote */}
          <div className="flex flex-col justify-center">
            <blockquote
              className="uppercase mb-6"
              style={{ fontFamily: "Inter, 'Inter Placeholder', sans-serif", fontWeight: 700, fontSize: "clamp(14px, 1.8vw, 20px)", lineHeight: "1.5", color: "rgb(51,51,51)" }}
            >
              &ldquo;It&apos;s more important to live a life that you understand though others don&apos;t,
              <br /><br />
              than a life that others understand but you don&apos;t.&rdquo;
            </blockquote>
            <p
              style={{
                fontFamily: "var(--font-inspiration), cursive",
                fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: "58px",
                color: "rgb(51,51,51)",
                textAlign: "right",
              }}
            >
              Ali Zaenal Abidin
            </p>
          </div>
        </div>

        {/* Bottom — nav + socials */}
        <div className="relative w-full pt-5 flex flex-col gap-3">
          {/* Nav links — wrap on mobile, right-align on desktop */}
          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <FooterNavLink
                key={href}
                href={href}
                style={{ fontFamily: "'General Sans', 'General Sans Placeholder', sans-serif", fontWeight: 500, fontSize: "clamp(13px, 2vw, 18px)", lineHeight: "22px", color: "rgb(38,38,38)" }}
                className="hover:opacity-70 transition-opacity"
              >
                {label}
              </FooterNavLink>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center justify-center md:justify-end gap-4 md:gap-5" style={{ color: "rgb(51,51,51)" }}>
            <a href="https://www.instagram.com/alizaenalabidin/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity"><InstagramIcon /></a>
            <a href="https://www.linkedin.com/in/aliabidin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity"><LinkedInIcon /></a>
            <a href="https://www.youtube.com/@AliZaenalAbidin" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-70 transition-opacity"><YouTubeIcon /></a>
            <a href="https://www.tiktok.com/@aliabidin.official" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-70 transition-opacity"><TikTokIcon /></a>
            <a href="https://x.com/insightali?lang=en" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:opacity-70 transition-opacity"><XIcon /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
