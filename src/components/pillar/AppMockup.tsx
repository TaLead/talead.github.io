import { LogoMark } from '@/components/brand/Logo';
import type { MockupSpec } from '@/content/types';

/*
 * Illustrative product screens drawn in HTML/SVG. Labels come from the
 * dictionaries so the screens read correctly in English and Arabic.
 */

const BARS = [42, 58, 51, 72, 64, 80, 69, 88, 76, 92, 84, 97];
const LINE_A = [30, 38, 34, 46, 44, 55, 52, 63, 60, 70, 74, 82];
const LINE_B = [28, 33, 36, 40, 45, 49, 53, 57, 61, 65, 69, 73];

const toPoints = (values: number[]) =>
  values.map((v, i) => `${((i / (values.length - 1)) * 300).toFixed(1)},${(96 - v).toFixed(1)}`).join(' ');

function Chart({ kind, label }: { kind: 'bars' | 'line'; label: string }) {
  return (
    <div className="mock__panel">
      <p className="mock__label">{label}</p>
      <svg className="mock__chart" viewBox="0 0 300 100" preserveAspectRatio="none">
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#E4E8EF" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        {kind === 'bars' ? (
          BARS.map((v, i) => (
            <rect key={i} x={i * 25 + 5} y={100 - v} width="15" height={v} rx="3" fill={i === 9 ? '#0070FF' : '#BFD6FF'} />
          ))
        ) : (
          <>
            <polygon points={`0,100 ${toPoints(LINE_A)} 300,100`} fill="#2563EB" opacity="0.1" />
            <polyline points={toPoints(LINE_B)} fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            <polyline points={toPoints(LINE_A)} fill="none" stroke="#2563EB" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
    </div>
  );
}

function Donut({ value, label, items }: NonNullable<MockupSpec['donut']>) {
  const c = 2 * Math.PI * 40;
  return (
    <div className="mock__panel mock__donut">
      <div className="mock__donut-ring">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#E6ECF7" strokeWidth="11" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#2563EB"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={`${((value / 100) * c).toFixed(1)} ${c.toFixed(1)}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <b>{value}%</b>
      </div>
      <div className="mock__bars">
        <p className="mock__label">{label}</p>
        {items.map((item) => (
          <div key={item.name} className="mock__bar">
            <span>{item.name}</span>
            <i>
              <em style={{ width: `${item.value}%` }} />
            </i>
            <b>{item.value}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function Camera({ labels, caption }: NonNullable<MockupSpec['camera']>) {
  const boxes = [
    { x: 14, y: 30, w: 15, h: 52 },
    { x: 46, y: 46, w: 32, h: 34 },
    { x: 33, y: 24, w: 11, h: 26 },
  ];
  return (
    <div className="mock__camera">
      <svg className="mock__scene" viewBox="0 0 100 56" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="mock-cam-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1B2A4A" />
            <stop offset="1" stopColor="#0B1222" />
          </linearGradient>
        </defs>
        <rect width="100" height="56" fill="url(#mock-cam-sky)" />
        <polygon points="0,56 38,26 62,26 100,56" fill="#22314F" />
        <rect x="0" y="20" width="30" height="16" fill="#16223D" />
        <rect x="70" y="16" width="30" height="20" fill="#16223D" />
        <line x1="50" y1="56" x2="50" y2="28" stroke="#3B4D72" strokeWidth="0.6" strokeDasharray="2 2" />
      </svg>
      {boxes.map((b, i) => (
        <span
          key={i}
          className="mock__box"
          style={{ insetInlineStart: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
        >
          <em>{labels[i]}</em>
        </span>
      ))}
      <span className="mock__live">● LIVE</span>
      <span className="mock__caption">{caption}</span>
    </div>
  );
}

function Flow({ hub, nodes }: NonNullable<MockupSpec['flow']>) {
  const left = nodes.slice(0, 3);
  const right = nodes.slice(3, 6);
  return (
    <div className="mock__flow">
      <svg className="mock__flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {[17, 50, 83].map((y) => (
          <g key={y}>
            <path d={`M18 ${y} C 34 ${y}, 34 50, 50 50`} fill="none" stroke="#9CC5FF" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <path d={`M82 ${y} C 66 ${y}, 66 50, 50 50`} fill="none" stroke="#9CC5FF" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>
      <div className="mock__flow-col">
        {left.map((n) => (
          <span key={n} className="mock__node">
            {n}
          </span>
        ))}
      </div>
      <div className="mock__hub">
        <LogoMark className="mock__hub-mark" />
        <span>{hub}</span>
      </div>
      <div className="mock__flow-col">
        {right.map((n) => (
          <span key={n} className="mock__node">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

function Chat({ user, agent, sources, input }: NonNullable<MockupSpec['chat']>) {
  return (
    <div className="mock__chat">
      <p className="mock__msg mock__msg--user">{user}</p>
      <div className="mock__msg mock__msg--agent">
        <span className="mock__avatar">
          <LogoMark />
        </span>
        <div>
          <p>{agent}</p>
          <div className="mock__sources">
            {sources.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mock__input">
        <span>{input}</span>
        <i />
      </div>
    </div>
  );
}

export function AppMockup({ spec }: { spec: MockupSpec }) {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock__side">
        <LogoMark className="mock__logo" />
        <i className="is-active" />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="mock__main">
        <div className="mock__head">
          <div>
            <p className="mock__title">{spec.title}</p>
            <p className="mock__sub">{spec.subtitle}</p>
          </div>
          {spec.tabs && (
            <div className="mock__tabs">
              {spec.tabs.map((tab, i) => (
                <span key={tab} className={i === 0 ? 'is-active' : undefined}>
                  {tab}
                </span>
              ))}
            </div>
          )}
        </div>
        {spec.camera && <Camera {...spec.camera} />}
        {spec.kpis && (
          <div className="mock__kpis" style={{ '--n': spec.kpis.length } as React.CSSProperties}>
            {spec.kpis.map((k) => (
              <div key={k.label} className="mock__kpi">
                <span>{k.label}</span>
                <b className={k.tone ? `tone-${k.tone}` : undefined}>{k.value}</b>
              </div>
            ))}
          </div>
        )}
        {spec.chart && <Chart {...spec.chart} />}
        {spec.donut && <Donut {...spec.donut} />}
        {spec.flow && <Flow {...spec.flow} />}
        {spec.chat && <Chat {...spec.chat} />}
        {spec.rows && (
          <ul className="mock__rows">
            {spec.rows.map((row) => (
              <li key={row.title}>
                <div>
                  <p>{row.title}</p>
                  <span>{row.meta}</span>
                </div>
                <em className={`tone-${row.tone}`}>{row.pill}</em>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
