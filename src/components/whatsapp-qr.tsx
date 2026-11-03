import { memo, useMemo } from "react";
import { WHATSAPP_GROUP_URL } from "@/lib/kallpa-data";
import { QR_QUIET, QR_BADGE_RADIUS, communityQrMatrix, isUnderBadge } from "@/lib/whatsapp-qr";

/** Lucide's message-circle outline, drawn inside the badge so it scales with the code. */
const BUBBLE = "M7.9 20A9 9 0 1 0 4 16.1L2 22Z";

/**
 * Real, scannable QR of the Kallpa WhatsApp group. The modules come straight
 * from WHATSAPP_GROUP_URL, so swapping the link in kallpa-data.ts updates the
 * printed code too.
 */
export const WhatsAppQr = memo(function WhatsAppQr({
  className = "",
  label = "Código QR para unirse al grupo de WhatsApp de Kallpa Nutrición",
}: {
  className?: string;
  label?: string;
}) {
  const { size, dark } = useMemo(() => communityQrMatrix(), []);
  const side = size + QR_QUIET * 2;
  const c = side / 2;

  // Solid, full-module squares: the most reliable thing a phone camera can read.
  const dots: React.ReactNode[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!dark[y * size + x] || isUnderBadge(x + QR_QUIET, y + QR_QUIET, side)) continue;
      dots.push(<rect key={`${x}-${y}`} x={x + QR_QUIET} y={y + QR_QUIET} width={1} height={1} className="fill-earth" />);
    }
  }

  return (
    <a
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`group relative block shrink-0 rounded-2xl bg-card shadow-sm ring-1 ring-border transition hover:ring-primary ${className}`}
    >
      <svg viewBox={`0 0 ${side} ${side}`} className="h-full w-full" shapeRendering="crispEdges" role="img" aria-label={label} focusable="false">
        <rect width={side} height={side} rx={4} className="fill-card" />
        {dots}
        <circle cx={c} cy={c} r={QR_BADGE_RADIUS} className="fill-card" />
        <g transform={`translate(${c} ${c}) scale(${(QR_BADGE_RADIUS * 2) / 26})`}>
          <circle r={13} className="fill-whatsapp" />
          <g transform="translate(-9.5 -9.5) scale(0.85) translate(-12 -12)">
            <path d={BUBBLE} fill="none" className="stroke-whatsapp-foreground" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </svg>
    </a>
  );
});
