import { FOOTER } from '@/lib/content';

export function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <span className="monogram">AO</span>
        <div className="foot-rule" aria-hidden="true" />
        <div className="foot-line">{FOOTER}</div>
      </div>
    </footer>
  );
}
