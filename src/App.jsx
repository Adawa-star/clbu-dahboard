import { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
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
import LoginModal from './components/LoginModal';
import { supabase } from './supabaseClient';

const icon = (children) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const TABS = [
  { id: 'about', label: 'About', path: '/', Component: AboutTab, icon: icon(<><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>) },
  { id: 'apod', label: 'APOD', path: '/apod', Component: ApodTab, icon: icon(<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>) },
  { id: 'mods', label: 'Mods', path: '/mods', Component: ModsTab, icon: icon(<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />) },
  { id: 'pastu', label: 'PAstU', path: '/pastu', Component: PAstUTab, icon: icon(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>) },
  { id: 'weather', label: 'Weather', path: '/weather', Component: WeatherTab, icon: icon(<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />) },
  { id: 'skymap', label: 'Sky Map', path: '/skymap', Component: SkyMapTab, icon: icon(<><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>) },
];

function App() {
  const [night, toggleNight] = useNightMode();
  const [isVisible, setIsVisible] = useState(false);
  
  const [isModerator, setIsModerator] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user.email === 'your-admin-email@gmail.com') {
        setIsModerator(true);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user.email === 'your-admin-email@gmail.com') {
        setIsModerator(true);
      } else {
        setIsModerator(false);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
  supabase.auth.signOut();
};
  
  return (
    <div>
      <header className="topbar">
        <div className="topbar-left">
          <img src="/logo.png" alt="CLBU & PAstU" className="brand-logo" />
        </div>
        <div className="topbar-center">
          <button type="button" className="night-toggle" onClick={toggleNight} aria-pressed={night}>
            {night ? 'Redlight: ON': 'Redlight: OFF'}
          </button>
        </div>
        <div className="topbar-right">
          <span className="est">Est. 2026</span>
        </div>
      </header>

      <nav className="nav-tabs" role="tablist" aria-label="Main Navigation">
        {TABS.map((tab) => (
          <NavLink key={tab.id} to={tab.path} className={({ isActive }) => isActive ? 'active' : ''}>
            {tab.icon}
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <NoticeTicker message="NOTICE: We are sorry for the inconvenience caused, you can't read articles yet. ALSO: You can be a Moderator now. To be one, check out in the footer section." />

      <main className="main-container">
        <Routes>
          {TABS.map((tab) => {
            const Component = tab.Component;
            return (
              <Route 
                key={tab.id} 
                path={tab.path} 
                element={tab.id === 'pastu' ? <Component isModerator={isModerator} /> : <Component />} 
              />
            );
          })}
        </Routes>
      </main>

      <Footer 
  isModerator={isModerator} 
  onLoginClick={() => setShowLogin(true)} 
  onLogout={handleLogout} 
/>


      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {isVisible && (
  <button 
    className="scroll-top-btn"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    {/* Bigger, cleaner SVG arrow */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  </button>
)}

    </div>
  );
}

export default App;