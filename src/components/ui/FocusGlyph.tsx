import type { FocusIcon } from '@/content/types';

const spokes = [0, 60, 120, 180, 240, 300].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return { x: +(32 + 21 * Math.cos(a)).toFixed(2), y: +(32 + 21 * Math.sin(a)).toFixed(2) };
});

const shapes: Record<FocusIcon, React.ReactNode> = {
  ai: (
    <>
      {spokes.map((p, i) => (
        <line key={`l${i}`} x1="32" y1="32" x2={p.x} y2={p.y} stroke="#fff" strokeWidth="3.6" />
      ))}
      {spokes.map((p, i) => (
        <circle key={`c${i}`} cx={p.x} cy={p.y} r="5.6" />
      ))}
      <circle cx="32" cy="32" r="10.5" />
    </>
  ),
  shield: (
    <path
      fillRule="evenodd"
      d="M32 5 53 12.5V30c0 13.2-8.6 23.4-21 29C19.6 53.4 11 43.2 11 30V12.5L32 5Zm0 17a5.5 5.5 0 0 0-2.4 10.45V40h4.8v-7.55A5.5 5.5 0 0 0 32 22Z"
    />
  ),
  cloud: (
    <>
      <circle cx="23" cy="34" r="10" />
      <circle cx="35" cy="27" r="13.5" />
      <circle cx="46" cy="35" r="9" />
      <rect x="13" y="34" width="42" height="11" rx="5.5" />
      <rect x="18" y="50" width="28" height="4.5" rx="2.25" />
      <rect x="24" y="57" width="16" height="4.5" rx="2.25" />
    </>
  ),
  layers: (
    <>
      <path d="M32 8 56 20 32 32 8 20 32 8Z" />
      <path d="m8 30 24 12 24-12" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
      <path d="m8 41 24 12 24-12" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
    </>
  ),
};

/** White icon sliced into horizontal bands, drawn on the gradient focus tiles. */
export function FocusGlyph({ name }: { name: FocusIcon }) {
  const id = `glyph-stripes-${name}`;
  return (
    <svg className="focus-glyph" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          {Array.from({ length: 16 }, (_, i) => (
            <rect key={i} x="0" y={i * 4} width="64" height="2.9" fill="#fff" />
          ))}
        </mask>
      </defs>
      <g fill="#fff" mask={`url(#${id})`}>
        {shapes[name]}
      </g>
    </svg>
  );
}
