import { useState, useEffect } from 'react';
import './App.css';

const icon = (children) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const TABS = [
  {
    id: 'about',
    label: 'About',
    icon: icon(
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
  },
  {
    id: 'apod',
    label: 'APOD',
    icon: icon(
      <>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
  },
  {
    id: 'mods',
    label: 'Mods',
    icon: icon(
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
  },
  {
    id: 'pastu',
    label: 'PAstU',
    icon: icon(
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
  },
  {
    id: 'weather',
    label: 'Weather',
    icon: icon(<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />),
  },
];

function Panel({ id, title, children }) {
  return (
    <div
      className="panel"
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
    >
      <div className="panel-header">
        <h2>{title}</h2>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    // Put your key in a .env file as VITE_NASA_KEY=... (and keep .env out of git)
    const key = import.meta.env.VITE_NASA_KEY || 'DEMO_KEY';

    (async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${key}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`NASA API error ${res.status}`);
        setApod(await res.json());
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching NASA data:', err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  // Arrow keys / Home / End move between tabs (expected for role="tablist")
  const handleTabKeyDown = (e, index) => {
    let next = null;
    if (e.key === 'ArrowRight') next = (index + 1) % TABS.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActiveTab(TABS[next].id);
    document.getElementById(`tab-${TABS[next].id}`)?.focus();
  };

  return (
    <div>
      <header className="topbar">
        <h1 className="brand-name">CLBU &amp; PAstU</h1>
        <span style={{ fontSize: '0.8rem', color: '#c9b8a8' }}>Est. 2026</span>
      </header>

      <nav
        className="nav-tabs"
        role="tablist"
        aria-label="Main Navigation"
        style={{ overflowX: 'auto' }}
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleTabKeyDown(e, i)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main-container">
        {activeTab === 'about' && (
          <Panel id="about" title="About CLBU & PAstU">
            <p>
              Welcome to the official hub of CLBU and PAstU. This is a space
              dedicated to visual astronomy, equipment modifications, and
              monthly deep-sky observations.
            </p>
          </Panel>
        )}

        {activeTab === 'apod' && (
          <Panel id="apod" title="NASA Picture of the Day">
            {loading ? (
              <p>Loading the Universe... 🌌</p>
            ) : apod && !error ? (
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif' }}>
                  {apod.title}
                </h3>

                {apod.media_type === 'image' ? (
                  <>
                    <img
                      src={apod.url}
                      alt={apod.title}
                      className="apod-img"
                      loading="lazy"
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        border: '1px solid #e5dcd0',
                      }}
                    />
                    {apod.hdurl && (
                      <p style={{ fontSize: '0.85rem' }}>
                        <a href={apod.hdurl} target="_blank" rel="noreferrer">
                          View full-resolution image
                        </a>
                      </p>
                    )}
                  </>
                ) : (
                  <iframe
                    src={apod.url}
                    title={apod.title}
                    style={{
                      width: '100%',
                      height: '300px',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                    allowFullScreen
                  />
                )}

                <p style={{ marginTop: '15px' }}>{apod.explanation}</p>
                <p style={{ fontSize: '0.8rem', color: '#8a7a6a' }}>
                  Credit: {apod.copyright || 'NASA'}
                </p>
              </div>
            ) : (
              <div role="alert" style={{ color: '#b00020' }}>
                <p>Failed to load NASA data.</p>
                <p>Check your API key, rate limit, or internet connection.</p>
              </div>
            )}
          </Panel>
        )}

        {activeTab === 'mods' && (
          <Panel id="mods" title="Equipment Mods & DIY">
            <p>Custom modifications for telescopes and mounts.</p>
          </Panel>
        )}

        {activeTab === 'pastu' && (
          <Panel id="pastu" title="PAstU Monthly Articles">
            <p>
              <strong>October 2026:</strong> A Guide to Spotting the Andromeda
              Galaxy.
            </p>
          </Panel>
        )}

        {activeTab === 'weather' && (
          <Panel id="weather" title="Live Astroweather">
            <p>Coming soon...</p>
          </Panel>
        )}
      </main>

      {/* DENSE FOOTER */}
<footer className="site-footer">
  <div className="footer-grid">
    
    <div className="footer-col">
      <h4>CLBU & PAstU</h4>
      <p>A dedicated hub for visual astronomy, DIY equipment modifications, and deep-sky observation logs from Pune.</p>
    </div>

    <div className="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}>About Us</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('apod'); }}>NASA APOD</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('mods'); }}>Mods & DIY</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('pastu'); }}>PAstU Articles</a></li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>Connect</h4>
      <ul>
        <li><a href="mailto:contact@clbu.in">Email Us</a></li>
        <li><a href="https://github.com/Adawa-star" target="_blank" rel="noreferrer">GitHub</a></li>
        <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>Local Weather</h4>
      <p style={{ fontSize: '0.8rem', marginBottom: '10px' }}>Pune, Maharashtra</p>
      <button 
        onClick={() => setActiveTab('weather')}
        style={{ background: 'transparent', color: '#c17c4a', border: '1px solid #c17c4a', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
      >
        Check Sky Conditions
      </button>
    </div>

    </div>

    <div className="footer-bottom">
    <p>© 2026 CLBU & PAstU. Rights reserved.</p>
    </div>
    </footer>
      
    </div>
  );
}

export default App;
