// src/components/AboutTab.jsx
import Panel from './Panel';

export default function AboutTab() {
  return (
    <Panel title="About CLBU & PAstU">
      
      {/* 1. THE BANNER IMAGE */}
      <div className="about-banner">
        <img src="/aboutprog.jpg" alt="CLBU & PAstU" />
        <div className="about-banner-text">
          <h2>Welcome to the Hub</h2>
          <p>Dedicated to visual astronomy and DIY engineering.</p>
        </div>
      </div>

      {/* 2. THE WELCOME TEXT */}
      <div className="about-text">
        <p>
          <strong>CLBU & PAstU</strong> was founded in 2024-25 indpendently and progressively. 
          We host astronomy and CLBU products.
        </p>
        <p>
          We CLBU and PAstU together spread the love of astronomy and be the first to host a market online in Praouty.
        </p>
      </div>

      {/* 3. THE FEATURE GRID */}
      <div className="about-features">
        <div className="feature-item">
          <span className="feature-icon">🔭</span>
          <h4>Visual Astronomy</h4>
          <p>Sharing guides on how to find faint galaxies, nebulae, and star clusters using averted vision.</p>
        </div>
        
        <div className="feature-item">
          <span className="feature-icon">🛠️</span>
          <h4>DIY Mods</h4>
          <p>Building and modifying equipment. From flocking Newtonian tubes to creating custom power banks.</p>
        </div>

        <div className="feature-item">
          <span className="feature-icon">📝</span>
          <h4>PAstU Articles</h4>
          <p>Monthly deep-sky challenges and observing reports published for our community.</p>
        </div>
      </div>

    </Panel>
  );
}