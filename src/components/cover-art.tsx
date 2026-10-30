import type { ShelfItem } from "@/data";

/* Covers are drawn in SVG on a 474 × 900 board so the same art can be a
   tape face on the shelf and a masked poster in the detail sheet. */

export const KIND_SHORT: Record<ShelfItem["kind"], string> = {
  Experience: "EXP",
  Education: "EDU",
  Certification: "CERT",
  Award: "AWD",
};

function wrapTitle(title: string, max = 11) {
  const words = title.toUpperCase().replace("—", "").split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length <= max) cur = (cur + " " + w).trim();
    else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 5);
}

function Motif({ m, ink, accent }: { m: ShelfItem["motif"]; ink: string; accent: string }) {
  switch (m) {
    case "rings":
      return (
        <g fill="none">
          {[150, 112, 76, 42].map((r, i) => (
            <circle key={r} cx="237" cy="600" r={r} stroke={i % 2 ? accent : ink} strokeWidth={i === 3 ? 30 : 10} />
          ))}
        </g>
      );
    case "bars":
      return (
        <g>
          {[70, 110, 95, 150, 185, 230].map((h, i) => (
            <rect key={i} x={70 + i * 58} y={760 - h} width="40" height={h} fill={i === 5 ? accent : ink} />
          ))}
          <line x1="50" y1="762" x2="424" y2="762" stroke={ink} strokeWidth="4" />
        </g>
      );
    case "grid":
      return (
        <g>
          {Array.from({ length: 36 }).map((_, i) => {
            const x = 92 + (i % 6) * 58;
            const y = 455 + Math.floor(i / 6) * 58;
            const on = [3, 8, 9, 14, 15, 16, 21, 22, 27, 28, 29, 35].includes(i);
            return <circle key={i} cx={x} cy={y} r={on ? 18 : 8} fill={on ? accent : ink} />;
          })}
        </g>
      );
    case "wave":
      return (
        <g fill="none" strokeLinecap="round">
          {[0, 1, 2, 3, 4].map((k) => (
            <path
              key={k}
              d={`M40 ${500 + k * 60} C 120 ${440 + k * 60}, 180 ${560 + k * 60}, 237 ${500 + k * 60} S 354 ${440 + k * 60}, 434 ${500 + k * 60}`}
              stroke={k === 2 ? accent : ink}
              strokeWidth={k === 2 ? 16 : 7}
            />
          ))}
        </g>
      );
    case "star":
      return (
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="231" y="430" width="12" height="340" fill={i % 3 ? ink : accent} transform={`rotate(${i * 15} 237 600)`} />
          ))}
          <circle cx="237" cy="600" r="62" fill={accent} />
          <circle cx="237" cy="600" r="30" fill={ink} />
        </g>
      );
    case "arc":
      return (
        <g fill="none">
          {[170, 130, 90, 50].map((r, i) => (
            <path key={r} d={`M ${237 - r} 760 A ${r} ${r} 0 0 1 ${237 + r} 760`} stroke={i === 0 ? accent : ink} strokeWidth={i === 0 ? 26 : 12} />
          ))}
          <line x1="40" y1="772" x2="434" y2="772" stroke={ink} strokeWidth="6" />
        </g>
      );
    case "steps":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((k) => (
            <rect key={k} x={60 + k * 72} y={760 - (k + 1) * 62} width="72" height={(k + 1) * 62} fill={k === 4 ? accent : ink} opacity={k === 4 ? 1 : 0.85 - k * 0.1} />
          ))}
        </g>
      );
    case "sun":
    default:
      return (
        <g>
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1="237" y1="600" x2={237 + Math.cos((i / 16) * Math.PI * 2) * 175} y2={600 + Math.sin((i / 16) * Math.PI * 2) * 175} stroke={ink} strokeWidth="6" />
          ))}
          <circle cx="237" cy="600" r="104" fill={accent} />
          <circle cx="237" cy="600" r="104" fill="none" stroke={ink} strokeWidth="8" />
        </g>
      );
  }
}

/** The cover content as an SVG <g>, on a 474 × 900 board. */
export function CoverContent({ item, n, total }: { item: ShelfItem; n: number; total: number }) {
  const [bg, ink, accent] = item.palette;
  const lines = wrapTitle(item.title);
  const longest = Math.max(...lines.map((l) => l.length));
  const size = Math.min(96, 392 / (longest * 0.47));
  const lh = size * 0.9;
  return (
    <g>
      <rect width="474" height="900" fill={bg} />
      {/* worn edge */}
      <rect x="10" y="10" width="454" height="880" fill="none" stroke={ink} strokeOpacity="0.85" strokeWidth="2" />
      <text x="34" y="58" fill={ink} fontSize="15" fontWeight="600" letterSpacing="3" style={{ fontFamily: "var(--font-sans)" }}>
        A RAHUL KUMAR RAI MILESTONE
      </text>
      <text x="440" y="58" fill={ink} fontSize="15" fontWeight="600" textAnchor="end" style={{ fontFamily: "var(--font-sans)" }}>
        {String(n + 1).padStart(2, "0")}/{total}
      </text>
      <line x1="34" y1="78" x2="440" y2="78" stroke={ink} strokeWidth="2" />
      <text
        fill={ink}
        fontWeight="800"
        fontSize={size}
        style={{ fontFamily: "var(--font-display)", fontStretch: "62%", fontVariationSettings: '"wdth" 62', letterSpacing: "-0.01em" }}
      >
        {lines.map((l, i) => (
          <tspan key={i} x="34" y={92 + lh * (i + 1)}>
            {l}
          </tspan>
        ))}
      </text>
      <Motif m={item.motif} ink={ink} accent={accent} />
      <text x="34" y="826" fill={ink} fontSize="17" fontWeight="600" style={{ fontFamily: "var(--font-sans)" }}>
        {item.org.length > 34 ? item.org.slice(0, 33) + "…" : item.org}
      </text>
      <text x="34" y="856" fill={ink} fillOpacity="0.7" fontSize="15" fontWeight="500" letterSpacing="1" style={{ fontFamily: "var(--font-sans)" }}>
        {item.period.toUpperCase()}
      </text>
      <rect x="360" y="826" width="80" height="34" fill="none" stroke={ink} strokeWidth="2.5" />
      <text x="400" y="849" fill={ink} fontSize="16" fontWeight="700" textAnchor="middle" letterSpacing="1.5" style={{ fontFamily: "var(--font-sans)" }}>
        {KIND_SHORT[item.kind]}
      </text>
    </g>
  );
}

export function CoverSvg({ item, n, total }: { item: ShelfItem; n: number; total: number }) {
  return (
    <svg viewBox="0 0 474 900" preserveAspectRatio="none" className="block h-full w-full" aria-hidden>
      <CoverContent item={item} n={n} total={total} />
    </svg>
  );
}

/** Small glyph for the top of a spine. */
export function SpineGlyph({ item }: { item: ShelfItem }) {
  const [, ink, accent] = item.palette;
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
      <circle cx="20" cy="20" r="16" fill={accent} />
      <circle cx="20" cy="20" r="16" fill="none" stroke={ink} strokeWidth="2.5" />
      <text x="20" y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill={ink} style={{ fontFamily: "var(--font-sans)" }}>
        {item.kind[0]}
      </text>
    </svg>
  );
}
