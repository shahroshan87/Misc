import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every owner-supplied or researched fact carries a source so nothing is invented.
const src = z.enum(['owner', 'public-record', 'research']);
const seo = z.object({
  title: z.string().max(60),
  description: z.string().min(110).max(160),
  primaryKeyword: z.string(),
});

const counties = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/counties' }),
  schema: z.object({
    name: z.string(),
    status: z.enum(['draft', 'published']),
    seat: z.string(),
    probateCourts: z.array(z.object({ name: z.string(), url: z.string().url() })),
    appraisalDistrict: z.object({ name: z.string(), abbr: z.string(), url: z.string().url() }),
    foreclosure: z.object({ location: z.string(), schedule: z.string(), source: z.string().url() }),
    smallerTowns: z.array(z.string()).default([]),
    seo,
  }),
});

const cities = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cities' }),
  schema: z.object({
    name: z.string(),
    status: z.enum(['draft', 'published']),
    wave: z.number().int().min(1).max(4),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    counties: z.array(reference('counties')).min(1),
    primaryCounty: reference('counties'),
    zips: z.array(z.string().regex(/^\d{5}$/)).min(1),
    neighborhoods: z.array(z.object({ name: z.string(), note: z.string().min(60), src })).default([]),
    localIssues: z.array(z.object({ issue: z.string(), detail: z.string().min(120), src })).default([]),
    marketStats: z.array(z.object({ label: z.string(), value: z.string(), source: z.string(), url: z.string().url(), asOf: z.coerce.date() })).default([]),
    deals: z.array(reference('deals')).default([]),
    testimonials: z.array(reference('reviews')).default([]),
    ownerPhotos: z.number().int().default(0),
    video: z.object({ youtubeId: z.string().length(11), title: z.string() }).optional(),
    seo,
  }),
});

const situations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/situations' }),
  schema: z.object({
    h1: z.string(),
    status: z.enum(['draft', 'published']),
    summary: z.string(),
    texasLaw: z.array(z.object({ citation: z.string(), summary: z.string(), url: z.string().url() })).default([]),
    seo,
  }),
});

const deals = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/deals' }),
  schema: z.object({
    title: z.string(),
    city: reference('cities'),
    neighborhood: z.string(),
    situations: z.array(z.string()),
    closedOn: z.coerce.date(),
    daysToClose: z.number().int(),
    sellerPermission: z.object({ granted: z.literal(true), date: z.coerce.date(), method: z.string() }),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/reviews' }),
  schema: z.object({
    author: z.string(),
    source: z.enum(['google', 'facebook', 'video', 'direct']),
    url: z.string().url().optional(),
    date: z.coerce.date(),
    city: reference('cities').optional(),
    permission: z.object({ granted: z.literal(true), date: z.coerce.date() }),
  }),
});

export const collections = { counties, cities, situations, deals, reviews };
