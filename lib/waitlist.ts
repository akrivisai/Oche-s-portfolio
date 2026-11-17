// Copy and options for the /automate waitlist landing page.
// Edit this file to change the offer, the questions, or the price bands.

export const BRAND = {
  name: 'Akrivis Automate',
  short: 'Automate',
  founder: 'Ameh Matthew Oche',
};

export const OFFER = {
  // Shown under the hero form and on the founding-member card.
  // TODO: confirm the number of founding slots and the discount before running ads.
  slots: 50,
  discount: '40% off your first build',
  extra: 'plus 3 months of free maintenance',
};

export type Option = { value: string; label: string };

export const USE_CASES: Option[] = [
  { value: 'reports', label: 'Reports & dashboards' },
  { value: 'approvals', label: 'Approvals & sign-offs' },
  { value: 'reminders', label: 'Reminders & follow-ups' },
  { value: 'data_entry', label: 'Data entry & clean-up' },
  { value: 'invoices', label: 'Invoices & payments' },
  { value: 'hr', label: 'HR, payroll & leave' },
  { value: 'inventory', label: 'Inventory & stock' },
  { value: 'other', label: 'Something else' },
];

export const TOOLS: Option[] = [
  { value: 'google_sheets', label: 'Google Sheets' },
  { value: 'excel', label: 'Excel' },
  { value: 'google_forms', label: 'Google Forms' },
  { value: 'gmail', label: 'Gmail' },
  { value: 'outlook', label: 'Outlook' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'other', label: 'Other' },
];

// "How many workflows" — the quantity question.
export const QUANTITY: Option[] = [
  { value: '1', label: 'Just 1' },
  { value: '2-3', label: '2–3' },
  { value: '4-10', label: '4–10' },
  { value: '10+', label: 'More than 10' },
];

export const TEAM_SIZE: Option[] = [
  { value: 'solo', label: 'Just me' },
  { value: '2-10', label: '2–10' },
  { value: '11-50', label: '11–50' },
  { value: '51-200', label: '51–200' },
  { value: '200+', label: '200+' },
];

export const HOURS_LOST: Option[] = [
  { value: '<2', label: 'Under 2 hrs' },
  { value: '2-5', label: '2–5 hrs' },
  { value: '5-10', label: '5–10 hrs' },
  { value: '10+', label: '10+ hrs' },
];

export const PRICING_MODEL: Option[] = [
  { value: 'one_off', label: 'One-off fee per automation' },
  { value: 'monthly', label: 'Monthly subscription' },
  { value: 'unsure', label: 'Not sure yet' },
];

export type Currency = 'NGN' | 'USD';

// Price bands per currency and pricing model. Values are stable keys so the
// data stays comparable if you change the labels.
export const PRICE_BANDS: Record<Currency, Record<'one_off' | 'monthly', Option[]>> = {
  NGN: {
    one_off: [
      { value: 'b1', label: 'Under ₦50k' },
      { value: 'b2', label: '₦50k–₦150k' },
      { value: 'b3', label: '₦150k–₦300k' },
      { value: 'b4', label: 'Over ₦300k' },
    ],
    monthly: [
      { value: 'b1', label: 'Under ₦20k / mo' },
      { value: 'b2', label: '₦20k–₦50k / mo' },
      { value: 'b3', label: '₦50k–₦100k / mo' },
      { value: 'b4', label: 'Over ₦100k / mo' },
    ],
  },
  USD: {
    one_off: [
      { value: 'b1', label: 'Under $50' },
      { value: 'b2', label: '$50–$150' },
      { value: 'b3', label: '$150–$400' },
      { value: 'b4', label: 'Over $400' },
    ],
    monthly: [
      { value: 'b1', label: 'Under $20 / mo' },
      { value: 'b2', label: '$20–$50 / mo' },
      { value: 'b3', label: '$50–$150 / mo' },
      { value: 'b4', label: 'Over $150 / mo' },
    ],
  },
};

export const TIMELINE: Option[] = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1m', label: 'Within a month' },
  { value: '1-3m', label: 'In 1–3 months' },
  { value: 'exploring', label: 'Just exploring' },
];

// Strongest intent signal on the form.
export const DEPOSIT: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'no', label: 'No' },
];

export const PAINS = [
  {
    title: 'Copy, paste, repeat',
    body: 'Moving the same numbers between sheets, forms and emails every week.',
  },
  {
    title: 'Chasing approvals',
    body: 'Requests stuck in email threads and WhatsApp chats, with no record of who signed off.',
  },
  {
    title: 'Monday-morning reports',
    body: 'Hours spent rebuilding the same summary by hand before anyone can make a decision.',
  },
  {
    title: 'Reminders that slip',
    body: 'Invoices, renewals and follow-ups that depend on someone remembering.',
  },
];

export const AUTOMATIONS = [
  {
    title: 'Reports that send themselves',
    body: 'Pull data from your sheets, build the summary and email it to the right people on schedule.',
    example: 'Weekly sales summary → 6 managers, every Monday 8:00',
  },
  {
    title: 'Approval workflows',
    body: 'Route each request to the right approver, timestamp every action and keep one audit trail.',
    example: 'Purchase request → line manager → finance → done',
  },
  {
    title: 'Automatic reminders',
    body: 'Overdue invoices, expiring contracts, pending tasks: the follow-up goes out without anyone remembering.',
    example: 'Invoice 7 days overdue → polite reminder to client',
  },
  {
    title: 'Form-to-sheet pipelines',
    body: 'Form responses cleaned, checked and filed into the right tab, with alerts on anything unusual.',
    example: 'New order form → stock sheet → alert if low',
  },
  {
    title: 'Data clean-up',
    body: 'Duplicates removed, formats fixed and records matched across files, in seconds instead of afternoons.',
    example: '4 branch sheets → one clean master list',
  },
  {
    title: 'HR & admin',
    body: 'Onboarding checklists, leave tracking and staff records that update themselves.',
    example: 'New hire added → accounts checklist → welcome email',
  },
];

export const STEPS = [
  {
    title: 'Tell us the task',
    body: 'Show us the spreadsheet or process you repeat. A 20-minute call or a short form is enough.',
  },
  {
    title: 'We build it in your tools',
    body: 'We build and test the automation inside the Google or Microsoft files you already use. No new software to learn.',
  },
  {
    title: 'It runs. We keep it running.',
    body: 'You get a short handover and a fixed price. If something breaks or changes, we fix it.',
  },
];

export const FAQS = [
  {
    q: 'Do I have to switch to new software?',
    a: 'No. Automations are built inside the tools you already use: Google Sheets, Excel, Forms, Gmail and Outlook.',
  },
  {
    q: 'What will it cost?',
    a: 'Pricing is being set now, and the answers on the waitlist form shape it. Founding members get the lowest price we will offer.',
  },
  {
    q: 'Is my data safe?',
    a: 'Your data stays in your own accounts. We work with the access you grant for the build, and you can remove it at any time.',
  },
  {
    q: 'When does it launch?',
    a: 'We are taking on a small founding group first. Join the waitlist and we will contact you in the order people signed up.',
  },
  {
    q: 'What if my process is unusual?',
    a: 'Tell us about it on the form. Unusual, manual processes are usually the ones that save the most time once automated.',
  },
];
