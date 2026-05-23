import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Users,
  Sparkles,
  Boxes,
  ShieldCheck,
  LineChart,
  Workflow,
} from 'lucide-react';

export const HERO = {
  eyebrow: {
    role: 'Analyst, People & Culture',
    org: 'Babban Gona',
  },
  name: {
    first: 'Ameh Matthew',
    last: 'Oche',
  },
  tagline: {
    primary: 'People Operations & AI Systems',
    accent: '— building the infrastructure that scales modern HR.',
  },
  lede:
    'I design and ship the workflows, automations, and AI-powered tools that let HR teams move faster, stay compliant, and operate with confidence at scale.',
  statusPill: 'Open to select global remote roles',
  portraitTag: {
    location: 'Kaduna',
    accent: 'Open to anywhere',
  },
  cv: 'assets/Ameh_Matthew_Oche_CV.pdf',
  portrait: 'assets/hero_portrait.png',
} as const;

export type ImpactStat = {
  value: number;
  plus: boolean;
  label: string;
};

export const IMPACT: ImpactStat[] = [
  { value: 480, plus: true, label: 'Approval requests processed, zero operational errors' },
  { value: 200, plus: true, label: 'Concurrent users supported, zero system failures' },
  {
    value: 450,
    plus: true,
    label: 'Staff securely assessed across two appraisal cycles, zero system failures',
  },
  { value: 4, plus: false, label: 'Production HR systems built end-to-end' },
];

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

export const PROJECTS: Project[] = [
  {
    num: '01 / 04',
    role: 'Lead Builder · 2025',
    title: 'TalentLens',
    subtitle: '— Psychometric & Cognitive Assessment Platform',
    summary:
      'A multi-tenant recruitment assessment platform that delivers HEXACO personality, behavioural-risk, and role-specific knowledge tests at scale — with cycle-scoped data isolation and an audit-ready decision trail.',
    tags: [
      'Next.js 14',
      'TypeScript',
      'Supabase',
      'PostgreSQL (RLS)',
      'Edge Functions',
      'Recharts',
    ],
    leftBlocks: [
      {
        type: 'prose',
        heading: 'The Problem',
        body:
          'Babban Gona runs high-volume recruitment waves across multiple roles, but previously lacked structured psychometric or behavioural screening. This created a critical operational blind spot — we repeatedly encountered cases where technically skillful candidates failed post-hire due to behavioural risks or cultural misalignment. Without standardized assessments to evaluate personality and integrity, hiring decisions were highly subjective, funnel visibility was non-existent, and there was no defensible audit trail.',
      },
      {
        type: 'prose',
        heading: 'What I Built',
        body:
          'A custom recruitment assessment platform that successfully introduced HEXACO personality, Personal Reaction Blank (PRB) behavioural risk, and role-specific MCQ tests into the hiring funnel. The platform features admin, recruiter, and candidate portals. Candidates self-register, sign in, and complete the assessments assigned to their active cycle. Admins create cycles, bulk-import rosters, assign assessments per candidate, manage the question bank, configure auto-flag risk rules, and review results.',
      },
      {
        type: 'prose',
        heading: 'Operational Visibility',
        body:
          'A super-admin dashboard tracks pipeline volume, registration-to-assignment ratio, submission progress, completion rate, and auto-flagged candidates in real time.',
      },
    ],
    rightBlocks: [
      {
        type: 'list',
        heading: 'The Hard Parts I Solved',
        items: [
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Cycle-scoped multi-tenancy.'),
            ' Concurrent cycles run without bleed-through. Every domain table carries a ',
            React.createElement('code', null, 'cycle_id'),
            ' with cascade rules, and Postgres RLS policies are the authoritative authorization boundary — not application code.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Pre-registration assignment queue.'),
            ' Admins assign tests to candidates before they register. A pending-assignments table plus trigger-based reconciliation materializes assignments the moment a candidate signs up.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Composite auto-flag rules.'),
            ' Server-side scoring evaluates a Honesty-Humility × PRB composite and writes flagged results into an admin review queue automatically to prevent high-risk hires from slipping through.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Audit-ready decision trail.'),
            ' Every privileged action — cycle status change, candidate import, assignment, override, role change — is written to an append-only audit log via a service-role writer never exposed to the browser.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'AAL2-protected admin access.'),
            ' Mandatory TOTP MFA for every admin, enforced at both middleware and database layers.'
          ),
        ],
      },
      {
        type: 'prose',
        heading: 'Outcome',
        body:
          'Introduced structured, data-driven behavioural screening to the organization from scratch, replacing subjective evaluations with a single auditable system. In active production use across recruitment cohorts. First-week production metrics: 135 candidates uploaded, 95 registered and matched, 262 distinct assignments, 174 submissions, 66.4% completion rate, and 10 high-risk candidates auto-flagged for review before hiring decisions were made.',
      },
    ],
  },
  {
    num: '02 / 04',
    role: 'Lead Builder · 2025',
    title: 'HRsist',
    subtitle: '— AI Behavioural Interview Platform',
    summary:
      'A real-time, speech-to-speech AI interview platform that conducts structured behavioural screenings, scores responses against a rubric, and ships proctoring guardrails — giving recruiter time back without losing evaluation rigor.',
    tags: [
      'React',
      'TypeScript',
      'LiveKit WebRTC',
      'OpenAI Realtime API',
      'Silero VAD',
      'Google MediaPipe',
      'Supabase Edge Functions',
    ],
    leftBlocks: [
      {
        type: 'prose',
        heading: 'The Problem',
        body:
          'Initial behavioural interviews at scale consumed hundreds of recruiter hours per wave. Manual screening lacked structure, varied across reviewers, and produced no verbatim record for downstream hiring managers.',
      },
      {
        type: 'prose',
        heading: 'What I Built',
        body:
          "An end-to-end web platform featuring a structured AI video interview room. After passing a system pre-check (camera, microphone, face-visibility), candidates are welcomed by the AI agent. To ensure accessibility and clarity, the platform displays questions on-screen in real time as the agent speaks. Candidates then use a controlled click-to-speak input to record their responses. These responses are instantly processed via speech-to-text, securely saved as transcripts in the admin dashboard, and the agent seamlessly advances to the next question.",
      },
      {
        type: 'prose',
        heading: 'Recruiter Experience',
        body:
          'Synchronized transcripts, audio playback, AI-generated scores, manual override controls, and proctoring flags — all in one centralized review surface.',
      },
    ],
    rightBlocks: [
      {
        type: 'list',
        heading: 'The Hard Parts I Solved',
        items: [
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Ultra-low latency voice pipeline.'),
            ' WebRTC audio transport via LiveKit. The AI worker utilizes the OpenAI Realtime API to deliver prompts, while the controlled recording and transcription pipeline ensures flawless speech-to-text data capture directly to the admin dashboard.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Privacy-first proctoring.'),
            ' In-browser computer vision via Google MediaPipe. Video frames are processed client-side, never transmitted to a server — preserving candidate privacy while still logging integrity events.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Resilient session management.'),
            ' Custom state-machine handles network disconnects with a grace period, letting candidates pause and securely resume without losing progress.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'AI safety guardrails.'),
            ' Prompt-injection defense, out-of-scope question deflection, and a graduated escalation ladder (silent log → warning → session termination).'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Rubric-based scoring.'),
            " A backend pipeline evaluates answers against specific principles and behavioural indicators, returning a scorecard with evidence excerpts cited from the candidate's own words."
          ),
        ],
      },
      {
        type: 'prose',
        heading: 'Outcome',
        body:
          'Replaced unstructured behavioural screening with a standardized, auditable platform. Currently active for candidate cohorts, significantly reducing manual screening hours while capturing perfectly structured interview data.',
      },
    ],
  },
  {
    num: '03 / 04',
    role: 'Product Lead & Designer · 2025',
    title: 'Excelerate',
    subtitle: '— Secure Internal Assessment & Appraisal Platform',
    summary:
      'A secure, organization-wide assessment platform built to handle large-scale internal testing and performance appraisals without the malpractice risk or cost of generic tools.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Edge Functions'],
    leftBlocks: [
      {
        type: 'prose',
        heading: 'The Problem',
        body:
          'Internal assessments and appraisals ran on generic third-party tools that were costly, weak on exam integrity at scale, and inconsistent in their results. Malpractice was a recurring concern, and there was no clean data handoff to HR for downstream performance and lifecycle decisions.',
      },
      {
        type: 'prose',
        heading: 'What I Built',
        body:
          'A custom platform bridging admin-facing test management with employee-facing assessment delivery. Features include randomized test generation, timed exams with autosave, server-side grading, role-based access controls, and strict anti-cheat proctoring (tab-switch detection, focus loss, copy attempts, right-click blocks, and optional camera/microphone monitoring).',
      },
      {
        type: 'prose',
        heading: 'L&D Integration',
        body:
          'Beyond point-in-time assessments, Excelerate expanded into the broader Learning & Development surface, enabling course authoring (chapters and modules) and learner progress dashboards to track employee upskilling and readiness.',
      },
    ],
    rightBlocks: [
      {
        type: 'list',
        heading: 'Outcomes',
        items: [
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Proven at scale.'),
            ' Successfully deployed across two major organizational appraisal cycles in 2025 and 2026, securely assessing over 450 staff members in total.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Flawless execution.'),
            ' Supported 200+ concurrent staff during high-stakes, organization-wide testing windows with zero system failures.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Risk mitigation.'),
            ' Completely eliminated the malpractice risks tied to previous tooling.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Operational efficiency.'),
            ' Delivered clean, instantly auditable results directly to HR, entirely removing the need for manual cross-checking and data reconciliation.'
          ),
        ],
      },
    ],
  },
  {
    num: '04 / 04',
    role: 'Project Lead & Developer · 2025',
    title: 'Staff Replacement Approval System',
    summary:
      'An automated approval workflow that replaced fragmented email chains with a centralized, timestamped, audit-ready single source of truth for staff replacement requests. 480+ requests processed end-to-end with zero operational errors to date.',
    tags: ['Google Apps Script', 'Google Sheets', 'Workflow Automation'],
    leftBlocks: [
      {
        type: 'prose',
        heading: 'The Problem',
        body:
          'Staff replacement requests were running through manual email chains. Requests were getting lost, analysts were being bypassed, records were inconsistent across hubs, and the process was effectively impossible to audit after the fact.',
      },
      {
        type: 'prose',
        heading: 'What I Built',
        body:
          "A centralized, spreadsheet-driven approval system with Apps Script automation behind it. The tool auto-routes approvals based on hub and unit, enforces timestamping on every action, and acts as the single source of truth for all replacement requests. Every stakeholder — managers, analysts, HR — is consistently included in the flow with no manual cc'ing required. The workflow also includes an integrated asset-reconciliation tracker: a managed column where hub managers confirm that the departing employee's assets (laptop, mobile device, security tokens) have been returned, before the system advances the replacement request toward final HR clearance.",
      },
    ],
    rightBlocks: [
      {
        type: 'list',
        heading: 'Outcome',
        items: [
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, '480+ replacement requests'),
            ' processed end-to-end with zero operational errors to date.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Cut turnaround time on approvals'),
            ' by replacing async email back-and-forth with structured, deadline-aware routing.'
          ),
          React.createElement(
            React.Fragment,
            null,
            React.createElement('b', null, 'Made the entire process auditable'),
            ' — every action has an actor and a timestamp.'
          ),
        ],
      },
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
    icon: Users,
    title: 'HR Operations & Employee Lifecycle',
    body: 'Designing and running the workflows that move people through hiring, onboarding, growth, and transitions.',
  },
  {
    icon: Sparkles,
    title: 'AI-Enabled Workflow Design',
    body: 'Identifying high-leverage use cases, shipping pilots, and scaling adoption with quality, privacy, and risk guardrails.',
  },
  {
    icon: Boxes,
    title: 'Process Automation & SOPs',
    body: 'Replacing fragmented manual processes with auditable, single-source-of-truth systems.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance, Audit & Risk Guardrails',
    body: 'Embedding access controls, audit trails, and approval gates so sensitive employee events stay defensible.',
  },
  {
    icon: LineChart,
    title: 'Operational Reporting & Dashboards',
    body: 'Building the visibility layer that helps leaders see throughput, backlog, and the impact of changes over time.',
  },
  {
    icon: Workflow,
    title: 'Cross-Functional Collaboration',
    body: 'Translating operational needs into shippable tooling with Product, Engineering, and DevOps partners.',
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
    kind: 'trophy',
    title: 'Promotion to Analyst, People & Culture',
    badge: 'Promoted · Feb 2026',
    meta: React.createElement(
      React.Fragment,
      null,
      React.createElement('b', null, 'Babban Gona'),
      ' · Effective 1 Feb 2026'
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
      'I joined ',
      React.createElement('b', null, 'Babban Gona'),
      " — Nigeria's largest smallholder agricultural franchise — in October 2024 in Inventory Control. I was internally recruited into HR in January 2025 and promoted to ",
      React.createElement('b', null, 'Analyst, People & Culture'),
      ' in February 2026.'
    ),
    React.createElement(
      React.Fragment,
      null,
      'What I actually do is build the operational infrastructure that lets the HR team move faster: the platforms, the automations, the AI-powered tools, and the workflows. I shipped a recruitment assessment platform that introduced structured behavioural screening to the organization from scratch, a real-time AI behavioural interview platform, an internal assessment and appraisal platform that secured 450+ staff appraisals across two cycles, an automated approval workflow that has processed 480+ requests, and an AI-driven training video pipeline. I work cross-functionally with ',
      React.createElement('b', null, 'DevOps'),
      ', ',
      React.createElement('b', null, 'Engineering'),
      ', and ',
      React.createElement('b', null, 'Design'),
      ' to ship.'
    ),
    React.createElement(
      React.Fragment,
      null,
      'I hold an ',
      React.createElement('b', null, 'MBA in Leadership and Management'),
      ' from Valar Institute at Quantic School of Business and Technology, and I am formally certified in ',
      React.createElement('b', null, 'AI Fluency'),
      ' by Anthropic. The technical fluency is not the point — the point is being able to design HR systems that are auditable, defensible, and fast.'
    ),
    React.createElement(
      React.Fragment,
      null,
      'I am now looking for a Lifecycle Operations role with a globally distributed team where I can keep building the operational and AI infrastructure that lets modern HR move with confidence at scale.'
    ),
  ],
  paragraphMuted: [false, true, true, true] as const,
  meta: ['Kaduna, Nigeria', 'UTC+1', 'Open to remote', 'English'],
};

export const CONTACT = {
  lede:
    "I'm currently exploring roles where I can build the operational and AI infrastructure of globally distributed HR teams.",
  email: 'amoche42@gmail.com',
  linkedin: 'linkedin.com/in/am-oche',
  linkedinUrl: 'https://linkedin.com/in/am-oche',
  location: 'Kaduna, Nigeria · Open to Anywhere',
};

export const FOOTER = '© 2026 Ameh Matthew Oche · Designed and built with care.';

export const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#lifecycle-ops', label: 'Featured' },
  { href: '#recognition', label: 'Recognition' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const;

export const EASE = [0.22, 1, 0.36, 1] as const;
