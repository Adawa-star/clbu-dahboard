import './Footer.css';
import { LOCATION } from '../config';

// >>> Put YOUR real links here <<<
const EMAIL = 'mailto:your@email.com';
const GITHUB = 'https://github.com/your-username';
const INSTAGRAM = 'https://instagram.com/your-handle';

// Add or remove a line to change the Quick Links (id must match a tab id)
const QUICK_LINKS = [
  { id: 'about', label: 'About Us' },
  { id: 'apod', label: 'NASA APOD' },
  { id: 'mods', label: 'Mods & DIY' },
  { id: 'pastu', label: 'PAstU Articles' },
  { id: 'weather', label: 'Astroweather' },
  { id: 'sky', label: 'Sky Map' },
];

export default function Footer({ onNavigate }) {
  // Switch tab, then scroll up so the new content is visible
  const go = (e, id) => {
    e.preventDefault();
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <section>
          <h3>CLBU &amp; PAstU</h3>
          <p>
            A dedicated hub for visual astronomy, DIY equipment modifications,
            and deep-sky observation logs from Pune.
          </p>
        </section>

        <nav aria-label="Quick links">
          <h3>Quick Links</h3>
          <ul>
            {QUICK_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => go(e, l.id)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section>
          <h3>Connect</h3>
          <ul>
            <li><a href={EMAIL}>Email Us</a></li>
            <li><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </section>

        <section>
          <h3>Local Weather</h3>
          <p className="site-footer-place">{LOCATION.name}</p>
          <button type="button" className="site-footer-btn"
            onClick={(e) => go(e, 'weather')}>
            Check Sky Conditions
          </button>
        </section>
      </div>

      <p className="site-footer-bottom">
        © 2026 CLBU &amp; PAstU. Built from scratch with React on a phone.
      </p>
    </footer>
  );
}
