import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Clock, Home, ShoppingBasket, Copy, Leaf, MapPin, CalendarDays, MessageCircle, Sparkles, Heart, Facebook, Instagram, Youtube, X,
} from "lucide-react";
import { heroImage } from "@/lib/kallpa-images";
import { RecipePhoto } from "@/components/recipe-photo";
import { WhatsAppQr } from "@/components/whatsapp-qr";
import { recetas, filtros, filtrarRecetas, mercados, WHATSAPP_GROUP_URL, type Receta } from "@/lib/kallpa-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kallpa Nutrición · Recetas nutritivas y económicas de Cusco" },
      { name: "description", content: "Recetas fáciles, nutritivas y económicas con productos de los mercados de Cusco." },
      { property: "og:title", content: "Kallpa Nutrición · Sabor local al alcance de tu bolsillo" },
      { property: "og:description", content: "Recetas nutritivas y accesibles para familias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
        <Leaf className="h-5 w-5" />
      </span>
      <span className="font-display text-base sm:text-xl font-bold leading-none">
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

function Index() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [abierta, setAbierta] = useState<Receta | null>(null);
  const [mercadoAbierto, setMercadoAbierto] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(true);

  const lista = useMemo(() => filtrarRecetas(recetas, filtro, busqueda), [filtro, busqueda]);
  const destacadas = recetas.filter((r) => r.ingredientes.some((i) => /tarwi/i.test(i))).slice(0, 3);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
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
          <WaButton className="px-3 py-2 text-xs sm:text-sm">Comunidad</WaButton>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <RecipePhoto src={heroImage ? `${heroImage.url}?sig=${heroImage.index}` : undefined} alt="Verduras frescas para la cocina familiar" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-xl text-earth-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-corn px-3 py-1 text-sm font-bold text-corn-foreground">
              <Sparkles className="h-4 w-4" /> Hecho con cariño en Cusco
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Kallpa Nutrición
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

        <div className="border-y py-5">
          <label className="relative block">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              aria-label="Buscar recetas o ingredientes"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Busca una receta o ingrediente: quinua, tarwi, kion…"
              className="w-full rounded-full border bg-background py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtros de recetas">
            {filtros.map((f) => (
              <Button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                aria-pressed={filtro === f.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  filtro === f.id ? "border-primary bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:border-primary"
                }`}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((r) => (
            <article key={r.id} className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-warm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <RecipePhoto src={r.imagen} alt={`Imagen ilustrativa: ${r.nombre}`} loading="lazy" width={944} height={704} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold">{r.categoria}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold leading-snug">{r.nombre}</h3>
                <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {r.minutos} min</span>
                  <span>{r.dificultad}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.badges.map((b) => (
                    <span key={b} className="rounded-full bg-mint px-2.5 py-0.5 text-xs font-bold text-mint-foreground">{b}</span>
                  ))}
                </div>
                <Button onClick={() => setAbierta(r)} className="h-auto mt-5 rounded-full bg-leaf py-2.5 font-bold text-leaf-foreground transition hover:brightness-110">
                  Ver Receta
                </Button>
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
              <Button key={r.id} onClick={() => setAbierta(r)} variant="ghost" className="flex h-auto w-full items-center gap-4 whitespace-normal rounded-lg bg-card p-3 text-left shadow-sm transition hover:shadow-warm">
                <RecipePhoto src={r.imagen} alt="" loading="lazy" width={944} height={704} className="h-16 w-20 shrink-0 rounded-lg object-cover" />
                <span className="flex-1 font-bold">{r.nombre}</span>

              </Button>
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
        <Tabs defaultValue="san-pedro">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
            {mercados.map((m) => <TabsTrigger key={m.id} value={m.id} className="py-3">{m.corto}</TabsTrigger>)}
          </TabsList>
          {mercados.map((m) => (
            <TabsContent key={m.id} value={m.id} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <RecipePhoto src={m.imagen} alt={`Puestos de productos frescos, imagen ilustrativa para ${m.nombre}`} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full rounded-lg object-cover" />
                <div>
                  <h3 className="text-2xl font-bold">{m.nombre}</h3>
                  <p className="mt-3 flex items-start gap-2 text-muted-foreground"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />{m.zona}</p>
                  <p className="mt-3 flex items-start gap-2"><Clock className="mt-1 h-4 w-4 shrink-0 text-primary" />{m.horario}</p>
                  <p className="mt-3 flex items-start gap-2"><CalendarDays className="mt-1 h-4 w-4 shrink-0 text-primary" />Mejor visita: {m.mejoresDias}</p>
                  <h4 className="mt-5 font-bold">Productos de temporada</h4>
                  <ul className="mt-2 flex flex-wrap gap-2">{m.temporada.map((t) => <li key={t} className="rounded-md bg-secondary px-3 py-1 text-sm">{t}</li>)}</ul>
                  <Button variant="outline" onClick={() => setMercadoAbierto(mercadoAbierto === m.id ? null : m.id)} aria-expanded={mercadoAbierto === m.id} className="mt-5 h-auto whitespace-normal text-primary">
                    {mercadoAbierto === m.id ? "Ocultar tips" : "Ver tips de compra en este mercado"}
                  </Button>
                  {mercadoAbierto === m.id && <ul className="mt-4 space-y-3 rounded-lg bg-mint p-4 text-sm text-mint-foreground">{m.tips.map((t) => <li key={t} className="flex gap-2"><Leaf className="mt-1 h-4 w-4 shrink-0" />{t}</li>)}</ul>}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Comunidad */}
      <section id="comunidad" className="bg-earth px-4 py-12 text-earth-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-8 p-2 text-earth-foreground md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Únete a la familia Kallpa en WhatsApp</h2>
            <p className="mt-3 max-w-xl opacity-90">
              Cada semana te enviamos el menú económico, ofertas de los mercados y videitos cortos para cocinar rico y sano. ¡Es gratis!
            </p>
            <WaButton className="mt-6 text-lg">Unirme al Grupo VIP de Kallpa</WaButton>
          </div>
          <div className="flex flex-col items-center gap-2">
            <WhatsAppQr className="h-64 w-64" />
            <span className="text-sm opacity-80">Escanea con la cámara de tu teléfono y únete</span>
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
            <WhatsAppQr className="h-40 w-40" label="Código QR de acceso rápido al grupo de WhatsApp de Kallpa" />
          </div>
        </div>
        <p className="border-t px-4 py-5 text-center text-xs text-muted-foreground">
          La información es educativa y no reemplaza la consulta con tu médico o nutricionista. Hecho con ♥ en Cusco.
        </p>
      </footer>

      {/* Banner flotante */}
      {bannerVisible && (
        <div className="fixed bottom-4 right-4 z-30 hidden max-w-xs items-center gap-3 rounded-2xl border bg-card p-3 shadow-warm md:flex">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-whatsapp/10 text-whatsapp"><MessageCircle className="h-8 w-8" /></span>
          <div className="flex-1">
            <p className="text-sm font-bold">¿Menús semanales gratis?</p>
            <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noreferrer" className="mt-1 inline-block rounded-full bg-whatsapp px-3 py-1 text-xs font-bold text-whatsapp-foreground">
              Unirme al Grupo VIP
            </a>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setBannerVisible(false)} aria-label="Cerrar" className="self-start text-muted-foreground"><X className="h-4 w-4" /></Button>
        </div>
      )}

      <nav aria-label="Navegación móvil" className="mobile-nav fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-background/95 px-2 pt-2 backdrop-blur md:hidden">
        {[{ href: "#inicio", label: "Inicio", icon: Home }, { href: "#recetario", label: "Recetas", icon: ShoppingBasket }, { href: "#mercados", label: "Mercados", icon: MapPin }, { href: WHATSAPP_GROUP_URL, label: "WhatsApp", icon: MessageCircle }].map(({ href, label, icon: Icon }) => (
          <Button key={label} asChild variant="ghost" className="h-auto flex-col gap-1 py-2 text-xs">
            <a href={href} target={label === "WhatsApp" ? "_blank" : undefined} rel={label === "WhatsApp" ? "noreferrer" : undefined}><Icon className={label === "WhatsApp" ? "text-whatsapp" : "text-primary"} />{label}</a>
          </Button>
        ))}
      </nav>
      <RecetaModal key={abierta?.id ?? "closed"} receta={abierta} onClose={() => setAbierta(null)} />
    </div>
  );
}

function VideoTutorial({ receta }: { receta: Receta }) {
  const [reproducir, setReproducir] = useState(false);

  if (!receta.videoUrl) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl bg-mint p-6 text-center text-mint-foreground">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-card shadow-sm">
          <Play className="h-7 w-7 text-primary" />
        </span>
        <p className="font-bold">Video tutorial en preparación</p>
        <p className="max-w-sm text-sm">
          Muy pronto podrás ver el paso a paso de «{receta.nombre}» en video. Mientras tanto, sigue la preparación escrita en la pestaña anterior.
        </p>
      </div>
    );
  }

  if (!reproducir) {
    return (
      <button
        type="button"
        onClick={() => setReproducir(true)}
        className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-earth text-earth-foreground"
        aria-label={`Reproducir video tutorial de ${receta.nombre}`}
      >
        <RecipePhoto src={receta.imagen} alt="" loading="lazy" width={944} height={704} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-warm transition group-hover:scale-110">
            <Play className="h-8 w-8" />
          </span>
        </span>
        <span className="absolute bottom-3 left-3 rounded-md bg-earth/80 px-3 py-1 text-sm font-semibold">
          Toca para ver el video (usa datos móviles)
        </span>
      </button>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-earth">
      <iframe
        src={receta.videoUrl}
        title={`Video tutorial: ${receta.nombre}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

function RecetaModal({ receta, onClose }: { receta: Receta | null; onClose: () => void }) {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [copyStatus, setCopyStatus] = useState("");
  if (!receta) return null;
  const texto = encodeURIComponent(`¡Mira esta receta de Kallpa Nutrición! 🌽 ${receta.nombre}\n\nIngredientes:\n${receta.ingredientes.map((i) => `• ${i}`).join("\n")}\n\nPreparación:\n${receta.pasos.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\n¡Con productos de nuestros mercados cusqueños!`);
  const copiarLista = async () => {
    try {
      await navigator.clipboard.writeText(`${receta.nombre}\n${receta.ingredientes.join("\n")}`);
      setCopyStatus("Lista copiada");
    } catch {
      setCopyStatus("No se pudo copiar. Selecciona los ingredientes e inténtalo de nuevo.");
    }
  };
  const listos = receta.ingredientes.filter((i) => checks[receta.id + i]).length;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto p-0 sm:max-w-2xl">
        <RecipePhoto src={receta.imagen} alt={`Imagen ilustrativa: ${receta.nombre}`} width={944} height={704} className="h-40 sm:h-56 w-full object-cover" />
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{receta.nombre}</DialogTitle>
            <DialogDescription className="flex flex-wrap gap-3 pt-1">
              <span className="rounded-md bg-mint px-3 py-0.5 text-mint-foreground">Económico y Accesible</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {receta.minutos} min</span>
              <span>{receta.dificultad}</span>
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="ingredientes" className="mt-5">
            <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="ingredientes" className="text-xs sm:text-sm">Ingredientes</TabsTrigger>
              <TabsTrigger value="pasos" className="whitespace-normal text-xs sm:text-sm">Leer Paso a Paso</TabsTrigger>
              <TabsTrigger value="tips" className="whitespace-normal text-xs sm:text-sm">Tips del Experto</TabsTrigger>
              <TabsTrigger value="video" className="whitespace-normal text-xs sm:text-sm">Ver Video Tutorial</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredientes" className="pt-3">
              <p className="mb-3 text-sm text-muted-foreground">Ingredientes listos ({listos}/{receta.ingredientes.length}).</p>
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
              <Button variant="outline" onClick={copiarLista} className="mt-4 h-auto w-full whitespace-normal"><Copy />Copiar Lista de Compras</Button>
              <p role="status" className="mt-2 text-sm text-leaf">{copyStatus}</p>
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
            <TabsContent value="video" className="pt-3">
              <VideoTutorial receta={receta} />
            </TabsContent>
          </Tabs>

          <a
            href={`https://wa.me/?text=${texto}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-3 py-4 text-center font-bold text-whatsapp-foreground transition hover:brightness-105"
          >
            <MessageCircle className="h-5 w-5" /> Enviar esta receta por WhatsApp
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
