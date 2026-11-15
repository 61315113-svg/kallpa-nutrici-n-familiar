import { memo, useMemo } from "react";
import { WHATSAPP_GROUP_URL } from "@/lib/kallpa-data";
import { QR_QUIET, QR_BADGE_RADIUS, communityQrMatrix, isUnderBadge } from "@/lib/whatsapp-qr";

/** Lucide's message-circle outline, drawn inside the badge so it scales with the code. */
const BUBBLE = "M7.9 20A9 9 0 1 0 4 16.1L2 22Z";

/** Verde bosque de la marca: oscuro sobre blanco puro para que la cámara lo lea sin esfuerzo. */
const FOREST = "#1B4332";

/**
 * Real, scannable QR of the Kallpa WhatsApp group. The modules come straight
 * from WHATSAPP_GROUP_URL, so swapping the link in kallpa-data.ts updates the
 * printed code too. Se presenta como una tarjeta blanca editorial con la
 * etiqueta incluida; `className` controla el ancho de la tarjeta (p. ej. "w-60").
 */
export const WhatsAppQr = memo(function WhatsAppQr({
  className = "",
  label = "Código QR para unirse al grupo de WhatsApp de Kallpa Nutrición",
  caption = "Escanea con tu cámara para unirte al grupo",
}: {
  className?: string;
  label?: string;
  caption?: string;
}) {
  const { size, dark } = useMemo(() => communityQrMatrix(), []);
  const side = size + QR_QUIET * 2;
  const c = side / 2;

  // Todos los módulos oscuros en UNA sola figura: sin costuras entre cuadros, bordes nítidos
  // y proporciones idénticas a la matriz del QR, sea cual sea el tamaño de la tarjeta.
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!dark[y * size + x] || isUnderBadge(x + QR_QUIET, y + QR_QUIET, side)) continue;
      d += `M${x + QR_QUIET} ${y + QR_QUIET}h1v1h-1z`;
    }
  }

  return (
    <a
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`group block shrink-0 rounded-2xl bg-white p-3 text-center shadow-lg shadow-black/15 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:p-4 ${className}`}
    >
      <svg viewBox={`0 0 ${side} ${side}`} className="block aspect-square h-auto w-full" shapeRendering="crispEdges" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label} focusable="false">
        <rect width={side} height={side} fill="#FFFFFF" />
        <path d={d} fill={FOREST} />
        <circle cx={c} cy={c} r={QR_BADGE_RADIUS} fill="#FFFFFF" />
        <g transform={`translate(${c} ${c}) scale(${(QR_BADGE_RADIUS * 2) / 26})`}>
          <circle r={13} className="fill-whatsapp" />
          <g transform="scale(0.85) translate(-12 -12)">
            <path d={BUBBLE} fill="none" stroke="#FFFFFF" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </svg>
      <span className="mt-2 block text-xs font-semibold leading-snug sm:text-sm" style={{ color: FOREST }}>
        {caption}
      </span>
    </a>
  );
});
