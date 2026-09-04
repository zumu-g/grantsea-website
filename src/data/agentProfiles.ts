// Per-agent profile content for /agent/[id] pages, keyed by lowercase agent
// email (stable across VaultRE listing data). Q&A answers are authored by each
// agent; entries below are PLACEHOLDERS pending their real answers — they
// render visibly marked as placeholder, never as authentic-looking copy.
//
// Reviews: add only REAL, verifiable client reviews (with source + date).
// Fabricated reviews attributed to real people are a legal risk (ACL), not
// just a policy breach — the section stays hidden until genuine quotes exist.

export interface AgentQA {
  question: string;
  answer: string;
}

export interface AgentReview {
  text: string;
  author: string; // e.g. "James H, Berwick"
  source: string; // e.g. "Google" | "realestate.com.au"
  date: string;   // e.g. "June 2026"
}

export interface AgentProfile {
  qa?: AgentQA[];
  reviews?: AgentReview[];
  /** Overall third-party rating, only when verifiable. */
  rating?: { value: number; source: string; updated: string };
}

// The four standard questions every agent answers once.
export const AGENT_QUESTIONS = [
  "What's your personal connection to the area?",
  'What are some core values you live by?',
  "What community initiatives are you proud of?",
  "Why Grant's Estate Agents?",
];

// Placeholder answers shown until an agent's real answers are added. Kept
// obviously-placeholder on purpose.
export function placeholderQA(firstName: string): AgentQA[] {
  return AGENT_QUESTIONS.map((question) => ({
    question,
    answer: `[Placeholder — awaiting ${firstName}'s answer. Content to be provided by the agent.]`,
  }));
}

// Keyed by lowercase agent email. Add real content per agent here.
export const AGENT_PROFILES: Record<string, AgentProfile> = {
  // 'agent@grantsea.com.au': {
  //   qa: [
  //     { question: AGENT_QUESTIONS[0], answer: '…' },
  //     ...
  //   ],
  //   reviews: [
  //     { text: '…', author: 'James H, Berwick', source: 'Google', date: 'June 2026' },
  //   ],
  //   rating: { value: 4.9, source: 'Google', updated: 'June 2026' },
  // },
};

export function profileForAgent(email: string | undefined): AgentProfile | undefined {
  if (!email) return undefined;
  return AGENT_PROFILES[email.trim().toLowerCase()];
}

// Site-wide appraisal FAQ shown on every agent profile (real, generic content).
export const APPRAISAL_FAQ = [
  {
    question: 'What actually happens during an appraisal?',
    answer:
      'Your agent visits your property, considers its features, location and current market conditions, and combines that with recent comparable sales to give you a clear, realistic view of its value.',
  },
  {
    question: 'How do you work out the price range?',
    answer:
      "We analyse comparable sales, current market trends and your home's unique qualities, then provide a considered range that reflects what buyers are likely to pay.",
  },
  {
    question: 'Does getting an appraisal mean I have to sell?',
    answer:
      "Not at all. An appraisal is simply insight — a way to understand your home's value and your options before making any decisions.",
  },
  {
    question: 'Is the appraisal in person or can it be done remotely?',
    answer:
      'We recommend an in-person appraisal so we can assess your property fully. In some cases a virtual appraisal can provide a helpful initial guide.',
  },
  {
    question: 'Why might different agents give different price estimates?',
    answer:
      'Agents weigh factors differently — recent sales, market conditions and property features. We combine local insight, real sales data and experience to give a balanced, realistic appraisal.',
  },
];
