export const suburbProfiles = {
  berwick: {
    name: 'Berwick',
    tagline: 'Family-friendly suburb',
    description: 'Berwick exemplifies the perfect blend of historical charm and modern convenience in Melbourne\'s outer southeast.',
    highlights: [
      'Top-rated schools including Berwick Grammar',
      'Historic village with boutique shopping',
      'Beautiful parks and recreational facilities',
      'Strong sense of community'
    ]
  },
  'narre-warren': {
    name: 'Narre Warren',
    tagline: 'Growing community hub',
    description: 'Narre Warren has transformed from a rural township into one of Melbourne\'s most dynamic growth areas.',
    highlights: [
      'Fountain Gate Shopping Centre',
      'Excellent transport connections',
      'Diverse housing options',
      'Multicultural community'
    ]
  },
  'narre-warren-south': {
    name: 'Narre Warren South',
    tagline: 'Established family haven',
    description: 'Narre Warren South exemplifies successful suburban planning with outstanding amenities in a family-focused environment.',
    highlights: [
      'Waverley Christian College',
      'Casey Central shopping precinct',
      'Masterplanned neighborhoods',
      'Abundant parklands'
    ]
  },
  'narre-warren-north': {
    name: 'Narre Warren North',
    tagline: 'Tranquil family retreat',
    description: 'Narre Warren North offers a semi-rural lifestyle with larger blocks and a peaceful atmosphere.',
    highlights: [
      'Spacious properties with acreage options',
      'Natural bushland settings',
      'Quality local schools',
      'Close-knit community feel'
    ]
  },
  pakenham: {
    name: 'Pakenham',
    tagline: 'Affordable family living',
    description: 'Pakenham combines country charm with modern amenities, offering exceptional value for growing families.',
    highlights: [
      'Affordable housing options',
      'New infrastructure and facilities',
      'Strong growth potential',
      'Community sporting facilities'
    ]
  },
  cranbourne: {
    name: 'Cranbourne',
    tagline: 'Thriving growth corridor',
    description: 'Cranbourne stands at the heart of Melbourne\'s southeastern growth corridor with endless opportunities.',
    highlights: [
      'Major shopping and entertainment',
      'Royal Botanic Gardens Cranbourne',
      'Diverse new estates',
      'Excellent value for money'
    ]
  },
  'clyde-north': {
    name: 'Clyde North',
    tagline: 'Modern estate living',
    description: 'Clyde North represents the future of Melbourne\'s southeast with contemporary estates and modern infrastructure.',
    highlights: [
      'Brand new estates and facilities',
      'Family-friendly communities',
      'Parks and playgrounds',
      'Shopping villages'
    ]
  },
  officer: {
    name: 'Officer',
    tagline: 'Growing community',
    description: 'Officer is rapidly evolving from rural outpost to thriving suburb with new estates and infrastructure.',
    highlights: [
      'New residential developments',
      'Train station access',
      'Growing retail precincts',
      'Affordable entry point'
    ]
  },
  clyde: {
    name: 'Clyde',
    tagline: 'Emerging suburb',
    description: 'Clyde offers the perfect opportunity for families seeking brand new homes in a developing community.',
    highlights: [
      'Brand new housing estates',
      'Future shopping centers planned',
      'Competitive land prices',
      'Room to grow'
    ]
  }
};

export type SuburbKey = keyof typeof suburbProfiles;