/*
 * The animated hero visual: a fan of glass panels in the brand blues,
 * echoing the slanted accent in the TALEAD mark. Pure CSS 3D, no video.
 */

const COUNT = 18;

/** [position, front colour, back colour] along the fan. */
const STOPS: [number, string, string][] = [
  [0, '#0A1838', '#040A1A'],
  [0.2, '#16357F', '#0A1E52'],
  [0.4, '#2563EB', '#123BA8'],
  [0.54, '#3D86FF', '#1F5BEA'],
  [0.66, '#B9D6FF', '#5B9BFF'],
  [0.76, '#EEF5FF', '#9CC5FF'],
  [0.88, '#7CB4FF', '#2F6BFF'],
  [1, '#1D4ED8', '#0B2A78'],
];

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const [x, y] = [hex(a), hex(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(' ')})`;
};

function colourAt(t: number) {
  for (let i = 1; i < STOPS.length; i++) {
    const [p1, a1, b1] = STOPS[i - 1];
    const [p2, a2, b2] = STOPS[i];
    if (t <= p2) {
      const k = (t - p1) / (p2 - p1);
      return [mix(a1, a2, k), mix(b1, b2, k)];
    }
  }
  return [STOPS[STOPS.length - 1][1], STOPS[STOPS.length - 1][2]];
}

const FOCUS = 0.66;

const panels = Array.from({ length: COUNT }, (_, i) => {
  const t = i / (COUNT - 1);
  const dist = Math.abs(t - FOCUS);
  const [c1, c2] = colourAt(t);
  return {
    i,
    x: +(50 + t * 34 + Math.sin(t * Math.PI) * 7).toFixed(2),
    y: +(-20 + t * 126).toFixed(2),
    z: Math.round(-dist * 520),
    // the fan twists along its length, which gives the chevron silhouette
    rz: +(24 - t * 58).toFixed(1),
    ry: +(-50 + Math.sin(t * Math.PI) * 12).toFixed(1),
    // depth comes from fading the far panels instead of blurring them (blur is costly to render)
    opacity: +(1 - dist * 0.85).toFixed(2),
    c1,
    c2,
    small: i % 2 === 1,
  };
});

export function HeroPanels() {
  return (
    <div className="hero-panels" aria-hidden="true" data-motion>
      {panels.map((p) => (
        <span
          key={p.i}
          className={`hero-panel${p.small ? ' hero-panel--minor' : ''}`}
          style={
            {
              '--i': p.i,
              '--x': `${p.x}%`,
              '--y': `${p.y}%`,
              '--z': `${p.z}px`,
              '--rz': `${p.rz}deg`,
              '--ry': `${p.ry}deg`,
              '--o': p.opacity,
              '--c1': p.c1,
              '--c2': p.c2,
            } as React.CSSProperties
          }
        >
          <span className="hero-panel__face" />
        </span>
      ))}
    </div>
  );
}
