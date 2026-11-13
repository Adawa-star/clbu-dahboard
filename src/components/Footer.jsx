import { Link } from 'react-router-dom';
import './Footer.css';

const EMAIL = 'mailto:your@email.com';
const GITHUB = 'https://github.com/Adawa-star';
const INSTAGRAM = 'https://instagram.com/your-handle';

const QUICK_LINKS = [
  { id: 'about', label: 'About Us', path: '/' },
  { id: 'apod', label: 'NASA APOD', path: '/apod' },
  { id: 'mods', label: 'Mods & DIY', path: '/mods' },
  { id: 'pastu', label: 'PAstU Articles', path: '/pastu' },
  { id: 'weather', label: 'Astroweather', path: '/weather' },
  { id: 'skymap', label: 'Sky Map', path: '/skymap' },
];

// We now accept isAdmin, onLoginClick, and onLogout as props
export default function Footer({ isModerator, onLoginClick, onLogout }) {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        
        <section>
          <h3>CLBU &amp; PAstU</h3>
          <p>
            A dedicated hub for visual astronomy, DIY equipment
            modifications, and deep-sky observation logs from Pune.
          </p>
        </section>

        <nav aria-label="Quick links">
          <h3>Quick Links</h3>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.id}>
                <Link to={link.path} onClick={handleScroll}>
                  {link.label}
                </Link>
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
            
            {/* The Admin Login is now inside the Connect list */}
            <li>
              {isModerator ? (
                <button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: '#b8543d', padding: 0, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                  Moderator Logout
                </button>
              ) : (
                <button onClick={onLoginClick} style={{ background: 'transparent', border: 'none', color: '#c17c4a', padding: 0, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                  Moderator Login
                </button>
              )}
            </li>
          </ul>
        </section>

        <section>
          <h3>Local Weather</h3>
          <p>Pune, Maharashtra</p>
          <Link 
            to="/weather" 
            onClick={handleScroll}
            style={{ display: 'inline-block', textDecoration: 'none', background: 'transparent', color: '#c17c4a', border: '1px solid #c17c4a', padding: '5px 10px', borderRadius: '4px', fontSize: '0.75rem' }}
          >
            Check Sky Conditions
          </Link>
        </section>

      </div>

      <div className="site-footer-bottom">
        <p>© 2026 CLBU &amp; PAstU. Built from scratch with React.</p>
      </div>
    </footer>
  );
}