import Panel from './Panel';

export default function PAstUTab() {
  return (
    <Panel title="PAstU Monthly Articles">
      <div className="card-grid">
        
        <div className="article-card">
          <div className="card-img"></div>
          <div className="card-content">
            <h3>Oct 2026: PAstU org info</h3>
            <p>PAstU less active? Here's why (read).</p>
            <button className="card-btn">Read Article</button>
          </div>
        </div>

        <div className="article-card">
          <div className="card-img"></div>
          <div className="card-content">
            <h3>Sep 2026: Saturn</h3>
            <p>Understanding the Pickering scale to judge atmospheric seeing.</p>
            <button className="card-btn">Read Article</button>
          </div>
        </div>

        <div className="article-card">
          <div className="card-img"></div>
          <div className="card-content">
            <h3>Aug 2026: Perseids</h3>
            <p>How to photograph the Perseid meteor shower with just a phone.</p>
            <button className="card-btn">Read Article</button>
          </div>
        </div>

        <div className="article-card">
          <div className="card-img"></div>
          <div className="card-content">
            <h3>Jul 2026: Lunar 100</h3>
            <p>Starting the Lunar 100 challenge: exploring the Moon's craters.</p>
            <button className="card-btn">Read Article</button>
          </div>
        </div>

      </div>
    </Panel>
  );
}