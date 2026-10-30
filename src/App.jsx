import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPOD = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=YOUR_NASA_API_KEY_HERE`);
        const data = await response.json();
        setApod(data);
      } catch (error) {
        console.error("Error fetching NASA data:", error);
      }
      setLoading(false);
    };
    fetchAPOD();
  }, []);

  return (
    <div>
      <header className="topbar">
        <h1 className="brand-name">CLBU & PAstU</h1>
        <span style={{ fontSize: '0.8rem', color: '#c9b8a8' }}>Est. 2026</span>
      </header>

      {/* ACCESSIBILITY: role="tablist" tells screen readers this is a tab menu */}
      <nav className="nav-tabs" role="tablist" aria-label="Main Navigation">
        
        {/* INFO ICON */}
        <button role="tab" aria-selected={activeTab === 'about'} className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          About
        </button>

        {/* CAMERA ICON */}
        <button role="tab" aria-selected={activeTab === 'apod'} className={activeTab === 'apod' ? 'active' : ''} onClick={() => setActiveTab('apod')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          APOD
        </button>

        {/* WRENCH ICON */}
        <button role="tab" aria-selected={activeTab === 'mods'} className={activeTab === 'mods' ? 'active' : ''} onClick={() => setActiveTab('mods')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          Mods
        </button>

        {/* FILE ICON */}
        <button role="tab" aria-selected={activeTab === 'pastu'} className={activeTab === 'pastu' ? 'active' : ''} onClick={() => setActiveTab('pastu')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          PAstU
        </button>

        {/* CLOUD ICON */}
        <button role="tab" aria-selected={activeTab === 'weather'} className={activeTab === 'weather' ? 'active' : ''} onClick={() => setActiveTab('weather')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
          Weather
        </button>
      </nav>

      <main className="main-container">
        {/* ACCESSIBILITY: role="tabpanel" links this content to the tabs */}
        
        {activeTab === 'about' && (
          <div className="panel" role="tabpanel">
            <div className="panel-header"><h2>About CLBU & PAstU</h2></div>
            <div className="panel-body">
              <p>Welcome to the official hub of CLBU and PAstU. This is a space dedicated to visual astronomy, equipment modifications, and monthly deep-sky observations.</p>
            </div>
          </div>
        )}

        {activeTab === 'apod' && (
  <div className="panel" role="tabpanel">
    <div className="panel-header"><h2>NASA Picture of the Day</h2></div>
    <div className="panel-body">
      {loading ? (
        <p>Loading the Universe... 🌌</p>
      ) : apod ? (
        <div>
          <h3 style={{ fontFamily: 'Playfair Display, serif' }}>{apod.title}</h3>
          
          {/* Check if it's an image OR a video */}
          {apod.media_type === 'image' ? (
            <img 
              src={apod.hdurl || apod.url} 
              alt={apod.title} 
              className="apod-img" 
              style={{ width: '100%', borderRadius: '8px', border: '1px solid #e5dcd0' }}
            />
          ) : (
            <iframe 
              src={apod.url} 
              title={apod.title} 
              style={{ width: '100%', height: '300px', border: 'none', borderRadius: '8px' }}
              allowFullScreen 
            />
          )}

          <p style={{ marginTop: '15px' }}>{apod.explanation}</p>
          <p style={{ fontSize: '0.8rem', color: '#8a7a6a' }}>
            Credit: {apod.copyright || 'NASA'}
          </p>
        </div>
      ) : (
        <div style={{ color: 'red' }}>
          <p>Failed to load NASA data.</p>
          <p>Check your API key or internet connection.</p>
        </div>
      )}
    </div>
  </div>
)}

        {activeTab === 'mods' && (
          <div className="panel" role="tabpanel">
            <div className="panel-header"><h2>Equipment Mods & DIY</h2></div>
            <div className="panel-body">
              <p>Custom modifications for telescopes and mounts.</p>
            </div>
          </div>
        )}

        {activeTab === 'pastu' && (
          <div className="panel" role="tabpanel">
            <div className="panel-header"><h2>PAstU Monthly Articles</h2></div>
            <div className="panel-body">
              <p><strong>October 2026:</strong> A Guide to Spotting the Andromeda Galaxy.</p>
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="panel" role="tabpanel">
            <div className="panel-header"><h2>Live Astroweather</h2></div>
            <div className="panel-body">
              <p>Coming soon...</p>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 CLBU & PAstU. Built from scratch with React.</p>
      </footer>
    </div>
  );
}

export default App;