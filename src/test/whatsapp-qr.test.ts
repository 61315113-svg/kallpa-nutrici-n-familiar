import { describe, expect, it } from "vitest";
import jsQR from "jsqr";
import { WHATSAPP_GROUP_URL } from "@/lib/kallpa-data";
import { QR_QUIET, communityQrMatrix, isUnderBadge, qrMatrixFor } from "@/lib/whatsapp-qr";

const SCALE = 8;

/** Paints the QR exactly as the card shows it: white margin, dark dots, blank badge disc in the middle. */
function renderQr() {
  const { size, dark } = communityQrMatrix();
  const side = size + QR_QUIET * 2;
  const width = side * SCALE;
  const height = width;
  const rgba = new Uint8ClampedArray(width * height * 4).fill(255);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!dark[y * size + x] || isUnderBadge(x + QR_QUIET, y + QR_QUIET, side)) continue;
      for (let py = 0; py < SCALE; py++) {
        for (let px = 0; px < SCALE; px++) {
          const i = ((y + QR_QUIET) * SCALE + py) * (width * 4) + ((x + QR_QUIET) * SCALE + px) * 4;
          rgba[i] = 0;
          rgba[i + 1] = 0;
          rgba[i + 2] = 0;
        }
      }
    }
  }
  return { rgba, width, height };
}

describe("Kallpa WhatsApp QR", () => {
  it("prints a scannable code that opens the exact group link", () => {
    const { rgba, width, height } = renderQr();
    const decoded = jsQR(rgba, width, height);
    expect(decoded?.data).toBe(WHATSAPP_GROUP_URL);
  });

  it("leaves the badge disc blank instead of hiding dots under it", () => {
    let cleared = 0;
    const { size, dark } = communityQrMatrix();
    const side = size + QR_QUIET * 2;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (isUnderBadge(x + QR_QUIET, y + QR_QUIET, side)) cleared++;
    expect(cleared).toBeGreaterThan(0);
    expect(cleared / (size * size)).toBeLessThan(0.06);
    // the disc must not eat a finder pattern: those live in the corners
    expect(isUnderBadge(QR_QUIET + 3, QR_QUIET + 3, side)).toBe(false);
    void dark;
  });

  it("follows the group link instead of repeating a fixed pattern", () => {
    const printed = communityQrMatrix().dark.join("");
    expect(printed).toBe(qrMatrixFor(WHATSAPP_GROUP_URL, "Q").dark.join(""));
    expect(printed).not.toBe(qrMatrixFor("https://chat.whatsapp.com/OTRO-ENLACE", "Q").dark.join(""));
  });
});
