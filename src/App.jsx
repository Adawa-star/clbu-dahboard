import { useState } from 'react';
import './App.css';
import useNightMode from './hooks/useNightMode';
import AboutTab from './components/AboutTab';
import ApodTab from './components/ApodTab';
import ModsTab from './components/ModsTab';
import PAstUTab from './components/PAstUTab';
import WeatherTab from './components/WeatherTab';
import SkyMapTab from './components/SkyMapTab';
import Footer from './components/Footer';
import NoticeTicker from './components/NoticeTicker';

const icon = (children) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

// To add a new tab later: add one line here and one component file.
const TABS = [
  { id: 'about', label: 'About', Component: AboutTab,
    icon: icon(<><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>) },
  { id: 'apod', label: 'APOD', Component: ApodTab,
    icon: icon(<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>) },
  { id: 'mods', label: 'Mods', Component: ModsTab,
    icon: icon(<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />) },
  { id: 'pastu', label: 'PAstU', Component: PAstUTab,
    icon: icon(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>) },
  { id: 'weather', label: 'Weather', Component: WeatherTab,
    icon: icon(<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />) },
  { id: 'sky', label: 'Sky Map', Component: SkyMapTab,
    icon: icon(<><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>) },
];

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [night, toggleNight] = useNightMode();

  const ActivePanel = TABS.find((t) => t.id === activeTab).Component;

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
  {/* LEFT SIDE: The Logo */}
  <div className="topbar-left">
    <img src="/logo.png" alt="CLBU & PAstU" className="brand-logo" />
  </div>

  {/* CENTER: The Redlight Toggle */}
  <div className="topbar-center">
    <button type="button" className="night-toggle"
      onClick={toggleNight} aria-pressed={night}>
      {night ? 'Redlight: ON': 'Redlight: OFF'}
    </button>
  </div>

  {/* RIGHT SIDE: The Est. Date */}
  <div className="topbar-right">
    <span className="est">Est. 2026</span>
  </div>
</header>

      <nav className="nav-tabs" role="tablist" aria-label="Main Navigation">
        {TABS.map((tab, i) => (
          <button key={tab.id} type="button" role="tab" id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleTabKeyDown(e, i)}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <NoticeTicker message="NOTICE: We are sorry for the inconvenience caused, you can't read articles yet in PAstU Tab and some other tabs. It is currently work in progress." />


      <main className="main-container">
        <ActivePanel />
      </main>

      <Footer onNavigate={setActiveTab} />
    </div>
  );
}

export default App;
