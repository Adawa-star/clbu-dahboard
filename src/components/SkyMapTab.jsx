import { useMemo, useRef, useState } from 'react';
import Panel from './Panel';
import { LOCATION } from '../config';
import './SkyMapTab.css';

// VirtualSky planetarium embed (free for educational / non-profit use)
const EMBED_URL = 'https://slowe.github.io/VirtualSky/embed';

const TOGGLES = [
  { key: 'lines', label: 'Constellations' },
  { key: 'names', label: 'Names' },
  { key: 'grid', label: 'Grid' },
  { key: 'planets', label: 'Planets' },
];

export default function SkyMapTab() {
  const [projection, setProjection] = useState('stereo'); // 'stereo' = wide, 'polar' = all-sky
  const [opts, setOpts] = useState({
    lines: true,
    names: false,
    grid: false,
    planets: true,
  });
  const frameRef = useRef(null);

  const toggle = (key) => setOpts((o) => ({ ...o, [key]: !o[key] }));

  // Rebuilds the embed link whenever a button changes
  const src = useMemo(() => {
    const params = new URLSearchParams({
      latitude: LOCATION.lat,
      longitude: LOCATION.lon,
      projection,
      az: 180, // start facing south
      live: true, // sky moves in real time
      mouse: true,
      keyboard: true,
      cardinalpoints: true,
      showdate: true,
      showposition: false,
      constellations: opts.lines,
      constellationlabels: opts.names,
      showstarlabels: opts.names,
      gridlines_az: opts.grid,
      showplanets: opts.planets,
      showplanetlabels: opts.planets,
    });
    return `${EMBED_URL}?${params.toString()}`;
  }, [projection, opts]);

  const goFullscreen = () => frameRef.current?.requestFullscreen?.();

  return (
    <Panel id="sky" title="Interactive Sky Map">
      <p>
        Live sky over {LOCATION.name}, right now. Drag to look around.
      </p>

      <div className="sky-controls" role="group" aria-label="Sky map options">
        {TOGGLES.map((t) => (
          <button
            key={t.key}
            type="button"
            className="sky-chip"
            aria-pressed={opts[t.key]}
            onClick={() => toggle(t.key)}
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          className="sky-chip"
          aria-pressed={projection === 'polar'}
          onClick={() => setProjection((p) => (p === 'stereo' ? 'polar' : 'stereo'))}
        >
          {projection === 'stereo' ? 'Wide view' : 'All-sky'}
        </button>
      </div>

      <div className="sky-frame-wrap">
        <iframe
          ref={frameRef}
          src={src}
          title={`Interactive sky map for ${LOCATION.name}`}
          className="sky-frame"
          loading="lazy"
          allowFullScreen
        />
      </div>

      <div className="sky-footer">
        <button type="button" className="sky-chip" onClick={goFullscreen}>
          Fullscreen
        </button>
        <span className="sky-credit">
          Sky chart:{' '}
          <a href="https://slowe.github.io/VirtualSky/" target="_blank" rel="noreferrer">
            VirtualSky
          </a>
        </span>
      </div>
    </Panel>
  );
}
