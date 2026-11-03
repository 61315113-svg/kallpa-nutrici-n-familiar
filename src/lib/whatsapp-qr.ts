import QRCode from "qrcode/lib/core/qrcode.js";
import { WHATSAPP_GROUP_URL } from "@/lib/kallpa-data";

/** Clear margin around the code, in modules, as the QR standard asks for. */
export const QR_QUIET = 4;

/** Radius, in modules, of the white disc the WhatsApp badge sits on. Modules under it are left blank. */
export const QR_BADGE_RADIUS = 5;

export interface QrMatrix {
  size: number;
  /** Row-major bits: true = dark module. */
  dark: boolean[];
}

/** True when a module falls under the badge, so it must stay white in the printed code. */
export function isUnderBadge(x: number, y: number, size: number) {
  const c = (size - 1) / 2;
  return Math.hypot(x - c, y - c) <= QR_BADGE_RADIUS + 0.5;
}

/**
 * Builds the module matrix for a link with the pure-JS QR core, so the very
 * same code can be painted on the server and in the browser without canvas,
 * the filesystem or a network call.
 */
export function qrMatrixFor(url: string, level: "L" | "M" | "Q" | "H" = "Q"): QrMatrix {
  const qr = QRCode.create(url, { errorCorrectionLevel: level });
  const size = qr.modules.size;
  const data = qr.modules.data;
  const dark: boolean[] = [];
  for (let i = 0; i < size * size; i++) dark.push(data[i] === 1);
  return { size, dark };
}

/** The community QR always encodes the shared group link, never a stand-in. */
export function communityQrMatrix(): QrMatrix {
  return qrMatrixFor(WHATSAPP_GROUP_URL, "Q");
}
