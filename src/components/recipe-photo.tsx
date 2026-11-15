import { useState, type ImgHTMLAttributes } from "react";
import { ImageOff } from "lucide-react";

export function RecipePhoto({ src, alt, className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failedSrc, setFailedSrc] = useState<string>();
  if (src && failedSrc === src) {
    return <div role="img" aria-label={`Foto no disponible: ${alt ?? ""}`} className={`grid place-items-center bg-mint text-mint-foreground ${className ?? ""}`}><ImageOff aria-hidden="true" className="h-8 w-8" /></div>;
  }
  // referrerPolicy: muchas webs bloquean imágenes enlazadas desde otro sitio; así se envían sin referencia.
  return <img referrerPolicy="no-referrer" {...props} src={src} alt={alt} className={className} onError={() => setFailedSrc(src)} />;
}