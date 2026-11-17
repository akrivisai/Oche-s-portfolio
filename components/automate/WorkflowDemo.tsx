import { Check, FileSpreadsheet, Mail, Sparkles, Timer } from 'lucide-react';

// A small animated "automation run" for the hero. CSS-only animation; it shows
// the finished state when the visitor prefers reduced motion.
const STEPS = [
  { icon: Timer, title: 'Every Monday, 8:00', meta: 'Trigger' },
  { icon: FileSpreadsheet, title: 'Pull sales from 4 branch sheets', meta: '1,284 rows' },
  { icon: Sparkles, title: 'Clean, total and build summary', meta: 'Duplicates removed: 37' },
  { icon: Mail, title: 'Email report to 6 managers', meta: 'Sent' },
];

export function WorkflowDemo() {
  return (
    <div className="lp-demo" aria-label="Example automation: a weekly sales report that builds and sends itself">
      <div className="lp-demo-bar">
        <span className="lp-dots" aria-hidden><i /><i /><i /></span>
        <span>Example · Weekly sales report</span>
        <span className="lp-demo-live"><span className="lp-pulse" aria-hidden /> Running</span>
      </div>
      <ol className="lp-demo-steps">
        {STEPS.map(({ icon: Icon, title, meta }, i) => (
          <li key={title} style={{ ['--i' as string]: i }}>
            <span className="lp-demo-icon"><Icon size={16} aria-hidden /></span>
            <span className="lp-demo-text">
              <b>{title}</b>
              <small>{meta}</small>
            </span>
            <span className="lp-demo-check"><Check size={13} aria-hidden /></span>
          </li>
        ))}
      </ol>
      <div className="lp-demo-foot">
        <div>
          <small>Before</small>
          <b>3 hrs by hand</b>
        </div>
        <div className="lp-demo-arrow" aria-hidden>→</div>
        <div>
          <small>After</small>
          <b className="lp-accent">0 minutes</b>
        </div>
      </div>
    </div>
  );
}
