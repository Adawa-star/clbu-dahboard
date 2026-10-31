import { useState, useEffect } from 'react';
import Panel from './Panel';

// Keeps today's APOD in memory so re-opening the tab doesn't refetch
let cache = null;

export default function ApodTab() {
  const [apod, setApod] = useState(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache) return;
    const controller = new AbortController();
    // Put your key in .env as VITE_NASA_KEY=... (keep .env out of git)
    const key = import.meta.env.VITE_NASA_KEY || 'DEMO_KEY';

    (async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${key}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`NASA API error ${res.status}`);
        cache = await res.json();
        setApod(cache);
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

  return (
    <Panel id="apod" title="NASA Picture of the Day">
      {loading ? (
        <p>Loading the Universe... 🌌</p>
      ) : apod && !error ? (
        <div>
          <h3 className="apod-title">{apod.title}</h3>

          {apod.media_type === 'image' ? (
            <>
              <img src={apod.url} alt={apod.title} className="apod-img" loading="lazy" />
              {apod.hdurl && (
                <p className="apod-small">
                  <a href={apod.hdurl} target="_blank" rel="noreferrer">
                    View full-resolution image
                  </a>
                </p>
              )}
            </>
          ) : (
            <iframe src={apod.url} title={apod.title} className="apod-frame" allowFullScreen />
          )}

          <p className="apod-explain">{apod.explanation}</p>
          <p className="apod-credit">Credit: {apod.copyright || 'NASA'}</p>
        </div>
      ) : (
        <div role="alert" className="error-text">
          <p>Failed to load NASA data.</p>
          <p>Check your API key, rate limit, or internet connection.</p>
        </div>
      )}
    </Panel>
  );
}
