import { CIRCUIT, MONOGRAM } from '@/components/brand/paths';
import type { ArtName } from '@/content/types';
import { floorGrid, H, isoBox, r1, rng, W } from './geometry';

/*
 * On-brand vector illustrations used for heroes, cards and menus.
 * Gradient ids are derived from the illustration name; repeated
 * illustrations on one page share identical definitions.
 */

const MARK_W = 193.249;

type ArtProps = { p: string };

function Mark({ x, y, width, color = '#fff', accent = '#7CB4FF' }: { x: number; y: number; width: number; color?: string; accent?: string }) {
  const height = (width * 174.701) / MARK_W;
  return (
    <use
      href="#tl-mark"
      x={(x - width / 2).toFixed(1)}
      y={(y - height / 2).toFixed(1)}
      width={width}
      height={height.toFixed(1)}
      style={{ color, '--logo-accent': accent } as React.CSSProperties}
    />
  );
}

function Frame({
  p,
  name,
  children,
  cx = '68%',
  cy = '38%',
  className = '',
}: {
  p: string;
  name: string;
  children: React.ReactNode;
  cx?: string;
  cy?: string;
  className?: string;
}) {
  return (
    <svg
      className={`art art--${name} ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      data-motion
    >
      <defs>
        <radialGradient id={`${p}-bg`} cx={cx} cy={cy} r="85%">
          <stop offset="0" stopColor="#11307A" />
          <stop offset="0.42" stopColor="#081638" />
          <stop offset="1" stopColor="#02040A" />
        </radialGradient>
        <filter id={`${p}-blur`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id={`${p}-soft`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <rect width={W} height={H} fill={`url(#${p}-bg)`} />
      {children}
    </svg>
  );
}

function Stars({ seed, count = 40, maxY = 260 }: { seed: number; count?: number; maxY?: number }) {
  const rand = rng(seed);
  return (
    <g fill="#fff">
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={r1(rand() * W)} cy={r1(rand() * maxY)} r={r1(0.4 + rand() * 0.9)} opacity={r1(0.15 + rand() * 0.5)} />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ keys */

const KEY = 64;
const keyCells = (() => {
  const cells: { x: number; y: number; hot: boolean; k: string }[] = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++)
      cells.push({ x: (c - 2) * (KEY + 14), y: (r - 2) * (KEY + 14), hot: r === 2 && c === 2, k: `${r}${c}` });
  return cells.sort((a, b) => a.x + a.y - (b.x + b.y));
})();

function Keys({ p }: ArtProps) {
  return (
    <Frame p={p} name="keys" cx="50%" cy="48%">
      <defs>
        <linearGradient id={`${p}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1B2540" />
          <stop offset="1" stopColor="#060A14" />
        </linearGradient>
        <linearGradient id={`${p}-hot`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6AA6FF" />
          <stop offset="1" stopColor="#0B3FA8" />
        </linearGradient>
      </defs>
      <g transform="translate(400 250) matrix(0.866 0.5 -0.866 0.5 0 0)">
        {keyCells.map((cell) => (
          <g key={cell.k} transform={`translate(${cell.x} ${cell.y})`}>
            {cell.hot && (
              <rect x={-KEY} y={-KEY} width={KEY * 2} height={KEY * 2} rx="40" fill="#2F7BFF" opacity="0.8" filter={`url(#${p}-blur)`} />
            )}
            <rect x={-KEY / 2 + 9} y={-KEY / 2 + 9} width={KEY} height={KEY} rx="13" fill="#010205" />
            <rect
              x={-KEY / 2}
              y={-KEY / 2}
              width={KEY}
              height={KEY}
              rx="13"
              fill={cell.hot ? `url(#${p}-hot)` : `url(#${p}-face)`}
              stroke={cell.hot ? '#CFE2FF' : 'rgba(255,255,255,0.16)'}
            />
            {cell.hot && <Mark x={0} y={0} width={40} accent="#DCEBFF" />}
          </g>
        ))}
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- glassT */

function GlassT({ p }: ArtProps) {
  return (
    <Frame p={p} name="glassT" cx="64%" cy="30%">
      <defs>
        <linearGradient id={`${p}-t`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CFE2FF" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#2F7BFF" stopOpacity="0.75" />
          <stop offset="1" stopColor="#0B1F4D" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${p}-beam`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Stars seed={3} count={30} maxY={500} />
      <g transform="translate(470 262) scale(1.75) translate(-153.08 -91.84)">
        <path d={MONOGRAM} fill="#2F7BFF" opacity="0.55" filter={`url(#${p}-blur)`} />
        <path d={MONOGRAM} fill={`url(#${p}-t)`} stroke="rgba(255,255,255,0.55)" strokeWidth="0.7" />
        <path d={CIRCUIT} fill="#7CB4FF" opacity="0.6" />
      </g>
      <g transform="rotate(-32 400 250)">
        <rect x="-160" y="232" width="1120" height="34" fill={`url(#${p}-beam)`} opacity="0.45" filter={`url(#${p}-blur)`} />
        <rect x="-160" y="247" width="1120" height="3" fill={`url(#${p}-beam)`} filter={`url(#${p}-soft)`} />
        <rect x="-160" y="248" width="1120" height="1" fill={`url(#${p}-beam)`} />
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- neural */

const neural = (() => {
  const N = 110;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tilt = 0.42;
  const spin = 0.7;
  const p3 = Array.from({ length: N }, (_, i) => {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * rad;
    const z = Math.sin(th) * rad;
    const x1 = x * Math.cos(spin) + z * Math.sin(spin);
    const z1 = -x * Math.sin(spin) + z * Math.cos(spin);
    return { x: x1, y: y * Math.cos(tilt) - z1 * Math.sin(tilt), z: y * Math.sin(tilt) + z1 * Math.cos(tilt) };
  });
  const R = 178;
  const cx = 430;
  const cy = 250;
  const nodes = p3.map((p) => ({ x: r1(cx + p.x * R), y: r1(cy + p.y * R), z: p.z }));
  const edges: { a: number; b: number; z: number }[] = [];
  for (let i = 0; i < N; i++)
    for (let j = i + 1; j < N; j++) {
      const d = Math.hypot(p3[i].x - p3[j].x, p3[i].y - p3[j].y, p3[i].z - p3[j].z);
      if (d < 0.4) edges.push({ a: i, b: j, z: (p3[i].z + p3[j].z) / 2 });
    }
  return { nodes, edges, cx, cy };
})();

function Neural({ p }: ArtProps) {
  const { nodes, edges, cx, cy } = neural;
  return (
    <Frame p={p} name="neural" cx="55%" cy="50%">
      <defs>
        <radialGradient id={`${p}-core`}>
          <stop offset="0" stopColor="#2F7BFF" stopOpacity="0.65" />
          <stop offset="1" stopColor="#2F7BFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r="230" fill={`url(#${p}-core)`} />
      <g fill="none" stroke="#7CB4FF">
        <ellipse cx={cx} cy={cy} rx="300" ry="62" transform={`rotate(-18 ${cx} ${cy})`} strokeOpacity="0.28" />
        <ellipse cx={cx} cy={cy} rx="270" ry="48" transform={`rotate(24 ${cx} ${cy})`} strokeOpacity="0.18" />
      </g>
      <g stroke="#8DBBFF" strokeWidth="0.9">
        {edges.map((e, i) => (
          <line
            key={i}
            x1={nodes[e.a].x}
            y1={nodes[e.a].y}
            x2={nodes[e.b].x}
            y2={nodes[e.b].y}
            strokeOpacity={r1(0.08 + ((e.z + 1) / 2) * 0.42)}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={r1(1.3 + (n.z + 1) * 1.5)}
            fill={n.z > 0.35 ? '#fff' : '#7CB4FF'}
            opacity={r1(0.3 + ((n.z + 1) / 2) * 0.7)}
          />
        ))}
      </g>
      <g filter={`url(#${p}-soft)`} fill="#CFE2FF">
        {nodes
          .filter((n) => n.z > 0.75)
          .map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="5" opacity="0.7" />
          ))}
      </g>
    </Frame>
  );
}

/* ---------------------------------------------------------------- shield */

const SHIELD = 'M0 -112 96 -80V-2c0 62-42 102-96 126C-54 100-96 60-96-2v-78Z';

function Shield({ p }: ArtProps) {
  return (
    <Frame p={p} name="shield" cx="50%" cy="50%">
      <defs>
        <pattern id={`${p}-hex`} width="34" height="58.9" patternUnits="userSpaceOnUse">
          <path d="M17 0 34 9.8v19.6L17 39.3 0 29.4V9.8ZM17 39.3v19.6" fill="none" stroke="#5B9BFF" strokeOpacity="0.2" />
        </pattern>
        <radialGradient id={`${p}-fade`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`${p}-mask`}>
          <rect width={W} height={H} fill={`url(#${p}-fade)`} />
        </mask>
        <linearGradient id={`${p}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4C90FF" />
          <stop offset="1" stopColor="#0B2F8A" />
        </linearGradient>
        <linearGradient id={`${p}-scan`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${p}-hex)`} mask={`url(#${p}-mask)`} />
      <g transform="translate(400 250)">
        {[2.3, 1.8, 1.4].map((s, i) => (
          <path
            key={s}
            d={SHIELD}
            transform={`scale(${s})`}
            fill="none"
            stroke="#5B9BFF"
            strokeOpacity={0.14 + i * 0.12}
            strokeWidth={(1.4 / s).toFixed(2)}
          />
        ))}
        <path d={SHIELD} fill="#2F7BFF" opacity="0.7" filter={`url(#${p}-blur)`} />
        <path d={SHIELD} fill={`url(#${p}-fill)`} stroke="#CFE2FF" strokeWidth="1.5" />
        <circle cx="0" cy="-14" r="17" fill="#fff" />
        <path d="M-9-2h18l5 44h-28z" fill="#fff" />
        <g className="art-scan">
          <rect x="-120" y="-1" width="240" height="2" fill={`url(#${p}-scan)`} />
        </g>
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ grid */

const gridFloor = floorGrid(400, 212);
const gridBoxes = [
  { x: 300, y: 380, w: 70, d: 70, h: 120 },
  { x: 520, y: 360, w: 70, d: 70, h: 170 },
  { x: 410, y: 440, w: 80, d: 80, h: 95 },
].map((b) => ({ ...b, box: isoBox(b.x, b.y, b.w, b.d, b.h) }));

function GridArt({ p }: ArtProps) {
  return (
    <Frame p={p} name="grid" cx="50%" cy="40%">
      <defs>
        <linearGradient id={`${p}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <mask id={`${p}-mask`}>
          <rect width={W} height={H} fill={`url(#${p}-floor)`} />
        </mask>
        <linearGradient id={`${p}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CFE2FF" />
          <stop offset="1" stopColor="#5B9BFF" />
        </linearGradient>
        <linearGradient id={`${p}-beam`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#7CB4FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#7CB4FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="400" cy="212" rx="420" ry="46" fill="#2F7BFF" opacity="0.45" filter={`url(#${p}-blur)`} />
      <g stroke="#4C8DFF" strokeWidth="1" mask={`url(#${p}-mask)`} opacity="0.55">
        {gridFloor.map((l, i) => (
          <line key={i} {...l} />
        ))}
      </g>
      {gridBoxes.map((b, i) => (
        <g key={i}>
          <rect x={r1(b.x - 3)} y={r1(b.y - b.h - 220)} width="6" height="220" fill={`url(#${p}-beam)`} opacity="0.5" />
          <polygon points={b.box.left} fill="#0B2A78" stroke="#5B9BFF" strokeOpacity="0.5" />
          <polygon points={b.box.right} fill="#1847C2" stroke="#5B9BFF" strokeOpacity="0.5" />
          <polygon points={b.box.top} fill={`url(#${p}-top)`} />
          <g stroke="#fff" strokeOpacity="0.16">
            {b.box.lines(14).map((l, j) => (
              <line key={j} {...l} />
            ))}
          </g>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------- circuit */

const traces = [
  'M40 500V400l100-100V180',
  'M100 500V420l110-110V230h255',
  'M160 500V440l100-100v-70h205',
  'M0 150h180l50 50h235',
  'M0 80h270l40 40h80',
  'M575 200h70l60-60h95',
  'M575 230h225',
  'M575 260h75l60 60v180',
  'M520 175V80l60-60h220',
  'M545 285v75l55 55h200',
];
const rings: [number, number][] = [
  [140, 180],
  [390, 120],
  [40, 500],
  [710, 500],
];

function Circuit({ p }: ArtProps) {
  return (
    <Frame p={p} name="circuit" cx="66%" cy="46%">
      <defs>
        <linearGradient id={`${p}-chip`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B9BFF" />
          <stop offset="1" stopColor="#0B2F8A" />
        </linearGradient>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4">
        {traces.map((d, i) => (
          <path key={`b${i}`} d={d} stroke="#2563EB" strokeOpacity="0.45" />
        ))}
        {traces.map((d, i) => (
          <path
            key={`p${i}`}
            d={d}
            stroke="#BFD8FF"
            className="art-pulse"
            pathLength={100}
            style={{ animationDelay: `${(i * 0.37) % 3}s` }}
          />
        ))}
      </g>
      {rings.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#04081A" stroke="#7CB4FF" strokeWidth="2.4" />
      ))}
      <rect x="455" y="165" width="130" height="130" rx="22" fill="#2F7BFF" opacity="0.7" filter={`url(#${p}-blur)`} />
      <rect x="465" y="175" width="110" height="110" rx="18" fill={`url(#${p}-chip)`} stroke="#CFE2FF" />
      <Mark x={520} y={230} width={62} accent="#DCEBFF" />
    </Frame>
  );
}

/* ----------------------------------------------------------------- waves */

function wavePaths(count: number, base: number, spread: number, seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const amp = 38 + i * 2.4;
    const freq = 0.0105 + i * 0.00012;
    const phase = i * 0.22 + seed;
    const yBase = base + i * spread;
    let d = '';
    for (let x = -20; x <= 820; x += 12) {
      const y = yBase + amp * Math.sin(x * freq + phase) + 18 * Math.sin(x * 0.004 + i * 0.5);
      d += `${x === -20 ? 'M' : 'L'}${x} ${r1(y)}`;
    }
    return { d, o: r1(0.16 + 0.62 * Math.sin((i / (count - 1)) * Math.PI)) };
  });
}

const wavesMain = wavePaths(26, 196, 5.2, 0);

function WavesDefs({ p }: ArtProps) {
  return (
    <defs>
      <linearGradient id={`${p}-wave`} x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0B3FA8" />
        <stop offset="0.35" stopColor="#2F7BFF" />
        <stop offset="0.6" stopColor="#CFE2FF" />
        <stop offset="0.8" stopColor="#ffffff" />
        <stop offset="1" stopColor="#2F7BFF" />
      </linearGradient>
    </defs>
  );
}

function Waves({ p }: ArtProps) {
  return (
    <Frame p={p} name="waves" cx="60%" cy="45%">
      <WavesDefs p={p} />
      <g fill="none" stroke={`url(#${p}-wave)`} strokeWidth="5" filter={`url(#${p}-blur)`} opacity="0.35">
        {wavesMain.filter((_, i) => i % 3 === 0).map((w, i) => (
          <path key={i} d={w.d} />
        ))}
      </g>
      <g fill="none" stroke={`url(#${p}-wave)`} strokeWidth="1.2">
        {wavesMain.map((w, i) => (
          <path key={i} d={w.d} strokeOpacity={w.o} />
        ))}
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------ government */

const govBox = isoBox(420, 430, 250, 190, 210);
const govCore = isoBox(420, 405, 120, 90, 170);
const govWaves = wavePaths(14, 300, 6, 1.4);

function Government({ p }: ArtProps) {
  return (
    <Frame p={p} name="government" cx="55%" cy="32%">
      <WavesDefs p={p} />
      <Stars seed={11} count={26} maxY={180} />
      <ellipse cx="420" cy="440" rx="330" ry="40" fill="#2F7BFF" opacity="0.35" filter={`url(#${p}-blur)`} />
      <polygon points={govCore.left} fill="#CFE2FF" fillOpacity="0.06" stroke="#7CB4FF" strokeOpacity="0.25" />
      <polygon points={govCore.right} fill="#CFE2FF" fillOpacity="0.08" stroke="#7CB4FF" strokeOpacity="0.25" />
      <polygon points={govBox.left} fill="#0B3FA8" fillOpacity="0.28" stroke="#9CC5FF" strokeOpacity="0.75" />
      <polygon points={govBox.right} fill="#2F7BFF" fillOpacity="0.16" stroke="#9CC5FF" strokeOpacity="0.75" />
      <polygon points={govBox.top} fill="#7CB4FF" fillOpacity="0.22" stroke="#CFE2FF" strokeOpacity="0.8" />
      <g stroke="#9CC5FF" strokeOpacity="0.28">
        {govBox.lines(26).map((l, i) => (
          <line key={`h${i}`} {...l} />
        ))}
        {govBox.mullions(9).map((l, i) => (
          <line key={`v${i}`} {...l} />
        ))}
      </g>
      <g fill="none" stroke={`url(#${p}-wave)`} strokeWidth="1.3">
        {govWaves.map((w, i) => (
          <path key={i} d={w.d} strokeOpacity={w.o} />
        ))}
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------ datacenter */

const dc = (() => {
  const vx = 400;
  const vy = 215;
  const slices = Array.from({ length: 9 }, (_, j) => 1 / (1 + j * 0.55));
  const rand = rng(21);
  const racks: { poly: string; leds: { x: number; y: number; c: string; o: number }[] }[] = [];
  for (const side of [-1, 1]) {
    for (let j = 0; j < slices.length - 1; j++) {
      const a = slices[j];
      const b = slices[j + 1] + (slices[j] - slices[j + 1]) * 0.12;
      const xa = vx + side * 420 * a;
      const xb = vx + side * 420 * b;
      const ta = vy - 250 * a;
      const tb = vy - 250 * b;
      const ba = vy + 290 * a;
      const bb = vy + 290 * b;
      const leds: { x: number; y: number; c: string; o: number }[] = [];
      for (let r = 0; r < 12; r++) {
        const f = 0.08 + r * 0.075;
        for (let k = 0; k < 4; k++) {
          const g = 0.2 + k * 0.2;
          const x = xa + (xb - xa) * g;
          const top = ta + (tb - ta) * g;
          const bot = ba + (bb - ba) * g;
          if (rand() > 0.55) {
            const v = rand();
            leds.push({ x: r1(x), y: r1(top + (bot - top) * f), c: v > 0.8 ? '#fff' : v > 0.4 ? '#4C90FF' : '#7CB4FF', o: r1(0.4 + rand() * 0.6) });
          }
        }
      }
      racks.push({ poly: `${r1(xa)},${r1(ta)} ${r1(xb)},${r1(tb)} ${r1(xb)},${r1(bb)} ${r1(xa)},${r1(ba)}`, leds });
    }
  }
  return { vx, vy, racks };
})();

function Datacenter({ p }: ArtProps) {
  const { vx, vy, racks } = dc;
  return (
    <Frame p={p} name="datacenter" cx="50%" cy="43%">
      <defs>
        <radialGradient id={`${p}-end`}>
          <stop offset="0" stopColor="#E6F0FF" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#4C90FF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#4C90FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${p}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1847C2" stopOpacity="0.5" />
          <stop offset="1" stopColor="#02040A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${vx},${vy} 840,${H} -40,${H}`} fill={`url(#${p}-floor)`} />
      <circle cx={vx} cy={vy} r="150" fill={`url(#${p}-end)`} />
      <g stroke="#E6F0FF" strokeWidth="3" strokeOpacity="0.28" filter={`url(#${p}-soft)`}>
        <line x1={vx - 140} y1="-10" x2={vx} y2={vy} />
        <line x1={vx + 140} y1="-10" x2={vx} y2={vy} />
      </g>
      {racks.map((rack, i) => (
        <g key={i}>
          <polygon points={rack.poly} fill="#0A1226" stroke="#7CB4FF" strokeOpacity="0.16" />
          {rack.leds.map((l, j) => (
            <rect key={j} x={l.x} y={l.y} width="2.6" height="1.6" fill={l.c} opacity={l.o} />
          ))}
        </g>
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------------------ city */

const city = (() => {
  const rand = rng(7);
  const ground = 440;
  const buildings: { x: number; w: number; h: number; windows: { x: number; y: number; o: number; c: string }[] }[] = [];
  let x = -10;
  while (x < 810) {
    const w = 26 + rand() * 44;
    const centre = 1 - Math.min(1, Math.abs(x + w / 2 - 400) / 520);
    const h = 50 + rand() * 120 + centre * 90;
    if (Math.abs(x + w / 2 - 400) < 46) {
      x += w + 4;
      continue;
    }
    const windows: { x: number; y: number; o: number; c: string }[] = [];
    for (let wy = ground - h + 10; wy < ground - 8; wy += 9)
      for (let wx = x + 5; wx < x + w - 5; wx += 7)
        if (rand() > 0.8) windows.push({ x: r1(wx), y: r1(wy), o: r1(0.35 + rand() * 0.6), c: rand() > 0.7 ? '#fff' : '#7CB4FF' });
    buildings.push({ x: r1(x), w: r1(w), h: r1(h), windows });
    x += w + 4;
  }
  return { ground, buildings };
})();

const cityArcs = [
  'M150 330Q260 150 380 210',
  'M420 210Q560 120 660 300',
  'M80 360Q330 230 560 330',
  'M240 340Q470 260 720 350',
];

function City({ p }: ArtProps) {
  const { ground, buildings } = city;
  return (
    <Frame p={p} name="city" cx="50%" cy="20%">
      <defs>
        <linearGradient id={`${p}-bld`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#13285E" />
          <stop offset="1" stopColor="#040917" />
        </linearGradient>
        <linearGradient id={`${p}-tower`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9CC5FF" />
          <stop offset="0.5" stopColor="#2F7BFF" />
          <stop offset="1" stopColor="#0B1F4D" />
        </linearGradient>
      </defs>
      <Stars seed={5} count={50} maxY={220} />
      <ellipse cx="400" cy={ground} rx="460" ry="60" fill="#2F7BFF" opacity="0.35" filter={`url(#${p}-blur)`} />
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={r1(ground - b.h)} width={b.w} height={b.h} fill={`url(#${p}-bld)`} stroke="#7CB4FF" strokeOpacity="0.14" />
          {b.windows.map((w, j) => (
            <rect key={j} x={w.x} y={w.y} width="2.4" height="3.6" fill={w.c} opacity={w.o} />
          ))}
        </g>
      ))}
      <path
        d={`M362 ${ground}C364 320 370 200 380 92h9c4 34 18 34 22 0h9c10 108 16 228 18 ${ground - 92}Z`}
        fill={`url(#${p}-tower)`}
        stroke="#CFE2FF"
        strokeOpacity="0.8"
      />
      <g fill="none" stroke="#7CB4FF" strokeWidth="1.6">
        {cityArcs.map((d, i) => (
          <g key={i}>
            <path d={d} strokeOpacity="0.35" />
            <path d={d} className="art-pulse" pathLength={100} stroke="#E6F0FF" style={{ animationDelay: `${i * 0.8}s` }} />
          </g>
        ))}
      </g>
      <rect x="0" y={ground} width={W} height={H - ground} fill="#02040A" />
    </Frame>
  );
}

/* --------------------------------------------------------------- control */

const ctlFloor = floorGrid(400, 330, 520, 60, 8);
const ctlDots = (() => {
  const rand = rng(31);
  const out: { x: number; y: number; o: number }[] = [];
  for (let gx = 0; gx < 34; gx++)
    for (let gy = 0; gy < 15; gy++) {
      const nx = gx / 33 - 0.5;
      const ny = gy / 14 - 0.5;
      const land = Math.sin(nx * 7 + 1) + Math.cos(ny * 6 - nx * 3) + rand() * 0.9;
      if (land > 0.9) out.push({ x: r1(272 + gx * 7.6), y: r1(112 + gy * 8.4), o: r1(0.35 + rand() * 0.5) });
    }
  return out;
})();

function Control({ p }: ArtProps) {
  return (
    <Frame p={p} name="control" cx="50%" cy="35%">
      <g stroke="#2F7BFF" strokeOpacity="0.35">
        {ctlFloor.map((l, i) => (
          <line key={i} {...l} />
        ))}
      </g>
      <rect x="248" y="92" width="304" height="150" rx="8" fill="#2F7BFF" opacity="0.25" filter={`url(#${p}-blur)`} />
      <rect x="250" y="94" width="300" height="146" rx="8" fill="#0A1A44" fillOpacity="0.85" stroke="#4C90FF" strokeOpacity="0.8" />
      <g fill="#7CB4FF">
        {ctlDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.6" opacity={d.o} />
        ))}
      </g>
      <circle cx="430" cy="168" r="4" fill="#fff" />
      <circle cx="430" cy="168" r="11" fill="none" stroke="#fff" strokeOpacity="0.6" className="art-ping" />
      <g transform="translate(70 118) skewY(-9)">
        <rect width="150" height="150" rx="6" fill="#0A1A44" fillOpacity="0.85" stroke="#4C90FF" strokeOpacity="0.7" />
        {[38, 62, 46, 84, 70, 102, 90].map((h, i) => (
          <rect key={i} x={16 + i * 18} y={130 - h} width="10" height={h} rx="2" fill={i === 5 ? '#CFE2FF' : '#2F7BFF'} opacity="0.9" />
        ))}
      </g>
      <g transform="translate(580 92) skewY(9)">
        <rect width="150" height="150" rx="6" fill="#0A1A44" fillOpacity="0.85" stroke="#4C90FF" strokeOpacity="0.7" />
        <polyline points="14,118 36,96 58,104 80,70 102,80 124,44 138,52" fill="none" stroke="#CFE2FF" strokeWidth="2" />
        <polyline points="14,126 36,116 58,120 80,100 102,104 124,86 138,90" fill="none" stroke="#2F7BFF" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="14" y={14 + i * 10} width={70 - i * 18} height="4" rx="2" fill="#7CB4FF" opacity="0.5" />
        ))}
      </g>
      <path d="M150 352h500l40 40H110z" fill="#06102A" stroke="#4C90FF" strokeOpacity="0.6" />
      <line x1="150" y1="352" x2="650" y2="352" stroke="#CFE2FF" strokeOpacity="0.8" />
    </Frame>
  );
}

/* --------------------------------------------------------------- network */

const net = (() => {
  const R = 182;
  const cx = 400;
  const cy = 262;
  const tilt = 0.32;
  const project = (lon: number, lat: number) => {
    const la = (lat * Math.PI) / 180;
    const lo = (lon * Math.PI) / 180;
    const x = Math.cos(la) * Math.sin(lo);
    const y = Math.sin(la);
    const z = Math.cos(la) * Math.cos(lo);
    const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
    const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
    return { x: r1(cx + x * R), y: r1(cy - y2 * R), z: z2 };
  };
  const places = [
    [-40, 30], [-10, 45], [20, 20], [45, 24], [60, 5], [5, -10], [-30, -5], [35, -25], [-55, 10], [70, 35], [15, 50],
  ].map(([lo, la]) => project(lo, la));
  const pairs = [[3, 0], [3, 2], [3, 4], [3, 7], [2, 1], [0, 8], [4, 9], [5, 6], [1, 10], [2, 5]];
  const arcs = pairs.map(([a, b]) => {
    const p = places[a];
    const q = places[b];
    const mx = (p.x + q.x) / 2;
    const my = (p.y + q.y) / 2;
    const k = 0.55;
    return `M${p.x} ${p.y}Q${r1(mx + (mx - cx) * k)} ${r1(my + (my - cy) * k)} ${q.x} ${q.y}`;
  });
  const meridians = [18, 38, 58, 78].map((d) => r1(R * Math.sin((d * Math.PI) / 180)));
  const parallels = [-60, -30, 0, 30, 60].map((lat) => {
    const la = (lat * Math.PI) / 180;
    return { cy: r1(cy - R * Math.sin(la) * Math.cos(tilt)), rx: r1(R * Math.cos(la)), ry: r1(R * Math.cos(la) * Math.sin(tilt)) };
  });
  return { R, cx, cy, places, arcs, meridians, parallels };
})();

function Network({ p }: ArtProps) {
  const { R, cx, cy, places, arcs, meridians, parallels } = net;
  return (
    <Frame p={p} name="network" cx="50%" cy="52%">
      <defs>
        <radialGradient id={`${p}-globe`} cx="40%" cy="35%">
          <stop offset="0" stopColor="#1D4ED8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#040917" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <Stars seed={17} count={40} maxY={500} />
      <circle cx={cx} cy={cy} r={R + 20} fill="#2F7BFF" opacity="0.3" filter={`url(#${p}-blur)`} />
      <circle cx={cx} cy={cy} r={R} fill={`url(#${p}-globe)`} stroke="#7CB4FF" strokeOpacity="0.55" />
      <g fill="none" stroke="#7CB4FF" strokeOpacity="0.2">
        {meridians.map((rx) => (
          <ellipse key={rx} cx={cx} cy={cy} rx={rx} ry={R} />
        ))}
        {parallels.map((p) => (
          <ellipse key={p.cy} cx={cx} cy={p.cy} rx={p.rx} ry={p.ry} />
        ))}
      </g>
      <g fill="none" strokeWidth="1.6">
        {arcs.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#9CC5FF" strokeOpacity="0.45" />
            <path d={d} stroke="#fff" className="art-pulse" pathLength={100} style={{ animationDelay: `${(i * 0.45) % 3}s` }} />
          </g>
        ))}
      </g>
      {places.map((p, i) => (
        <g key={i} opacity={p.z > 0 ? 1 : 0.35}>
          <circle cx={p.x} cy={p.y} r="6" fill="#4C90FF" opacity="0.5" />
          <circle cx={p.x} cy={p.y} r="2.6" fill="#fff" />
        </g>
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------------ enterprise */

const towers = (() => {
  const rand = rng(41);
  const cell = 62;
  const list: { box: ReturnType<typeof isoBox>; hot: boolean; k: string }[] = [];
  for (let gx = 0; gx < 4; gx++)
    for (let gy = 0; gy < 4; gy++) {
      const hot = gx === 1 && gy === 2;
      const h = hot ? 250 : 50 + rand() * 150;
      const x = 400 + (gx - gy) * 0.866 * cell;
      const y = 300 + (gx + gy) * 0.5 * cell - 40;
      list.push({ box: isoBox(x, y, cell * 0.72, cell * 0.72, h), hot, k: `${gx}${gy}` });
    }
  return list.sort((a, b) => a.k.charCodeAt(0) + a.k.charCodeAt(1) - (b.k.charCodeAt(0) + b.k.charCodeAt(1)));
})();

function Enterprise({ p }: ArtProps) {
  return (
    <Frame p={p} name="enterprise" cx="55%" cy="30%">
      <defs>
        <linearGradient id={`${p}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CFE2FF" />
          <stop offset="1" stopColor="#4C90FF" />
        </linearGradient>
      </defs>
      <Stars seed={9} count={30} maxY={200} />
      <ellipse cx="420" cy="420" rx="360" ry="70" fill="#2F7BFF" opacity="0.3" filter={`url(#${p}-blur)`} />
      {towers.map((t) => (
        <g key={t.k}>
          {t.hot && <polygon points={t.box.right} fill="#2F7BFF" filter={`url(#${p}-blur)`} opacity="0.9" />}
          <polygon points={t.box.left} fill={t.hot ? '#1D5BFF' : '#0B2A78'} stroke="#7CB4FF" strokeOpacity="0.35" />
          <polygon points={t.box.right} fill={t.hot ? '#5B9BFF' : '#163FAE'} stroke="#7CB4FF" strokeOpacity="0.35" />
          <polygon points={t.box.top} fill={t.hot ? '#fff' : `url(#${p}-top)`} />
          <g stroke="#fff" strokeOpacity={t.hot ? 0.35 : 0.1}>
            {t.box.lines(12).map((l, j) => (
              <line key={j} {...l} />
            ))}
          </g>
        </g>
      ))}
    </Frame>
  );
}

/* ---------------------------------------------------------------- mosaic */

const mosaic = (() => {
  const rand = rng(53);
  const palette = ['#0B1F4D', '#0B1F4D', '#0F2A66', '#0F2A66', '#163FAE', '#2563EB', '#2F7BFF', '#5B9BFF', '#9CC5FF'];
  const tiles: { x: number; y: number; fill: string; glow: boolean; glyph: number }[] = [];
  for (let gx = 0; gx < 10; gx++)
    for (let gy = 0; gy < 7; gy++) {
      const v = rand();
      tiles.push({
        x: -380 + gx * 76,
        y: -266 + gy * 76,
        fill: palette[Math.floor(v * palette.length)],
        glow: v > 0.94,
        glyph: rand() > 0.8 ? Math.floor(rand() * 4) : -1,
      });
    }
  return tiles;
})();

const glyphs = [
  <circle key="g0" cx="32" cy="32" r="12" fill="none" stroke="#fff" strokeWidth="3" />,
  <path key="g1" d="M32 18v28M18 32h28" stroke="#fff" strokeWidth="3" />,
  <path key="g2" d="M18 44V34M28 44V24M38 44V30M48 44V20" stroke="#fff" strokeWidth="3" />,
  <path key="g3" d="M16 36q8-12 16 0t16 0" fill="none" stroke="#fff" strokeWidth="3" />,
];

function Mosaic({ p }: ArtProps) {
  return (
    <Frame p={p} name="mosaic" cx="50%" cy="50%">
      <defs>
        <radialGradient id={`${p}-fade`}>
          <stop offset="0.35" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`${p}-mask`}>
          <rect width={W} height={H} fill={`url(#${p}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${p}-mask)`} transform="translate(400 250) rotate(-10)">
        {mosaic.map((t, i) => (
          <g key={i} transform={`translate(${t.x} ${t.y})`}>
            {t.glow && <rect x="-10" y="-10" width="84" height="84" rx="20" fill="#2F7BFF" filter={`url(#${p}-blur)`} />}
            <rect width="64" height="64" rx="12" fill={t.fill} stroke="#fff" strokeOpacity="0.08" />
            {t.glyph >= 0 && <g opacity="0.8">{glyphs[t.glyph]}</g>}
          </g>
        ))}
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ team */

const team = (() => {
  const cx = 400;
  const cy = 250;
  const people = [
    { a: -160, d: 150, r: 34 },
    { a: -120, d: 200, r: 28 },
    { a: -80, d: 165, r: 36 },
    { a: -40, d: 215, r: 30 },
    { a: 0, d: 170, r: 34 },
    { a: 40, d: 205, r: 30 },
    { a: 80, d: 160, r: 36 },
    { a: 120, d: 195, r: 28 },
    { a: 160, d: 170, r: 32 },
  ].map((p) => {
    const rad = (p.a * Math.PI) / 180;
    return { x: r1(cx + Math.cos(rad) * p.d * 1.35), y: r1(cy + Math.sin(rad) * p.d * 0.78), r: p.r };
  });
  return { cx, cy, people };
})();

function Team({ p }: ArtProps) {
  const { cx, cy, people } = team;
  return (
    <Frame p={p} name="team" cx="50%" cy="50%">
      <defs>
        <linearGradient id={`${p}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#163FAE" />
          <stop offset="1" stopColor="#050C22" />
        </linearGradient>
      </defs>
      <g stroke="#7CB4FF" strokeOpacity="0.35" strokeWidth="1.2">
        {people.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} />
        ))}
        {people.map((p, i) => {
          const q = people[(i + 1) % people.length];
          return <line key={`n${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} strokeOpacity="0.15" />;
        })}
      </g>
      {people.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle r={p.r} fill={`url(#${p}-face)`} stroke="#9CC5FF" strokeOpacity="0.7" />
          <circle cy={r1(-p.r * 0.2)} r={r1(p.r * 0.26)} fill="#CFE2FF" opacity="0.9" />
          <path
            d={`M${r1(-p.r * 0.5)} ${r1(p.r * 0.52)}a${r1(p.r * 0.5)} ${r1(p.r * 0.42)} 0 0 1 ${r1(p.r)} 0`}
            fill="#CFE2FF"
            opacity="0.9"
          />
        </g>
      ))}
      <circle cx={cx} cy={cy} r="62" fill="#2F7BFF" opacity="0.6" filter={`url(#${p}-blur)`} />
      <circle cx={cx} cy={cy} r="52" fill="#0B2F8A" stroke="#CFE2FF" />
      <Mark x={cx} y={cy} width={58} accent="#DCEBFF" />
    </Frame>
  );
}

const arts: Record<ArtName, (props: ArtProps) => React.ReactElement> = {
  keys: Keys,
  glassT: GlassT,
  neural: Neural,
  shield: Shield,
  grid: GridArt,
  circuit: Circuit,
  waves: Waves,
  government: Government,
  datacenter: Datacenter,
  city: City,
  control: Control,
  network: Network,
  enterprise: Enterprise,
  mosaic: Mosaic,
  team: Team,
};

/**
 * `uid` keeps SVG ids unique when the same illustration appears twice on a page
 * (for example in the menu and in the page body).
 */
export function Art({ name, uid }: { name: ArtName; uid?: string }) {
  const Component = arts[name];
  return <Component p={uid ? `art-${name}-${uid}` : `art-${name}`} />;
}
