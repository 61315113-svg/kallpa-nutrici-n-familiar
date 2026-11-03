declare module "qrcode/lib/core/qrcode.js" {
  export interface QrModuleMatrix {
    size: number;
    data: Uint8Array;
    get(x: number, y: number): boolean;
    isReserved(x: number, y: number): boolean;
  }

  export interface QrCode {
    modules: QrModuleMatrix;
    version: number;
    errorCorrectionLevel: { bit: number; name: string };
  }

  export type QrErrorCorrectionLevel = "L" | "M" | "Q" | "H";

  export function create(
    text: string,
    options?: { errorCorrectionLevel?: QrErrorCorrectionLevel; version?: number },
  ): QrCode;
}
