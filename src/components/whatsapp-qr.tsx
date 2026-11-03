import { memo, useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_GROUP_URL } from "@/lib/kallpa-data";
import { QR_QUIET, communityQrMatrix, isUnderLogo } from "@/lib/whatsapp-qr";

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

  const dots: React.ReactNode[] = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!dark[y * size + x] || isUnderLogo(x, y, size)) continue;
      dots.push(<rect key={`${x}-${y}`} x={x + QR_QUIET + 0.07} y={y + QR_QUIET + 0.07} width={0.86} height={0.86} rx={0.34} className="fill-earth" />);
    }
  }

  return (
    <a
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`group relative block shrink-0 rounded-2xl bg-card p-2 shadow-sm ring-1 ring-border transition hover:ring-primary ${className}`}
    >
      <svg viewBox={`0 0 ${side} ${side}`} className="h-full w-full" role="img" aria-label={label} focusable="false">
        <rect width={side} height={side} rx={3} className="fill-card" />
        {dots}
      </svg>
      <span className="pointer-events-none absolute left-1/2 top-1/2 grid h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground ring-4 ring-card">
        <MessageCircle className="h-1/2 w-1/2" />
      </span>
    </a>
  );
});
