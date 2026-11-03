import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Users,
  Sparkles,
  Compass,
  Table,
  LineChart,
  Workflow,
} from 'lucide-react';

export const HERO = {
  eyebrow: {
    role: 'Associate Product Manager, Enterprise Systems',
    org: 'Babban Gona',
  },
  name: {
    first: 'Ameh Matthew',
    last: 'Oche',
  },
  tagline: {
    primary: 'Strategy · Operations · Product',
    accent: '— I turn messy operating problems into systems, frameworks and products that people actually use.',
  },
  lede:
    'Associate Product Manager at Babban Gona, MBA, and founder of Akrivis Academia.',
  portraitTag: {
    location: 'Kaduna',
    accent: 'UTC+1',
  },
  // TODO: add the new CV here (e.g. 'assets/<new-cv>.pdf') and restore the
  // "Download CV" button in components/Hero.tsx once it is uploaded.
  cv: null as string | null,
  portrait: 'assets/hero_portrait.png',
};

export type ImpactStat = {
  value: number;
  plus: boolean;
  label: string;
};

// TODO: add back only figures you are cleared to share. The impact strip is
// hidden while this list is empty.
export const IMPACT: ImpactStat[] = [];

export type ProjectCaseBlock =
  | { type: 'prose'; heading: string; body: React.ReactNode }
  | { type: 'list'; heading: string; items: React.ReactNode[] };

export type Project = {
  num: string;
  role: string;
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  leftBlocks: ProjectCaseBlock[];
  rightBlocks: ProjectCaseBlock[];
};

// Case studies are described generically on purpose: no internal product
// names, technical stacks or operating figures.
export const PROJECTS: Project[] = [
  {
    num: '01 / 04',
    role: 'Talent acquisition',
    title: 'Structured hiring',
    subtitle: '— from CV review to evidence-based screening',
    summary:
      'Introduced psychometric and behavioural screening, plus an AI-assisted interview module, to a large agricultural enterprise, replacing unstructured CV review.',
    tags: ['Assessment design', 'Process design', 'AI adoption', 'Change management'],
    leftBlocks: [
      {
        type: 'prose',
        heading: 'The problem',
        body:
          'Hiring decisions relied on unstructured CV review. Screening was subjective, varied from reviewer to reviewer, and left no consistent record of why a candidate moved forward or did not.',
      },
      {
        type: 'prose',
        heading: 'What I did',
        body:
          'Designed and introduced a structured screening stage built on psychometric and behavioural assessments, then added an AI-assisted interview module that asks every candidate the same structured questions and keeps a transcript for reviewers. I set up how candidates are assigned assessments, how results are reviewed, and how higher-risk profiles are flagged for a closer look.',
      },
    ],
    rightBlocks: [
      {
        type: 'prose',
        heading: 'Outcome',
        // TODO: add any outcome figures you are cleared to share.
        body:
          'Hiring moved from subjective first impressions to a consistent, evidence-based screening process with a clear decision trail, and recruiters spend less time on repetitive first-round screening.',
      },
    ],
  },
  {
    num: '02 / 04',
    role: 'Performance & appraisals',
    title: 'Organisation-wide skills assessment',
    subtitle: '— secure, proctored testing for staff appraisals',
    summary:
      'Designed and ran secure, proctored skills testing for staff appraisals, replacing generic tools that were costly and weak on exam integrity.',
    tags: ['Assessment design', 'Proctoring & integrity', 'Operations', 'Reporting'],
    leftBlocks: [
      {
        type: 'prose',
        heading: 'The problem',
        body:
          'Appraisal testing ran on generic third-party tools that were costly, inconsistent and weak on exam integrity. Malpractice was a recurring concern, and results needed manual cross-checking before they could feed into performance decisions.',
      },
      {
        type: 'prose',
        heading: 'What I did',
        body:
          'Designed the assessment approach and ran the testing windows end to end: randomised tests, timed sessions with autosave, automatic grading, role-based access, and proctoring controls such as tab-switch and focus-loss detection.',
      },
    ],
    rightBlocks: [
      {
        type: 'prose',
        heading: 'Outcome',
        // TODO: add any outcome figures you are cleared to share.
        body:
          'Appraisal testing became secure and consistent, the malpractice risks tied to the old tools were removed, and results reached the people team clean and audit-ready, without manual reconciliation.',
      },
    ],
  },
  {
    num: '03 / 04',
    role: 'Organisation design',
    title: 'Career progression framework',
    subtitle: '— clear levels, clear criteria, clear gates',
    summary:
      'A career progression framework with seven job levels, five competency domains, a gated promotion funnel, and a manager assessment tool.',
    tags: ['Organisation design', 'Competency frameworks', 'Performance', 'Change management'],
    leftBlocks: [
      {
        type: 'prose',
        heading: 'The problem',
        body:
          'Without a shared framework, it was hard for staff to see what the next level looked like, and promotion decisions lacked consistent, transparent criteria.',
      },
      {
        type: 'prose',
        heading: 'What I did',
        body:
          'Designed a framework of seven job levels and five competency domains that describe what is expected at each level, a gated promotion funnel that sets out the steps and evidence needed to move up, and a manager assessment tool so managers rate people against the same criteria.',
      },
    ],
    rightBlocks: [
      {
        type: 'prose',
        heading: 'Outcome',
        // TODO: confirm the outcome you are cleared to share (e.g. rollout status).
        body:
          'Staff and managers share one definition of each level and one route to promotion, so progression decisions rest on the same criteria across the organisation.',
      },
    ],
  },
  {
    num: '04 / 04',
    role: 'Workflow automation',
    title: 'Approval workflow automation',
    subtitle: '— from email chains to one auditable flow',
    summary:
      'Replaced email-chain approvals with a single, timestamped, auditable workflow.',
    tags: ['Process design', 'Workflow automation', 'Audit & controls'],
    leftBlocks: [
      {
        type: 'prose',
        heading: 'The problem',
        body:
          'Approvals ran through email chains. Requests got lost, reviewers were bypassed, records were inconsistent across locations, and the process was close to impossible to audit after the fact.',
      },
      {
        type: 'prose',
        heading: 'What I did',
        body:
          'Designed and built a single approval workflow that routes each request to the right approvers automatically, timestamps every action, includes every stakeholder without manual copying, and checks that hand-back steps are complete before a request moves to final sign-off.',
      },
    ],
    rightBlocks: [
      {
        type: 'list',
        heading: 'Outcome',
        // TODO: add any outcome figures you are cleared to share.
        items: [
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'One source of truth'),
            ' for every request, replacing scattered email threads.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Faster turnaround'),
            ' through structured routing instead of email back-and-forth.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Fully auditable'),
            ' — every action has an actor and a timestamp.'
          ),
        ],
      },
    ],
  },
];

export type Venture = {
  name: string;
  role: string;
  summary: string;
  points: string[];
  // TODO: add the public URL for each venture.
  url?: string;
};

export const VENTURES: Venture[] = [
  {
    name: 'Akrivis Academia',
    role: 'Founder',
    summary: 'An AI examination and learning platform for African universities.',
    points: [
      'Paying lecturer customers.',
      'Scaled to 11,000 concurrent exam sessions before free-tier infrastructure limits forced a re-architecture.',
    ],
  },
];

export type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const CAPABILITIES: Capability[] = [
  {
    icon: Compass,
    title: 'Product Strategy & Roadmapping',
    body: 'Framing the problem, choosing what to build first, and turning it into a roadmap people can follow.',
  },
  {
    icon: Workflow,
    title: 'Operating Model & Process Design',
    body: 'Redesigning how work flows, who decides, and where controls sit, so operations run without heroics.',
  },
  {
    icon: Users,
    title: 'Organisation & Talent Design',
    body: 'Job levels, competency frameworks, hiring processes and progression paths that hold up at scale.',
  },
  {
    icon: LineChart,
    title: 'KPI & Performance Frameworks',
    body: 'Defining the measures that matter and building the visibility leaders need to act on them.',
  },
  {
    icon: Sparkles,
    title: 'AI Adoption & Change Management',
    body: 'Finding high-leverage AI use cases, piloting them with guardrails, and bringing people along.',
  },
  {
    icon: Table,
    title: 'Analysis',
    body: 'Excel, Google Apps Script, Python and SQL, used to answer questions and automate the busywork.',
  },
];

export type Recognition = {
  kind: 'image' | 'trophy';
  title: string;
  meta: React.ReactNode;
  image?: string;
  alt?: string;
  badge?: string;
};

export const RECOGNITIONS: Recognition[] = [
  {
    kind: 'image',
    title: 'Outstanding Team Member of the Year',
    image: 'assets/recognition_outstanding.jpg',
    alt: 'Outstanding Team Member of the Year certificate',
    meta: React.createElement(
      React.Fragment,
      null,
      React.createElement('b', null, 'Babban Gona'),
      ' · Jan 2026'
    ),
  },
  {
    kind: 'image',
    title: 'Trailblazer Award — Most Innovative Team Member, HR',
    image: 'assets/recognition_trailblazer.jpg',
    alt: 'Trailblazer Award',
    meta: React.createElement(
      React.Fragment,
      null,
      React.createElement('b', null, 'Babban Gona'),
      ' · Sept 2025'
    ),
  },
  {
    kind: 'image',
    title: 'Team Member of the Month',
    image: 'assets/recognition_tmom.jpg',
    alt: 'Team Member of the Month',
    meta: React.createElement(
      React.Fragment,
      null,
      React.createElement('b', null, 'Babban Gona'),
      ' · HR · March 2025'
    ),
  },
  {
    kind: 'image',
    title: 'MBA · Leadership and Management',
    image: 'assets/recognition_mba.jpg',
    alt: 'MBA in Leadership and Management certificate',
    meta: React.createElement(
      React.Fragment,
      null,
      React.createElement('b', null, 'Valar Institute'),
      ' · Quantic School of Business and Technology · April 2025'
    ),
  },
  {
    kind: 'image',
    title: 'AI Fluency for Educators',
    image: 'assets/recognition_anthropic_educators.png',
    alt: 'AI Fluency for Educators certificate from Anthropic',
    meta: React.createElement(React.Fragment, null, React.createElement('b', null, 'Anthropic')),
  },
  {
    kind: 'image',
    title: 'Teaching the AI Fluency Framework',
    image: 'assets/recognition_anthropic_framework.png',
    alt: 'Teaching the AI Fluency Framework certificate from Anthropic',
    meta: React.createElement(React.Fragment, null, React.createElement('b', null, 'Anthropic')),
  },
  {
    kind: 'image',
    title: 'Verbal Communications & Presentation Skills',
    image: 'assets/recognition_starweaver.png',
    alt: 'Verbal Communications and Presentation Skills certificate',
    meta: React.createElement(
      React.Fragment,
      null,
      React.createElement('b', null, 'Starweaver'),
      ' · Coursera · July 2025'
    ),
  },
  {
    kind: 'image',
    title: 'Aspire Leaders Program',
    image: 'assets/recognition_aspire.png',
    alt: 'Aspire Leaders Program certificate from Aspire Institute',
    meta: React.createElement(
      React.Fragment,
      null,
      React.createElement('b', null, 'Aspire Institute'),
      ' · April 2026'
    ),
  },
  {
    kind: 'image',
    title: 'Forward Program',
    image: 'assets/recognition_mckinsey.png',
    alt: 'McKinsey Forward Program certificate',
    meta: React.createElement(
      React.Fragment,
      null,
      React.createElement('b', null, 'McKinsey & Company'),
      ' · April 2024'
    ),
  },
];

export const ABOUT = {
  photo: 'assets/about_portrait.jpg',
  paragraphs: [
    React.createElement(
      React.Fragment,
      null,
      'I started in research, as a Research Assistant in the Neuroscience and Bioinformatics Research Laboratory at Ahmadu Bello University. In October 2024 I joined ',
      React.createElement('b', null, 'Babban Gona'),
      ' in Inventory Control, moved into HR as a Trainee Analyst in January 2025, became Analyst, People & Culture in February 2026, and in September 2026 became ',
      React.createElement('b', null, 'Associate Product Manager, Enterprise Systems'),
      '.'
    ),
    React.createElement(
      React.Fragment,
      null,
      'I hold an ',
      React.createElement('b', null, 'MBA in Leadership and Management'),
      ' from Valar Institute (Quantic) and a B.Sc. in Human Anatomy from ABU Zaria, where I am completing an M.Sc. in Neurobiology and Anatomy.'
    ),
    React.createElement(
      React.Fragment,
      null,
      'Outside my day job I founded ',
      React.createElement('b', null, 'Akrivis Academia'),
      ', and I built ',
      React.createElement('b', null, 'Office, Decoded'),
      ', a workplace-clarity web app, for a client.'
    ),
    React.createElement(
      React.Fragment,
      null,
      'The thread through all of it is the same: find the messy operating problem, design the system, and ship something people use. That is where my work is heading — product and strategy.'
    ),
  ],
  paragraphMuted: [false, true, true, true] as const,
  meta: ['Kaduna, Nigeria', 'UTC+1', 'English'],
};

export const CONTACT = {
  lede:
    'For product, strategy and operations conversations, or to talk about Akrivis Academia, email is the fastest way to reach me.',
  availability: 'Open to select remote and contract work.',
  email: 'ocheameh42@gmail.com',
  linkedin: 'linkedin.com/in/am-oche',
  linkedinUrl: 'https://linkedin.com/in/am-oche',
  location: 'Kaduna, Nigeria · UTC+1',
};

export const FOOTER = '© 2026 Ameh Matthew Oche · Designed and built with care.';

export const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#ventures', label: 'Ventures' },
  { href: '#design-study', label: 'Design study' },
  { href: '#recognition', label: 'Recognition' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const;

export const EASE = [0.22, 1, 0.36, 1] as const;
