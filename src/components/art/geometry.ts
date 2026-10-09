/** Helpers for the generated vector illustrations. All output is deterministic. */

export const W = 800;
export const H = 500;

export const r1 = (n: number) => Math.round(n * 10) / 10;

/** Small seeded PRNG (mulberry32) so illustrations render identically on every build. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const C = 0.866;
const S = 0.5;

type Pt = [number, number];
const pts = (list: Pt[]) => list.map(([x, y]) => `${r1(x)},${r1(y)}`).join(' ');

/**
 * Isometric box. (x, y) is the screen position of the bottom-front corner.
 * Returns the polygon point lists of the three visible faces.
 */
export function isoBox(x: number, y: number, w: number, d: number, h: number) {
  const p0: Pt = [x, y];
  const p1: Pt = [x + w * C, y - w * S];
  const p3: Pt = [x - d * C, y - d * S];
  const p2: Pt = [p1[0] - d * C, p1[1] - d * S];
  const up = (p: Pt): Pt => [p[0], p[1] - h];
  return {
    top: pts([up(p0), up(p1), up(p2), up(p3)]),
    right: pts([p0, p1, up(p1), up(p0)]),
    left: pts([p0, p3, up(p3), up(p0)]),
    /** Horizontal "rack" lines on both side faces, every `step` px. */
    lines(step: number) {
      const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
      for (let k = step; k < h - 4; k += step) {
        out.push({ x1: r1(p0[0]), y1: r1(p0[1] - k), x2: r1(p1[0]), y2: r1(p1[1] - k) });
        out.push({ x1: r1(p0[0]), y1: r1(p0[1] - k), x2: r1(p3[0]), y2: r1(p3[1] - k) });
      }
      return out;
    },
    /** Vertical mullions on both side faces. */
    mullions(count: number) {
      const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
      for (let k = 1; k < count; k++) {
        const fr: Pt = [p0[0] + ((p1[0] - p0[0]) * k) / count, p0[1] + ((p1[1] - p0[1]) * k) / count];
        const fl: Pt = [p0[0] + ((p3[0] - p0[0]) * k) / count, p0[1] + ((p3[1] - p0[1]) * k) / count];
        out.push({ x1: r1(fr[0]), y1: r1(fr[1]), x2: r1(fr[0]), y2: r1(fr[1] - h) });
        out.push({ x1: r1(fl[0]), y1: r1(fl[1]), x2: r1(fl[0]), y2: r1(fl[1] - h) });
      }
      return out;
    },
  };
}

/** Perspective floor grid converging to (vx, vy). */
export function floorGrid(vx: number, vy: number, bottom = 520, spread = 72, rows = 12) {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = -14; i <= 14; i++) {
    lines.push({ x1: r1(vx + i * 3), y1: vy, x2: r1(vx + i * spread), y2: bottom });
  }
  for (let k = 1; k <= rows; k++) {
    const t = Math.pow(k / rows, 1.9);
    const y = r1(vy + (bottom - vy) * t);
    lines.push({ x1: -40, y1: y, x2: 840, y2: y });
  }
  return lines;
}
