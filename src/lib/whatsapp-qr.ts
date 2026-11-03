import QRCode from "qrcode/lib/core/qrcode.js";
import { WHATSAPP_GROUP_URL } from "@/lib/kallpa-data";

export interface QrMatrix {
  size: number;
  /** Row-major bits: 1 = dark module. */
  dark: boolean[];
}

/**
 * Builds the module matrix for a link using the pure-JS QR core, so the same
 * code renders on the server and in the browser without canvas or filesystem.
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
