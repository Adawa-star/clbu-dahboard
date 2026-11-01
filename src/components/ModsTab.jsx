import Panel from './Panel';

export default function ModsTab() {
  return (
    <Panel title="Equipment Mods & DIY">
      <div className="card-grid">
        
        <div className="article-card">
          <div className="card-img"></div>
          <div className="card-content">
            <h3>Flocking a Newtonian</h3>
            <p>Reduce internal reflections and boost contrast for visual observing.</p>
            <button className="card-btn">Read Guide</button>
          </div>
        </div>

        <div className="article-card">
          <div className="card-img"></div>
          <div className="card-content">
            <h3>DIY Dew Heater</h3>
            <p>Build a cheap, battery-powered dew heater to keep your eyepieces clear.</p>
            <button className="card-btn">Read Guide</button>
          </div>
        </div>

        <div className="article-card">
          <div className="card-img"></div>
          <div className="card-content">
            <h3>Powering a GoTo Mount</h3>
            <p>How to build a safe, portable 12V power bank for your telescope mount.</p>
            <button className="card-btn">Read Guide</button>
          </div>
        </div>

        <div className="article-card">
          <div className="card-img"></div>
          <div className="card-content">
            <h3>Collimating a Reflector</h3>
            <p>A beginner's guide to aligning the mirrors for sharp planetary views.</p>
            <button className="card-btn">Read Guide</button>
          </div>
        </div>

      </div>
    </Panel>
  );
}