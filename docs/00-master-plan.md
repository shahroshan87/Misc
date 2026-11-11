# Plan: Home Offer Solutions, the #1 "Sell My House Fast" site in DFW

> **Status and re-check (2026-11-11):** see [`07-status-2026-11.md`](07-status-2026-11.md) for where the build stands, verified domain facts, and what changed in search since this plan was written. Where the two disagree, the status page is newer.

## Context
You buy houses for cash in Dallas–Fort Worth. You want a lead-gen site that ranks in three places:
- Google organic results
- the Google Maps "3-pack"
- AI answers: Google AI Overviews and AI Mode, ChatGPT, Perplexity and Gemini

You want pages for the major DFW cities, minimal cost, and a mostly hands-off backlink system later. The repo `shahroshan87/Misc` is empty, so this is a new build on branch `claude/gracious-feynman-jha6yi`.

This plan is based on four research passes:
- DFW competitors: 43 searches across 33 cities
- Google and AI-search changes in 2025–2026
- tools, costs and GitHub repos
- a senior-architect review of the build design

**Decisions locked from your answers:**
| Topic | Decision |
|---|---|
| Business model | You buy the houses yourself. The site doesn't mention wholesaling or assignment. |
| Brand and domain | **Home Offer Solutions**, on `homeoffersolutions.com`. It is yours: registered 2020-08-20 at Squarespace Domains, renewed through **2027-08-20** (Verisign RDAP, checked 2026-11-11). `www` still points at **Carrot**, but Carrot no longer serves the site, so the old site is down. We keep the domain: an aged, brandable domain beats a new one. |
| Google Maps listing | Service-area business using your DFW home address. **The address stays hidden everywhere**: not on the site, not in the code, not on directories. |
| Texas real estate license | None. So no TREC footer, and we never use the "Real estate agent" category. |
| Proof you have | Past deals, seller reviews, and people willing to be on camera. **This is your biggest weapon.** |
| Spanish | Yes. Spanish pages in wave 2. I found no DFW competitor with Spanish pages. |
| Attorney review | Skipped at your request. We'll use standard, widely used consent wording instead. |
| Cost tier | You decide after the Tier 1 vs Tier 2 breakdown in section 5. **The build is identical for either tier**, so the choice doesn't hold anything up. |

---

## 1. How we win, in plain English
Google and AI engines in 2026 reward **real businesses with real proof** and punish **copy-paste city pages**. Google ran four spam updates in 2026: March, June, August and September–October. Google named no target for any of them. Practitioner case studies of the August update ([GSQi](https://www.gsqi.com/marketing-blog/august-2026-google-spam-update-case-studies/)) describe programmatic and scaled content being hit, and practitioners reported templated city and county pages among the sites hit in September. **Almost every DFW competitor's city pages fit that description.**

We beat them with four things:
1. **Proof on every page:** your real deals, photos, reviews and faces.
2. **City pages built from real local knowledge:** neighborhoods you've bought in, the age of the housing there, local code and rental rules, local stats with the source named, and your deals in that city.
3. **Transparency nobody else offers:**
   - how we calculate offers, with worked examples
   - a "cash offer vs. listing with an agent" net-proceeds calculator

   Price and cost questions are where AI answers show up most, and no local competitor answers them.
4. **A very fast site:** loads in under 1 second, so humans and AI crawlers read all of it.

Then we build trust signals **off** the site, because those are what AI engines read:
- your Google Business Profile, with steady reviews
- Bing, Apple and Yelp listings, plus BBB, Nextdoor and Facebook
- spots on "best cash home buyers in Dallas" lists
- local links from chambers, sponsorships and attorneys
- DFW data stories pitched to local news

---

## 2. Competitor analysis (DFW)
**Caveat:** your cloud environment's network settings blocked me from opening competitor sites directly (e.g. ninebp.com, legacybuyers.com, cashfortxhousesnow.com, houzeo.com). This section is built from search results. Form details, review counts and the live Maps results still need a hands-on check; see section 10 for how to allow that.

| Competitor | Strength | What they do well | Weakness we exploit |
|---|---|---|---|
| **cashfortxhousesnow.com** (Jamie Buys Houses) | Widest reach, ~27 of 33 cities | Covers small suburbs too | Every city page is the same template with the name swapped. Not on any "best of" list. |
| **ninebp.com** (Ninebird) | **Strongest on "Dallas" searches** | Specific promises: offer in 24h, close in 7 days; has county pages | 4 URL styles, so its own pages compete with each other. "Dallas Forth Worth" typo. |
| **legacybuyers.com** (Legacy Home Buyers) | High | Cleanest structure. AI answers quote its line "most trusted cash buyer in DFW since 2016" | Vague "helped hundreds". Weak in Tarrant County. |
| **cashhousebuyersdfw.com** | High | Its **BBB profile ranks #1** for "cash home buyers DFW" | Templated. Address looks like a shared suite. |
| **selltohomepros.com** (Home Pros) | Strong in AI answers | Publishes its own "Top 10 Cash Buyers Dallas 2026" list with itself at #1, and AI engines repeat it | Self-serving; that could be challenged. |
| southernhills, beva, loveinvestors, texassellmyhouse, brightbid, risedfw, **macdoesrei** (most transparent: shows comps and repair estimates), metroplexhousebuyers, sellmydallashousefast | Medium | "24h offer, 7-day close" | Templates, emoji titles, duplicate URLs, http errors, one page with an unfilled "[Weatherford]" title |
| Opendoor, Offerpad, HomeGo, HomeVestors, sellmyhousefast.com | Strong in big cities | Opendoor's city pages show **real local market data** | Not local, no personal story |
| Clever, HomeLight, Houzeo, RealEstateBees, HelloReeve, iBuyer.com, Bankrate | Hold 3–5 of the top 9 spots in big cities | **These are what AI engines cite** for "best cash buyers" | They list national and Texas-wide firms, not the local sites that rank |

**Baseline we must match:** cash offer in 24h, close in 7 days, sell as-is, no fees or commissions, we pay closing costs, you pick the date, form plus a local phone number.

**Gaps we exploit:**
1. **No local investor shows local data, neighborhoods or ZIP codes.** Ours will.
2. **No one shows offer math.** Directories tell sellers cash buyers pay "30–70% of value", which scares them. We publish a formula, examples and a calculator.
3. **Proof is vague.** Ours will be quotable: "Bought N DFW houses since YYYY · median close X days · 4.9★ from N Google reviews · we close with [named title companies]". AI engines lift exactly that kind of line.
4. **No one covers DFW-specific problems.** We will: foundation damage from clay soil, hail and roof damage, old cast-iron plumbing.
5. **The 2026 soft market.** Mesquite homes sit 85–111 days; in Forney and Rockwall more than 55% of listings have price cuts. **No one targets "my listing expired / my house won't sell."** We will.
6. **No Spanish pages.** We add them.
7. **Local buyers are missing from third-party "best" lists.** We get on them: Clever, HomeLight, Houzeo, RealEstateBees, HelloReeve, CashHomeBuyersCrew, iBuyer.com, BBB, Yelp and Zillow.
8. **Technical sloppiness is everywhere.** We have one clean URL style and automated quality checks.

**City difficulty:**
- **Easiest:** Little Elm, Prosper, Midlothian, Wylie, Cedar Hill, Waxahachie, Euless, Grapevine, Weatherford, Cleburne, and the outer counties (Ellis, Johnson, Parker, Kaufman).
- **Moderate:** Mesquite, Carrollton, Richardson, Lewisville, Allen, Mansfield, Keller, North Richland Hills, Rockwall, Lancaster, DeSoto, Burleson, Forney.
- **Hardest:** Dallas, Fort Worth, Plano, Frisco, Arlington, McKinney, Irving, Garland, Denton, Grand Prairie.

---

## 3. 2026 ranking rules

**Do:**
1. **Clean Google Business Profile**
   - Real name only. Keyword-stuffed names like "We Buy Houses Dallas Fast" were the #1 trigger in the April–May 2026 suspension wave.
   - Service-area setup.
   - Verify with one continuous phone video.
   - Pick the closest real category by checking what the top 3 map competitors use (free GMB Everywhere tool).
2. **Reviews after every closing**
   - No incentives, and don't filter out unhappy sellers.
   - As of April 2026, don't ask sellers to name a staff member.
   - Rankings jump around 10 reviews. After that, recent reviews with detailed text matter most.
3. **Dallas and Fort Worth are the deepest pages.** Other cities launch in waves, and only with real proof.
4. **Texas-specific situation guides:** foreclosure (41-day timeline, first-Tuesday auctions), probate/inherited, divorce, tenants, taxes, foundation.
5. **Answer cost questions openly:** offer formula, calculator, real numbers.
6. **E-E-A-T, meaning real trust signals:** named owner and team, real photos, the Texas entity, title companies, and case studies with seller permission.
7. **Be where AI engines look:**
   - Bing Places, Apple Business Connect, Yelp, BBB, Facebook, Nextdoor, Foursquare
   - "Best of" lists
   - YouTube
   - Reddit (genuine help only)
8. **Technically clean**
   - Static HTML: AI crawlers don't run JavaScript.
   - Fast.
   - Correct schema (Organization, LocalBusiness with areaServed, Service, BreadcrumbList, Person, VideoObject).
   - Bing IndexNow.
   - **Make sure Cloudflare isn't blocking AI crawlers.** Its default settings may block them on new domains.
9. **Local links:** chambers, sponsorships, referral partners, DFW data stories.
10. **Quarterly refresh:** new case studies, updated stats, honest "updated" dates.

**Don't (penalty or suspension risk):**
- City-swapped templates or AI bulk-written city pages.
- A city × situation page grid.
- A separate site or exact-match domain per city.
- Expired-domain tricks, or bought links and link networks (PBNs).
- More than one Google Business Profile, a virtual office, a stuffed name, or rapid edits.
- Fake, paid or filtered reviews.
- Review-star schema on your own site.
- Expecting llms.txt or "AI chunking" to help. [Google said in May 2026 they aren't needed](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing).

**Realistic timeline:**
| What | When |
|---|---|
| Map pack near your home base | 1–3 months |
| Easy-city and long-tail searches | 2–4 months |
| Dallas and Fort Worth head terms | 6–12+ months (Carrot's data: 4–12 months) |

---

## 4. Site structure

| Section | URL | At launch |
|---|---|---|
| Home (DFW) | `/` | 1 |
| Areas hub | `/we-buy-houses/` | 1 |
| County pages | `/we-buy-houses/tarrant-county/` | 4: Dallas, Tarrant, Collin, Denton |
| City pages | `/we-buy-houses/dallas-tx/` | Dallas, Fort Worth, and any city scoring 3+ on proof |
| Situation pages | `/sell-house/foreclosure/` … | 7 |
| How it works, How we calculate offers, Cash vs. listing calculator, Reviews, About, Contact | `/how-it-works/`, etc. | 6 |
| Houses we bought (case studies) | `/houses-we-bought/<slug>/` | whatever you send |
| Texas guides | `/guides/<slug>/` | 2–3 |
| Get offer, Thank you (hidden from Google) | `/get-offer/`, `/thank-you/` | 2 |
| Legal | `/privacy/`, `/terms/`, `/sms-terms/` | 3 |
| Spanish | `/es/…` | Wave 2 |

**Launch size: about 25–30 real pages.** We don't pad it out.

**What goes where:**
- **County pages** hold the county-level facts: probate courts, the appraisal district (DCAD, TAD, CCAD, Denton CAD), the county clerk, and foreclosure auction location and schedule. They also mention the smaller towns in that county.
- **City pages** carry city-level, first-hand material:
  - neighborhoods with your notes
  - housing age and common problems
  - city code and rental rules
  - local market stats with source and date
  - your deals and testimonials there
  - a local video
  - nearby cities
  - a "listed but not selling?" section
- **Cities that span several counties** (Dallas spans 5, Fort Worth 5, Grand Prairie 3) are handled correctly.

**Situation pages at launch (7):**
- foreclosure
- inherited/probate
- as-is/major repairs (covers foundation and hail damage)
- landlord with tenants
- divorce
- behind on property taxes
- **listing expired / house won't sell**

**Wave 2 situations:** code violations/liens, relocation, fire damage, hoarder house, vacant house, mobile home or land.

**The proof rule (enforced automatically by the build):** a city page can only go live with a **proof score of 3 or more**. You earn one point for each of these:
- a deal in that city
- a review from that city
- a local video
- 250+ words of your own notes
- 3+ of your photos
- 2+ neighborhoods with your notes

Any city page over about 25% similar to another city page is blocked before it can publish.

**City rollout:**
- **Wave 1 (launch):** Dallas and Fort Worth, every city where you've closed deals, and nearby easy-win cities that reach proof 3+.
- **Wave 2 (months 2–4):** Arlington, Garland, Irving, Grand Prairie, Mesquite, Lancaster, DeSoto, Duncanville, Haltom City, North Richland Hills, Mansfield, Burleson, Forney, Rockwall; outer county pages; **Spanish versions** of home, how it works, the top situation pages, and Dallas and Fort Worth.
- **Wave 3 (months 4–8):** Plano, McKinney, Frisco, Denton, Carrollton, Richardson, Lewisville, Allen, Keller, Little Elm, Prosper, Weatherford, Cleburne, and more.
- **Each wave waits** until Google shows the last one indexed.

---

## 5. Cost breakdown: Tier 1 vs. Tier 2

The website, hosting, lead form, quality checks and strategy are **the same in both tiers**, and hosting is $0. The tiers only differ in add-ons. Your Claude plan, which you already have, covers building, content drafts and the automation robots.

| Item | **Tier 1: Bootstrap** | **Tier 2: Smart Growth** | What Tier 2 gets you |
|---|---|---|---|
| Domain | Keep homeoffersolutions.com (~$11–20/yr) | same | — |
| Hosting, lead form, anti-spam, lead database | Cloudflare free: **$0** | same | — |
| Lead email alerts | Resend free: $0 | same | — |
| Lead tracker | Google Sheet: $0 | same | — |
| Instant phone alert for new leads | Pushover **$5 one-time** | same | — |
| Mailing address for outreach emails (keeps your home address private; the law requires one) | USPS PO Box, ~$80–150 per 6 months (varies by post office) | same | — |
| SEO data: rankings, Maps grid, AI mentions, competitor links | DataForSEO **$50 deposit, lasts months** | ~$10–20/mo usage | Weekly Maps "grid" tracking across your area, plus monthly checks of whether ChatGPT and Google AI mention you |
| Business email | Your existing Gmail: $0 | **Google Workspace, $7–8.40/mo** | you@homeoffersolutions.com. Link outreach gets far more replies, sellers trust it more, and every tool sits under one business Google account. |
| Business phone | Your cell: $0. **Check first** that the number on the old site isn't a Carrot tracking number, which dies when Carrot is cancelled. | **Quo (formerly OpenPhone), $15–19/mo**, plus texting registration (~$20 one-time, ~$2–10/mo) | A dedicated business line and textable number, the same everywhere online. Legally registered texting lets you text leads back fast, the #1 factor in converting a lead to a deal. Includes call recording and a shared inbox. |
| Directory listings (citations) | You or I submit the free ones by hand (~25 sites) | **Whitespark, $199 one-time** | A pro service puts you on 30–50+ directories and the 3 big data aggregators you can't reach for free, with every detail identical. Saves you ~10 hours and feeds the data AI engines use. |
| Local links | Free only: journalist-request sites, partner outreach | **~$50–100/mo average:** 1–2 chamber memberships plus a few youth-sports or school sponsorships | Real local backlinks, the strongest link type for local rankings. They also build trust and referrals. |
| **Monthly** | **≈ $0–5** (plus PO Box ≈ $15–25) | **≈ $85–150** (plus PO Box) | |
| **One-time** | **≈ $55** | **≈ $275–300** | |

**My recommendation: Tier 2.** The ~$100/month difference buys the four things that most directly speed up rankings and turn leads into deals: pro email, a textable business line, pro listings, and local links. If you want to start at Tier 1 anyway, the natural order to upgrade is:
1. Quo phone, before launch
2. Whitespark listings, in month 1
3. Workspace email, when outreach starts in month 2
4. Sponsorships, from month 2 on

**Tier 3 add-ons, only when the data says so:**
| Add-on | Cost | When it's worth it |
|---|---|---|
| CallRail | $50/mo | Shows which page or city each call came from |
| Investor CRM with auto-texting (REsimpli or GoHighLevel) | $97–149/mo | Once you pass ~30 leads a month |
| BBB accreditation | ~$400–1,200/yr | Its profile page ranks and AI engines cite it |
| Ahrefs Lite | $129, for one month only | A deep competitor audit |
| A real staffed DFW office | varies | Lets you show an address on Maps, which ranks better than a hidden one |

**Optional in any tier:** a Google Ads test at $1,500–3,000/mo while SEO matures. DFW seller clicks cost about $20–100+ each, and leads about $150–400+.

---

## 6. Research tools: nothing is a must-buy
You do **not** need Semrush ($139+/mo) or Ahrefs ($129+/mo). This free stack plus DataForSEO covers about 95–99% of what they'd give you:
- **Free tools:**
  - Google Search Console, including its new "Generative AI" report
  - Bing Webmaster Tools, including its free AI-citation report
  - Ahrefs Webmaster Tools (free for your own site)
  - Google Keyword Planner, PageSpeed Insights, Screaming Frog free (our site stays under its 500-page limit), Rich Results Test
  - GMB Everywhere free tier
  - Microsoft Clarity
- **DataForSEO**, pay-as-you-go:
  - Live Google results, keyword volumes, Maps grid rankings, competitor backlinks (no monthly minimum since July 2026), and AI-mention checks.
  - It replaces Semrush, Ahrefs, Local Falcon and Otterly for our needs.
- **Repos I'll use or borrow patterns from:**
  - `withastro/astro` v7.3.5 (the site framework)
  - `google/schema-dts` (schema)
  - `harlan-zw/unlighthouse` or Lighthouse CI (speed audits)
  - `every-app/open-seo` (20.8k stars, Sep 2026) as an optional self-hosted SEO dashboard
  - `AgriciDaniel/claude-seo` and `coreyhaines31/marketingskills` as checklists and reference
  - The official `dataforseo/mcp-server-typescript` is optional
- **Avoid:**
  - scraper tools that break Ahrefs' or Google's terms, e.g. `cnych/seo-mcp`
  - piling on unvetted community MCP plug-ins that would hold your passwords and keys

---

## 7. Backlinks and the outreach robot (starts about month 2)

**Link plan:**
| When | What |
|---|---|
| Month 1 | Listings: Google Business Profile, Bing, Apple, Yelp, Facebook, Nextdoor, BBB profile, Foursquare, plus the aggregators through Whitespark (Tier 2). The address is hidden wherever the site allows. |
| Months 2–6 | Relationship links: chambers, sponsorships, referral partners (probate, estate and divorce attorneys, CPAs, estate-sale companies, property managers, title companies), podcast guest spots, and journalist requests (Qwoted, Featured.com, Source of Sources) with you quoted as the DFW expert |
| Months 4–12 | Data PR: a monthly **"DFW Foreclosure Report"** built from public county postings; "Foundation repair costs by DFW city"; "Where DFW property taxes rose most". Pitched to Candy's Dirt, Dallas Morning News, Community Impact, D Magazine, Fort Worth Report, Star-Telegram and the Spanish-language outlets (Al Día, Telemundo/Univision DFW) |
| Ongoing | Get onto every "best cash home buyers" list AI engines cite, and publish an honest "How to compare DFW cash buyers" checklist |

**The outreach robot** is a scheduled Claude routine that runs every Monday. Each week it:
1. **Finds prospects.** It checks where your top competitors get their links and finds new local sponsorship, chamber, podcast and attorney pages.
2. **Scores and dedupes them**, then logs them to a prospect list.
3. **Finds a contact** from each site's contact page.
4. **Writes up to 15 personal emails as drafts in your Gmail**, labeled "Outreach/Pending". Your Gmail is already connected.
5. **Drafts one follow-up after 7 days**, sorts replies, and honors "no thanks" immediately.
6. **Emails you a weekly summary.**

**Your part: about 10–15 minutes a week** skimming drafts and hitting Send.

**Why it drafts but never sends by itself:** the robot reads strangers' web pages. A malicious page could try to trick it. Keeping the Send button in your hands makes that harmless and protects your domain's reputation.

The emails never offer money for a link. Each one carries your PO Box and an opt-out line, as the CAN-SPAM law requires.

**Other robots:**
- **Monthly SEO report** (1st of the month): rankings, Maps grid, leads by source, reviews, AI mentions and indexing, turned into a plain-English email with at most 5 next actions.
- **Monthly content drafts** (the 15th): new deal pages and eligible city pages, sent to you as a preview link. **Nothing goes live until you reply "APPROVE".**
- **Quarterly refresh:** updated stats, re-checked county facts, and a broken-link sweep.

---

## 8. Speed-to-lead: the site is only as good as the callback
- A new lead triggers **3 separate alerts**: an email, a row in your Google Sheet, and an instant **push notification** on your phone showing name, city, timeline and a tap-to-call button.
- **Every lead is saved to a database first**, so it's never lost even if email fails. Failed alerts retry automatically every 10 minutes.
- A **7am daily digest** lists leads not yet contacted.
- A **weekly test lead** checks that every alert channel still works.
- **The thank-you page** includes:
  - "I'll call you from (xxx) within 15 minutes"
  - a short video of you
  - a **"Save our number"** contact card, so sellers don't ignore your callback as an unknown number
  - an optional "help me make a better offer" form

---

## 9. Compliance (kept simple, per your call)
- **Consent text:**
  - Standard TCPA-style wording (the federal telemarketing law) that names only Home Offer Solutions.
  - A **separate, unchecked, optional texting checkbox**.
  - The exact consent text, time, IP address and page are saved with each lead.
  - Privacy, terms and SMS-terms pages.
- **Texting registration (A2P 10DLC)** before you text leads from a business number. That's included in the Quo setup.
- **No wholesaling or assignment language on the site**, per your call. One paperwork note: if you ever do assign a contract, Texas requires written disclosure to the seller before they sign. That belongs in your contract, not on the website.
- **Reviews:** only real reviews, used with permission (FTC rule).
- **Deal pages:** photos and quotes need seller permission, and locations are shown at neighborhood level only.
- **Privacy:** your home address never appears on the site or in the code.

---

## 10. Your part (plain English; I'll give click-by-click steps for each)

**Week 0 (about 2–3 hours total):**
1. **Domain:** confirm where homeoffersolutions.com is registered (GoDaddy, Namecheap, or through Carrot) and that you can log in. I'll show you how to look it up if you're not sure.
2. **Carrot:**
   - Check whether you're still being billed.
   - Export your old leads.
   - Check whether the phone number on the old site is a Carrot or CallRail tracking number.
   - **Don't cancel until the new site is live.**
3. **Email safety:** if you have email on that domain, tell me. We'll copy its settings before moving anything, so email keeps working.
4. **Google Business Profile:** check whether an old "Home Offer Solutions" profile exists. **Reclaim it; don't create a duplicate.** Also check whether you still have Search Console access.
5. **Accounts** (free, I'll walk you through each):
   - Cloudflare
   - Google Search Console and GA4
   - Bing Webmaster Tools
   - Pushover app ($5)
   - a new Google Sheet for leads
6. **Business facts sheet (15 minutes):**
   - legal name or DBA (Texas assumed-name certificate, ~$25, if "Home Offer Solutions" isn't your legal name)
   - phone and hours
   - which city your home is in (the map pack ranks best near it)
   - counties you buy in
   - the title companies you use
   - year you started and number of houses bought
7. **Proof dump** into a shared Google Drive folder:
   - a deal list (city, situation, days to close, photos, numbers if you're comfortable)
   - review links and screenshots
   - team photos
   - seller permissions
8. **City notes:** a short phone-friendly form (I'll create the spec) for each city you've bought in. Dictate your notes by voice; no typing needed.
9. **Loosen the network settings for this Claude environment.** Open the cloud environment menu in the session title bar → Edit → Network access, and add:
   - `api.dataforseo.com`
   - `ssl.bing.com`
   - `web.archive.org`
   - `homeoffersolutions.com` and `www.homeoffersolutions.com`
   - `*.workers.dev`
   - optionally, the competitor sites listed in section 2 for a hands-on deep dive
   
   Without these, the robots and the old-site migration can't run.

**Ongoing (about 1–2 hours a week):**
- Answer lead alerts fast.
- Text every closed seller the review link (I'll give you a template and a QR code).
- Record **2 short phone videos a month**: a house walk-through or a seller Q&A. Batch-recording them once a quarter is fine.
- Send the outreach drafts (10–15 minutes).
- Reply "APPROVE" or send corrections on preview emails.
- Skim the monthly report.

---

## 11. Build spec (what I'll implement after you approve)

**Stack:**
- **Astro 7.3** static site, custom and lean. I'm not using the AstroWind starter: it's still in beta and brings extra dependencies an AI maintainer doesn't need.
- **Tailwind 4**; no React, no MDX.
- Hosted as **Cloudflare Workers static assets** (free), deployed automatically from GitHub by Cloudflare's Git integration.
- The same Worker runs the `/api/lead` form endpoint, a **D1 database** (free), and scheduled jobs for retries, the daily digest and the weekly test lead.
- **Turnstile** for anti-spam, **Resend** for email, the **Google Sheets API** via a service account (with an Apps Script fallback if Google blocks service-account keys), and **Pushover** for push alerts.
- **Analytics:** GA4, loaded late so it doesn't slow the page, plus Cloudflare Web Analytics. Clarity comes later.

**Repo layout** (repo root, on branch `claude/gracious-feynman-jha6yi`; can move to its own private repo any time):
```
CLAUDE.md                       # agent rules: no invented facts, sources on every fact, gates must pass, no PII in git, nothing publishes without owner approval
astro.config.ts  wrangler.jsonc  package.json  .nvmrc(22)
src/content.config.ts           # Zod schemas: cities, counties, situations, deals, guides, reviews, people (each fact carries a source: owner / public-record / research)
src/content/{cities,counties,situations,deals,guides,reviews,people}/*.md
src/data/business.ts            # single source of truth: name, phone, hours, service counties, sameAs links (no street address)
src/data/consent.ts             # versioned consent text used by both the form and the Worker
src/data/geo/*.json             # ZIP→county and city centroids (Census) for nearby-city links
src/data/keywords.ts            # one primary keyword per URL (prevents the home page and the Dallas page competing)
src/lib/graph.ts                # internal links: hub→county→city, 5 nearest cities, situation↔city via deals and local notes (no page matrix)
src/lib/schema/*.ts             # JSON-LD builders (schema-dts); one @graph per page; #business / #owner IDs
src/components/*                # SeoHead, JsonLd, Breadcrumbs, OfferForm, CallBar, TrustBar, DealCard, ReviewCard, OwnerCard,
                                # CountyOffices, Neighborhoods, MarketStats, NearbyCities, VideoFacade, Calculator, Updated, Sources
src/pages/                      # routes from section 4; cities and counties share /we-buy-houses/[slug].astro; /es/ in wave 2
worker/{index.ts,routes/lead.ts,lib/*,cron/*,schema.sql}
scripts/check-{uniqueness,seo,schema,content,redirects}.ts   # build gates, each with self-test fixtures
public/{robots.txt,_headers,_redirects,hos.vcf}
ops/{migration,outreach,reports,config.yaml}
docs/01-competitor-analysis.md  02-seo-playbook-2026.md (with source links)  03-tools-and-costs.md
     04-owner-guide.md (click-by-click)  05-intake-and-video-guide.md  06-links-and-outreach.md
.github/workflows/{ci.yml,post-deploy.yml,weekly.yml,migration-inventory.yml}
```

**Lead form:**
1. Address and ZIP.
2. Two tap questions: when do you want to sell, and condition.
3. First name, mobile, optional email, consent, plus your photo with "You'll talk to me, [Name]".
4. Optional details on the thank-you page.

It works without JavaScript. The failure fallbacks are retries, then a "call or text now" prompt, then local save and resend on the next visit. **No lead is ever dropped.** Address autocomplete (Google Places, called through the Worker) is a phase-2 add-on, only if analytics show people dropping off at the address step.

**Schema:**
- A single `LocalBusiness` with city, state and country only (no street, no geo coordinates), `areaServed` listing the counties and cities, and `sameAs` links to all profiles.
- `Service` on city, county and situation pages.
- `Article` on guides and deals, `Person` for the owner, plus `VideoObject`, `BreadcrumbList` and `WebApplication` (calculator).
- **Never** review stars, `FAQPage`, `HowTo`, or a separate LocalBusiness per city.

**Quality gates (a failed check blocks the deploy):**
- **Uniqueness:** city names, ZIPs and numbers are masked out, then pages are compared on 5-word phrases. City pages fail at Jaccard ≥ 0.25 or containment ≥ 0.40, need at least 400 unique words, and fail if one sentence repeats on more than 3 city pages.
- **SEO lint:**
  - titles, meta descriptions and canonicals
  - one H1 per page
  - alt text on images
  - at least 3 inbound links per page and no orphan pages
  - phone number consistency
  - banned placeholder text
  - word-count floors
  - page-size budgets
- **Schema checks.**
- **Content checks:** the proof-score publish gate, seller-permission flags, no drafts in production, consent-text versioning, and no PII in the repo.
- **Redirect checks.**
- **Previews** are noindexed and marked with a banner.

**Carrot migration:**
- A GitHub Action records every old URL from the old sitemap and the Wayback Machine.
- Search Console and Ahrefs Webmaster Tools show which old pages have clicks and links.
- Each old URL gets one of three treatments:
  - **kept** at the same URL if it ranks
  - **301-redirected** one-to-one to its new equivalent
  - **left to 404** if it has no value
  
  Never a blanket redirect to the home page.
- **Cutover:** audit DNS, keeping the email records safe, then move DNS to Cloudflare, attach the site, run smoke tests, and submit sitemaps to Google and Bing. Turn on IndexNow, **confirm Cloudflare's AI-crawler blocking is OFF**, and point the Google Business Profile at the right page. Carrot stays as a fallback for 30 days.

**Phases and checkpoints** (you approve by replying to an email; there's no GitHub for you):
| Phase | What happens | Your checkpoint |
|---|---|---|
| **0. Setup** | Scaffold, CLAUDE.md, CI, migration inventory, keyword map, intake-form spec, owner guides, docs 01–03 and 06 | Business facts + proof dump (Week 0 list) |
| **1. Foundation** | Design, layout, SEO and schema libraries, content schemas, all gates, lead pipeline in preview | 20 minutes on your phone: submit a test lead; check it arrives by email, push and Sheet within 60 seconds; approve the look |
| **2. Core pages** | Home, how it works, about, offer formula, calculator, reviews, contact, get offer, thank you, legal | 45 minutes: check the facts and choose how open to be about offer numbers |
| **3. Local content** | 4 county pages, the Dallas and Fort Worth deep pages, proof-3+ cities, 7 situations, 2–3 guides, deal pages | 60 minutes: per-page fact checklist plus the uniqueness report |
| **4. Launch** | Redirects, DNS cutover (I guide you live), production keys, smoke tests, sitemaps | 15 minutes: a live test lead and test call, then go/no-go |
| **5. Off-site** (weeks 1–6) | Business Profile optimization, listings, review system, texting registration | — |
| **6. Robots** (2–4 weeks after launch) | Monthly report first, then content drafts, then outreach drafts. Scheduled routines use `create_trigger`. | Approve by replying |

**After the build:** I'll publish a private, phone-friendly **"Playbook" page** summarizing strategy, costs and your checklists.

---

## 12. Verification
- **Build:** `npm run build` runs `astro check`, the build, and every gate. It must pass locally, in GitHub Actions, and in Cloudflare's build. Every gate's fixtures prove it catches problems: for example, a city-swapped pair of pages must fail the uniqueness check.
- **Speed:**
  - Lighthouse CI on the preview, mobile: performance ≥ 0.95, accessibility ≥ 0.95, SEO = 1.0, LCP ≤ 2.0s, CLS ≤ 0.05.
  - PageSpeed Insights API runs after launch.
- **Lead pipeline:** preview test leads reach the database, email, the Sheet and push. Also tested:
  - Turnstile test keys
  - the honeypot catches bots
  - the no-JavaScript form works
  - forced failure of each channel triggers retries and a digest entry
  - the consent record is stored
- **AI and crawler access:**
  - All content is present with JavaScript off.
  - The live `robots.txt` allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot and PerplexityBot.
  - Cloudflare's AI-bot blocking is confirmed off.
- **Schema:** gate checks, then a manual Rich Results Test and Schema.org validator on one page of each type.
- **Launch:** every old URL returns one 301 to a page that returns 200, and sitemaps are accepted in Google and Bing. After that, Search Console indexing is watched for each wave.

## 13. Still to verify
- **Business Profile category:** check the top-3 map competitors' categories live.
- **Current prices** for Resend, Pushover and USPS PO Boxes. I'm re-checking all prices at setup.
- ~~Old domain: where it's registered, and its email records.~~ Answered 2026-11-11: Squarespace Domains, expires 2027-08-20, Google Workspace mail records in place. See `07-status-2026-11.md`.
- **Carrot tracking number:** whether the old site's number is one.
- **Google Cloud service-account keys:** whether your Google account allows creating them. If not, the Apps Script fallback is used.
- **Competitor on-page details:** once network access is widened.
