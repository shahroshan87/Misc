// Single source of truth for business facts. NEVER add a street address here (home address stays private).
// Values marked TBD must be confirmed by the owner (docs/04-owner-guide.md step 6) before launch.
export const business = {
  name: 'Home Offer Solutions',
  legalName: 'TBD',
  url: 'https://www.homeoffersolutions.com',
  phoneDisplay: 'TBD',
  phoneE164: 'TBD',
  email: 'TBD',
  city: 'TBD', // home-base city (locality only)
  region: 'TX',
  foundedYear: 'TBD',
  housesBought: 'TBD',
  serviceCounties: ['Dallas', 'Tarrant', 'Collin', 'Denton'],
  sameAs: [] as string[],
} as const;
