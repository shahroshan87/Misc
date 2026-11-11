# Home Offer Solutions site — agent rules

Astro 7 static site for a DFW cash home buyer. Plan: `docs/00-master-plan.md`.

## Non-negotiables
- **Never invent facts.** No fake reviews, deals, numbers, stats, or "local knowledge". Every fact has a source (`owner`, `public-record`, `research` + URL/date).
- **Never publish the owner's home address** anywhere (site, schema, repo). Business schema uses city/region only.
- **No wholesaling/assignment language** on the site (owner decision).
- **No self-serving review-star schema**, no FAQPage/HowTo markup, no per-city LocalBusiness.
- City pages publish only with proof score ≥3 and must pass the uniqueness gate. Never build city×situation page matrices.
- `npm run build` (astro check + build + gates) must pass before any commit.
- Nothing goes live without the owner replying "APPROVE" on a preview.
- Never commit lead data, secrets, or PII.

## Layout
- `src/content/*` — collections (schemas in `src/content.config.ts`)
- `src/data/business.ts` — single source of truth for name/phone/hours
- `scripts/` — build quality gates
- `docs/` — strategy, research, owner guides. Current status: `docs/07-status-2026-11.md`
