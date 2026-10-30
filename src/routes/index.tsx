import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Clock, Wallet, Leaf, MapPin, CalendarDays, MessageCircle, QrCode, Sparkles, Heart, Facebook, Instagram, Youtube, X,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import { recetas, filtros, mercados, WHATSAPP_GROUP_URL, type Receta } from "@/lib/kallpa-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kallpa Nutrición · Recetas nutritivas y económicas de Cusco" },
      { name: "description", content: "Recetas fáciles, nutritivas y económicas con productos de los mercados de Cusco." },
      { property: "og:title", content: "Kallpa Nutrición · Sabor local al alcance de tu bolsillo" },
      { property: "og:description", content: "Recetas cusqueñas desde S/ 2.50, guía de mercados y comunidad WhatsApp para familias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const soles = (n: number) => `S/ ${n.toFixed(2)}`;

function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
        <Leaf className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-bold leading-none">
        Kallpa <span className="text-leaf">Nutrición</span>
      </span>
    </a>
  );
}

function WaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={WHATSAPP_GROUP_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-whatsapp-foreground shadow-warm transition hover:brightness-105 hover:-translate-y-0.5 ${className}`}
    >
      <MessageCircle className="h-5 w-5" /> {children}
    </a>
  );
}

const QR_N = 25;
const qrCells: [number, number][] = (() => {
  const cells: [number, number][] = [];
  const finder = (x: number, y: number) =>
    ([[0, 0], [QR_N - 7, 0], [0, QR_N - 7]] as [number, number][]).some(([fx, fy]) => x >= fx - 1 && x < fx + 8 && y >= fy - 1 && y < fy + 8);
  let seed = 7;
  for (let y = 0; y < QR_N; y++)
    for (let x = 0; x < QR_N; x++) {
      seed = (seed * 9301 + 49297) % 233280;
      const center = Math.abs(x - 12) < 4 && Math.abs(y - 12) < 4;
      if (!finder(x, y) && !center && seed / 233280 > 0.5) cells.push([x, y]);
    }
  return cells;
})();

function QrPlaceholder({ size = "h-36 w-36" }: { size?: string }) {
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x} y={y} width={7} height={7} rx={1.6} className="fill-earth" />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={1} className="fill-card" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.8} className="fill-primary" />
    </g>
  );
  return (
    <div className={`${size} relative rounded-2xl bg-card p-2 shadow-sm ring-1 ring-border`} role="img" aria-label="Código QR de la comunidad Kallpa (próximamente)">
      <svg viewBox={`0 0 ${QR_N} ${QR_N}`} className="h-full w-full">
        {qrCells.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width={0.84} height={0.84} rx={0.3} className="fill-earth" />
        ))}
        <Finder x={0} y={0} />
        <Finder x={QR_N - 7} y={0} />
        <Finder x={0} y={QR_N - 7} />
      </svg>
      <span className="absolute left-1/2 top-1/2 grid h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground ring-4 ring-card">
        <Leaf className="h-1/2 w-1/2" />
      </span>
    </div>
  );
}

function Index() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [abierta, setAbierta] = useState<Receta | null>(null);
  const [mercadoAbierto, setMercadoAbierto] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(true);

  const lista = useMemo(() => {
    const f = filtros.find((x) => x.id === filtro)!;
    const q = busqueda.trim().toLowerCase();
    return recetas.filter((r) => f.test(r) && (!q || r.nombre.toLowerCase().includes(q) || r.ingredientes.join(" ").toLowerCase().includes(q)));
  }, [filtro, busqueda]);

  const destacadas = recetas.filter((r) => ["solterito", "ponche-habas", "crema-zapallo"].includes(r.id));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <a href="#inicio" className="hover:text-primary">Inicio</a>
            <a href="#recetario" className="hover:text-primary">Recetario</a>
            <a href="#mercados" className="hover:text-primary">Mercado Local</a>
            <a href="#comunidad" className="hover:text-primary">Comunidad WhatsApp</a>
            <a href="#nosotros" className="hover:text-primary">Sobre Nosotros</a>
          </nav>
          <WaButton className="px-4 py-2 text-sm">Comunidad</WaButton>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <img src={hero} alt="Productos andinos del mercado cusqueño" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="max-w-xl text-earth-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-corn px-3 py-1 text-sm font-bold text-corn-foreground">
              <Sparkles className="h-4 w-4" /> Hecho con cariño en Cusco
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Nutrición con Sabor Local y al Alcance de tu Bolsillo
            </h1>
            <p className="mt-5 text-lg opacity-90">
              Recetas fáciles, nutritivas y económicas con productos de los mercados de Cusco.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#recetario" className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-warm transition hover:-translate-y-0.5">
                Explorar Recetas
              </a>
              <WaButton>Unirme al WhatsApp Kallpa</WaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Recetario */}
      <section id="recetario" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Nuestro Recetario Familiar</h2>
          <p className="mt-2 text-muted-foreground">Elige lo que necesitas hoy, ¡todo con ingredientes de tu casera!</p>
        </div>

        <div className="rounded-3xl border bg-card p-4 shadow-sm md:p-6">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Busca una receta o ingrediente: quinua, tarwi, kion…"
              className="w-full rounded-full border bg-background py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtros de recetas">
            {filtros.map((f) => (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                aria-pressed={filtro === f.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  filtro === f.id ? "border-primary bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:border-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((r) => (
            <article key={r.id} className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-warm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={r.imagen} alt={r.nombre} loading="lazy" width={944} height={704} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold">{r.categoria}</span>
                <span className="absolute right-3 top-3 rounded-full bg-corn px-3 py-1 text-sm font-extrabold text-corn-foreground">{soles(r.costo)}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold leading-snug">{r.nombre}</h3>
                <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {r.minutos} min</span>
                  <span className="flex items-center gap-1"><Wallet className="h-4 w-4" /> por porción</span>
                  <span>{r.dificultad}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.badges.map((b) => (
                    <span key={b} className="rounded-full bg-mint px-2.5 py-0.5 text-xs font-bold text-mint-foreground">{b}</span>
                  ))}
                </div>
                <button onClick={() => setAbierta(r)} className="mt-5 rounded-full bg-leaf py-2.5 font-bold text-leaf-foreground transition hover:brightness-110">
                  Ver Receta
                </button>
              </div>
            </article>
          ))}
          {lista.length === 0 && (
            <p className="col-span-full rounded-3xl bg-muted p-10 text-center text-muted-foreground">
              Ups, no encontramos recetas con ese filtro. ¡Prueba con otro!
            </p>
          )}
        </div>
      </section>

      {/* Superalimento */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Superalimento de temporada</span>
            <h2 className="mt-2 text-4xl font-bold">El Tarwi: la proteína de los Andes</h2>
            <p className="mt-4 text-muted-foreground">
              Tiene casi el doble de proteína que la carne, es rico en calcio y hierro, y cuesta menos de S/ 8 el kilo en el mercado.
              Perfecto para que tus hijos crezcan fuertes y sanos.
            </p>
            <ul className="mt-5 space-y-2 text-sm font-semibold">
              <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> Fortalece músculos y huesos</li>
              <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> Ayuda a controlar el azúcar en la sangre</li>
              <li className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> Te mantiene lleno por más tiempo</li>
            </ul>
          </div>
          <div className="space-y-3">
            {destacadas.map((r) => (
              <button key={r.id} onClick={() => setAbierta(r)} className="flex w-full items-center gap-4 rounded-2xl bg-card p-3 text-left shadow-sm transition hover:shadow-warm">
                <img src={r.imagen} alt="" loading="lazy" width={944} height={704} className="h-16 w-20 rounded-xl object-cover" />
                <span className="flex-1 font-bold">{r.nombre}</span>
                <span className="rounded-full bg-corn px-3 py-1 text-sm font-extrabold text-corn-foreground">{soles(r.costo)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mercados */}
      <section id="mercados" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Guía de Mercados de Cusco</h2>
          <p className="mt-2 text-muted-foreground">Dónde comprar fresco, rico y barato. ¡Apoyemos a nuestros productores!</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {mercados.map((m) => {
            const open = mercadoAbierto === m.nombre;
            return (
              <div key={m.nombre} className="rounded-3xl border bg-card p-6 shadow-sm transition hover:shadow-warm">
                <h3 className="text-xl font-bold">{m.nombre}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {m.zona}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4 text-primary" /> {m.dias}</p>
                <button
                  onClick={() => setMercadoAbierto(open ? null : m.nombre)}
                  aria-expanded={open}
                  className="mt-4 rounded-full border-2 border-primary px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  {open ? "Ocultar tips" : "Ver tips de compra en este mercado"}
                </button>
                {open && (
                  <ul className="mt-4 space-y-2 rounded-2xl bg-mint p-4 text-sm text-mint-foreground animate-in fade-in slide-in-from-top-2">
                    {m.tips.map((t) => <li key={t} className="flex gap-2"><Leaf className="mt-0.5 h-4 w-4 shrink-0" /> {t}</li>)}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Comunidad */}
      <section id="comunidad" className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] bg-earth p-8 text-earth-foreground md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Únete a la familia Kallpa en WhatsApp</h2>
            <p className="mt-3 max-w-xl opacity-90">
              Cada semana te enviamos el menú económico, ofertas de los mercados y videitos cortos para cocinar rico y sano. ¡Es gratis!
            </p>
            <WaButton className="mt-6 text-lg">Unirme al Grupo VIP de Kallpa</WaButton>
          </div>
          <div className="flex flex-col items-center gap-2">
            <QrPlaceholder size="h-44 w-44" />
            <span className="text-sm opacity-80">Escanea con tu celular</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="nosotros" className="border-t bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Somos un equipo cusqueño que cree que comer sano no tiene que ser caro. "Kallpa" significa fuerza en quechua.
            </p>
            <div className="mt-4 flex gap-3 text-muted-foreground">
              <Facebook className="h-5 w-5" /><Instagram className="h-5 w-5" /><Youtube className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h4 className="font-bold">Categorías</h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {["Desayunos", "Almuerzos", "Cenas", "Jugos y Extractos", "Postres Nutritivos"].map((c) => <li key={c}><a href="#recetario" className="hover:text-primary">{c}</a></li>)}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="font-bold">Acceso rápido</h4>
            <QrPlaceholder size="h-28 w-28" />
          </div>
        </div>
        <p className="border-t px-4 py-5 text-center text-xs text-muted-foreground">
          La información es educativa y no reemplaza la consulta con tu médico o nutricionista. Hecho con ♥ en Cusco.
        </p>
      </footer>

      {/* Banner flotante */}
      {bannerVisible && (
        <div className="fixed bottom-4 right-4 z-30 hidden max-w-xs items-center gap-3 rounded-2xl border bg-card p-3 shadow-warm sm:flex">
          <QrPlaceholder size="h-16 w-16" />
          <div className="flex-1">
            <p className="text-sm font-bold">¿Menús semanales gratis?</p>
            <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noreferrer" className="mt-1 inline-block rounded-full bg-whatsapp px-3 py-1 text-xs font-bold text-whatsapp-foreground">
              Unirme al Grupo VIP
            </a>
          </div>
          <button onClick={() => setBannerVisible(false)} aria-label="Cerrar" className="self-start text-muted-foreground"><X className="h-4 w-4" /></button>
        </div>
      )}

      <RecetaModal receta={abierta} onClose={() => setAbierta(null)} />
    </div>
  );
}

function RecetaModal({ receta, onClose }: { receta: Receta | null; onClose: () => void }) {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  if (!receta) return null;
  const texto = encodeURIComponent(
    `¡Mira esta receta de Kallpa Nutrición! 🌽 "${receta.nombre}" por solo ${soles(receta.costo)} la porción. ¡Nutritiva y con productos de nuestros mercados cusqueños!`,
  );
  const listos = receta.ingredientes.filter((i) => checks[receta.id + i]).length;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-2xl">
        <img src={receta.imagen} alt={receta.nombre} width={944} height={704} className="h-56 w-full object-cover" />
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{receta.nombre}</DialogTitle>
            <DialogDescription className="flex flex-wrap gap-3 pt-1">
              <span className="rounded-full bg-corn px-3 py-0.5 font-bold text-corn-foreground">{soles(receta.costo)} por porción</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {receta.minutos} min</span>
              <span>{receta.dificultad}</span>
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="ingredientes" className="mt-5">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ingredientes">Ingredientes</TabsTrigger>
              <TabsTrigger value="pasos">Preparación</TabsTrigger>
              <TabsTrigger value="tips">Tips del Experto</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredientes" className="pt-3">
              <p className="mb-3 text-sm text-muted-foreground">Marca lo que ya tienes — úsala como tu lista de compras ({listos}/{receta.ingredientes.length}).</p>
              <ul className="space-y-2">
                {receta.ingredientes.map((i) => {
                  const k = receta.id + i;
                  return (
                    <li key={i}>
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 hover:bg-muted">
                        <Checkbox checked={!!checks[k]} onCheckedChange={(v) => setChecks((c) => ({ ...c, [k]: !!v }))} />
                        <span className={checks[k] ? "text-muted-foreground line-through" : ""}>{i}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </TabsContent>
            <TabsContent value="pasos" className="pt-3">
              <ol className="space-y-3">
                {receta.pasos.map((p, n) => (
                  <li key={p} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{n + 1}</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ol>
            </TabsContent>
            <TabsContent value="tips" className="pt-3">
              <div className="rounded-2xl bg-mint p-5 text-mint-foreground">
                <h4 className="flex items-center gap-2 text-lg font-bold"><Sparkles className="h-5 w-5" /> El Consejo de Kallpa</h4>
                <ul className="mt-3 space-y-2">
                  {receta.tips.map((t) => <li key={t} className="flex gap-2"><Leaf className="mt-1 h-4 w-4 shrink-0" /> {t}</li>)}
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          <a
            href={`https://wa.me/?text=${texto}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp py-3 font-bold text-whatsapp-foreground transition hover:brightness-105"
          >
            <MessageCircle className="h-5 w-5" /> Compartir en WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
