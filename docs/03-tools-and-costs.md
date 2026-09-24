# Tools & Costs

## No must-buy tools
Free tools plus DataForSEO (pay as you go, $50 deposit) cover about 95–99% of what Semrush or Ahrefs would give us.

| Need | Tool | Cost |
|---|---|---|
| Your own search data | Google Search Console (+ Generative AI report), Bing Webmaster Tools (+ AI Performance) | Free |
| Backlinks to your own site | Ahrefs Webmaster Tools | Free |
| Rankings, Maps grid, keywords, competitor links, AI mentions | DataForSEO API | $50 deposit; about $0.0006 per search result; backlinks are pay-as-you-go since Jul 2026 |
| Site crawl | Screaming Frog (free up to 500 URLs), Unlighthouse | Free |
| Speed | PageSpeed Insights / Lighthouse CI | Free |
| Behavior | Microsoft Clarity, GA4, Cloudflare Web Analytics | Free |
| Google Business Profile categories and audits | GMB Everywhere | Free tier |

## Stack
| Piece | Choice | Cost |
|---|---|---|
| Hosting | Cloudflare Workers static assets + D1 database + Turnstile | $0 |
| Lead emails | Resend | Free, 3,000 emails/mo |
| Lead tracker | Google Sheet | $0 |
| Push alerts | Pushover | ~$5 one-time |

Hosting to avoid:
- **Vercel Hobby:** commercial use is not allowed.
- **GitHub Pages:** not allowed for business use.

## Tier 1 vs Tier 2
Both tiers use the same website. They differ only in add-ons.

| Item | Tier 1 | Tier 2 |
|---|---|---|
| SEO data | DataForSEO $50 one-time | ~$10–20/mo usage |
| Email | Existing Gmail | Google Workspace $7–8.40/mo |
| Phone | Your cell (check it isn't a Carrot tracking number) | Quo $15–19/mo + texting registration (~$20 one-time, ~$2–10/mo) |
| Citations | Manual free listings | Whitespark $199 one-time |
| Local links | Free outreach | Chamber + sponsorships, ~$50–100/mo |
| PO Box (outreach mailing address; keeps your home private) | ~$80–150 per 6 months | same |
| **Monthly** | **≈ $0–5 + PO Box** | **≈ $85–150 + PO Box** |
| **One-time** | **≈ $55** | **≈ $275–300** |

**Tier 3 add-ons (optional):**
- CallRail $50/mo
- REsimpli / GoHighLevel CRM $97–149/mo
- BBB accreditation ~$400–1,200/yr
- Ahrefs Lite $129 for one month
- A real staffed office

**Carrot, for comparison:** $84–199/mo.

## Repos
- `withastro/astro` 7.3.5
- `google/schema-dts`
- `harlan-zw/unlighthouse`
- `every-app/open-seo` (optional self-hosted dashboard)
- `dataforseo/mcp-server-typescript` (optional)

**Avoid:** `cnych/seo-mcp`. It scrapes Ahrefs through a captcha solver, which risks breaking terms of service.
