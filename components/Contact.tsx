import { Mail, Linkedin, MapPin, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { CONTACT } from '@/lib/content';

export function Contact() {
  return (
    <section className="block contact" id="contact" aria-label="Contact">
      <div className="container">
        <Reveal as="header" className="section-head">
          <div className="eyebrow">Contact</div>
          <h2>
            Let&apos;s <span className="italic">talk.</span>
          </h2>
          <p className="lede">{CONTACT.lede}</p>
        </Reveal>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${CONTACT.email}`}>
                <Mail strokeWidth={1.7} aria-hidden="true" />
                <span className="label">{CONTACT.email}</span>
                <ArrowRight className="arrow" strokeWidth={2} aria-hidden="true" />
              </a>
              <a
                className="contact-link"
                href={CONTACT.linkedinUrl}
                target="_blank"
                rel="noopener"
              >
                <Linkedin strokeWidth={1.7} aria-hidden="true" />
                <span className="label">{CONTACT.linkedin}</span>
                <ArrowRight className="arrow" strokeWidth={2} aria-hidden="true" />
              </a>
              <a className="contact-link" href="#" aria-disabled="true">
                <MapPin strokeWidth={1.7} aria-hidden="true" />
                <span className="label">{CONTACT.location}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
