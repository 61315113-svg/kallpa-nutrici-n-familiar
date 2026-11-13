import ponche from "@/assets/ponche.jpg";
import solterito from "@/assets/solterito.jpg";
import crema from "@/assets/crema.jpg";
import extracto from "@/assets/extracto.jpg";
import mazamorra from "@/assets/mazamorra.jpg";
import sangrecita from "@/assets/sangrecita.jpg";
import guiso from "@/assets/guiso.jpg";
import chicha from "@/assets/chicha.jpg";
import quinua from "@/assets/quinua.jpg";
import sopa from "@/assets/sopa.jpg";
import { recipeImageById, marketImageById } from "@/lib/kallpa-images";

export type Categoria = "Desayuno" | "Almuerzo" | "Cena" | "Bebida" | "Postre" | "Dieta Especial";
type Dieta = "diabeticos" | "vegetariano" | "hierro" | "sin-gluten" | "proteina";

export type Grupo = "ninos" | "gestantes" | "mayores";

export interface Receta {
  id: string;
  nombre: string;
  categoria: Categoria;
  minutos: number;
  dificultad: "Fácil" | "Media";
  imagen: string;
  imagenFuente?: string | undefined;
  badges: string[];
  dietas: Dieta[];
  /** Públicos a los que está dirigida la receta. Si existe, tiene prioridad sobre la deducción automática de `gruposDe`. */
  grupos?: Grupo[];
  ingredientes: string[];
  pasos: string[];
  tips: string[];
  /** URL de embed de YouTube (https://www.youtube.com/embed/VIDEO_ID). Si falta, el modal muestra el estado "video en preparación". */
  videoUrl?: string;
}

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Convierte un ID de YouTube en la URL de embed que funciona dentro de un <iframe>. */
const yt = (id: string) => `https://www.youtube.com/embed/${id}`;

interface Opciones {
  video: string;
  grupos: Grupo[];
  dificultad?: "Fácil" | "Media";
  /** Enlace original de la foto (referencia). */
  fuente?: string;
}

function r(
  categoria: Categoria,
  nombre: string,
  minutos: number,
  imagen: string,
  badges: string[],
  dietas: Dieta[],
  ingredientes: string[],
  pasos: string[],
  tips: string[],
  o: Opciones,
): Receta {
  return {
    id: slug(nombre),
    nombre,
    categoria,
    minutos,
    dificultad: o.dificultad ?? "Fácil",
    imagen,
    imagenFuente: o.fuente,
    badges: ["Económico y Accesible", ...badges],
    dietas,
    grupos: o.grupos,
    ingredientes,
    pasos,
    tips,
    videoUrl: o.video,
  };
}

export const grupos: { id: Grupo; label: string; corto: string }[] = [
  { id: "ninos", label: "Niños en crecimiento", corto: "Niños" },
  { id: "gestantes", label: "Madres gestantes (Prevención de anemia)", corto: "Gestantes" },
  { id: "mayores", label: "Adultos mayores", corto: "Adultos mayores" },
];

// Combinaciones de públicos usadas por las recetas.
const NGM: Grupo[] = ["ninos", "gestantes", "mayores"];
const NG: Grupo[] = ["ninos", "gestantes"];
const NM: Grupo[] = ["ninos", "mayores"];
const GM: Grupo[] = ["gestantes", "mayores"];

/** Grupos que más se benefician. Si la receta define `grupos`, se usan esos; si no, se deducen: hierro/proteína → gestantes; desayunos, almuerzos, postres → niños; cenas, bebidas, dietas especiales o aptas para diabéticos → adultos mayores. */
export function gruposDe(r: Pick<Receta, "categoria" | "dietas" | "grupos">): Grupo[] {
  if (r.grupos && r.grupos.length > 0) return r.grupos;
  const g: Grupo[] = [];
  if (["Desayuno", "Almuerzo", "Postre"].includes(r.categoria) || r.dietas.includes("proteina") || r.dietas.includes("hierro")) g.push("ninos");
  if (r.dietas.includes("hierro") || r.dietas.includes("proteina")) g.push("gestantes");
  if (["Cena", "Bebida", "Dieta Especial"].includes(r.categoria) || r.dietas.includes("diabeticos")) g.push("mayores");
  return g;
}

const recetasBase: Receta[] = [
  // ───────────── Desayunos (5) ─────────────
  r("Desayuno", "Quinua con manzana y canela", 20, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLm0jqecztziRYUueqBfoINO06-036aU-huc67wWd0_jKXeaFerlp5Tsv3&s=10", ["Proteína Completa"], ["vegetariano", "sin-gluten"],
    ["½ taza de quinua bien lavada", "2 tazas de agua", "1 manzana en cubitos", "1 rama de canela", "1 taza de leche", "1 cucharadita de miel o azúcar rubia (opcional)"],
    ["Cocina la quinua con el agua y la rama de canela por 15 minutos, hasta que abra su «colita».", "Agrega la leche y la manzana en cubitos y cocina 5 minutos más moviendo de vez en cuando.", "Sirve tibia con una pizca de canela molida por encima."],
    ["La quinua tiene todos los aminoácidos esenciales: es un desayuno completo para los niños.", "Lávala frotándola bien con agua para quitar la saponina y evitar el sabor amargo.", "La manzana ya endulza: prueba antes de agregar azúcar."],
    { video: yt("P5DjM8aThPQ"), grupos: NGM, fuente: "https://share.google/0OniOG83hiK1nN2t7" }),
  r("Desayuno", "Cañihua con manzana y durazno", 15, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg31PYy93FO8PjQe75louxoiq4blSKszjfoA14yaQEF9flpEFYV6dS-eA&s=10", ["Rico en Hierro"], ["vegetariano", "hierro", "sin-gluten"],
    ["4 cucharadas de cañihua tostada molida", "2 tazas de agua", "1 manzana picada", "1 durazno pelado y picado", "1 rama de canela", "1 taza de leche (opcional)"],
    ["Hierve el agua con la canela y las frutas picadas por 8 minutos.", "Disuelve la cañihua en un poco de agua fría y agrégala a la olla moviendo sin parar para que no se formen grumos.", "Cocina 5 minutos más, agrega la leche si deseas y sirve caliente."],
    ["La cañihua es uno de los granos andinos con más hierro: gran aliada contra la anemia.", "Acompáñala con la fruta (vitamina C) para que el cuerpo absorba mejor el hierro.", "No necesita lavarse porque no tiene saponina."],
    { video: yt("EvAoy_-ztdE"), grupos: NGM, fuente: "https://share.google/KbZMocM2AY6beej4S" }),
  r("Desayuno", "Tamalitos de maíz con queso", 35, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrxaJlzEgPRGFWIamo8DByIns3LMOsE5T6jn26hx3V6Vg-vT7AF9B-Wc&s=10", ["Energía Andina"], ["vegetariano", "sin-gluten"],
    ["2 tazas de choclo molido", "100 g de queso fresco", "1 huevo", "1 cucharada de manteca", "6 pancas de choclo remojadas", "Sal y una pizca de anís"],
    ["Mezcla el choclo molido con el huevo, la manteca, la sal y el anís hasta formar una masa suave.", "Coloca una porción de masa en cada panca con un trozo de queso al centro y envuelve bien.", "Cocina al vapor por 30 a 35 minutos y deja reposar 5 minutos antes de abrir."],
    ["El choclo cusqueño da energía de sobra para empezar el día.", "Prepara varios: duran hasta 3 días en refrigeración y se recalientan al vapor.", "El queso fresco aporta calcio para huesos fuertes."],
    { video: yt("CMVPbgJ06Ls"), grupos: NM, dificultad: "Media", fuente: "https://share.google/CsqFlpBmOVhAIa2wz" }),
  r("Desayuno", "Pan con sangrecita y criollita", 15, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEXew0ViVxUFwhWFNAlMSoj3X1PwXNw7M4CcQ6yIzB9dvXa8a-jp9wS8uI&s=10", ["Rico en Hierro"], ["hierro"],
    ["4 panes de tu panadería", "200 g de sangrecita cocida", "1 cebolla roja en pluma", "1 limón", "2 dientes de ajo", "Perejil picado y sal"],
    ["Saltea la sangrecita desmenuzada con el ajo y la sal por 5 minutos.", "Prepara la criollita mezclando la cebolla en pluma con el jugo de limón, el perejil y una pizca de sal.", "Abre los panes y rellénalos con la sangrecita y la criollita."],
    ["La sangrecita es el aliado más barato contra la anemia.", "El limón de la criollita ayuda a absorber mejor el hierro.", "Evita acompañarlo con té o café: reducen la absorción del hierro."],
    { video: yt("Gw67KRxxICM"), grupos: NG, fuente: "https://share.google/QwzHMlE62ZAQnnwLc" }),
  r("Desayuno", "Avena con maca y plátano", 12, "https://www.biotona.be/wp-content/uploads/maca-chocolate-overnight-oats_838fd8bff273ab839e60eb378179d9c4_2000.jpg", ["Energía"], ["vegetariano"],
    ["½ taza de avena en hojuelas", "1 cucharada de maca en polvo", "1 plátano maduro", "1 taza de leche o agua", "1 pizca de canela molida"],
    ["Cocina la avena con la leche (o el agua) por 5 minutos moviendo seguido.", "Retira del fuego, agrega la maca y mezcla bien.", "Sirve con el plátano en rodajas y la canela."],
    ["La maca da energía y buen ánimo; empieza con una cucharadita en los niños pequeños.", "El plátano aporta potasio para los músculos.", "Si no tienes leche, prepárala con agua y quedará igual de rica."],
    { video: yt("fnympAQQRK8"), grupos: NGM, fuente: "https://share.google/L8iMsbDqPDUFnFIrO" }),

  // ───────────── Almuerzos (6) ─────────────
  r("Almuerzo", "Solterito cusqueño", 25, "https://i.ytimg.com/vi/QCf4yAk_STY/sddefault.jpg", ["Alto en Proteína"], ["vegetariano", "sin-gluten"],
    ["1 taza de habas verdes cocidas", "1 taza de choclo desgranado cocido", "½ taza de tarwi desamargado", "100 g de queso fresco en cubos", "1 tomate", "½ cebolla roja", "Limón, aceite, sal y orégano"],
    ["Pela las habas ya cocidas y pica el tomate, la cebolla y el queso en cubitos.", "Mezcla todo con el choclo y el tarwi en un recipiente grande.", "Aliña con limón, aceite, sal y orégano; sirve al momento."],
    ["El tarwi tiene más proteína que la carne y es muy económico.", "Habas y queso juntos dan proteína de calidad a muy bajo costo.", "Plato fresco y sin cocción final: ideal para días de poco tiempo."],
    { video: yt("pMffBCmExAM"), grupos: GM, fuente: "https://share.google/DwL3yESpi1luuIp1f" }),
  r("Almuerzo", "Sangrecita con puré de espinacas", 25, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIlSR2Ln-t2m7E9aytgMsOxzWXv3rYegF6B8vYAITZKaWLVhl4YIsqtW4&s=10", ["Rico en Hierro"], ["hierro", "sin-gluten"],
    ["250 g de sangrecita cocida", "1 cebolla roja", "2 dientes de ajo", "3 papas", "2 tazas de espinaca", "1 cucharada de aceite y sal"],
    ["Sancocha las papas y las espinacas por 10 minutos; aplasta con un poco de agua de cocción hasta formar un puré verde.", "Saltea el ajo y la cebolla, agrega la sangrecita desmenuzada y cocina 8 minutos.", "Sirve la sangrecita sobre el puré de espinacas."],
    ["Es un plato doble en hierro: sangre (hierro hemo) y espinaca (hierro vegetal).", "Acompáñalo con un vaso de limonada o jugo de naranja para absorber más hierro.", "Para los más pequeños, tritura la sangrecita bien fina."],
    { video: yt("6x6dtecQ81M"), grupos: NG, fuente: "https://share.google/3KR3N8I1sBtk8DPsb" }),
  r("Almuerzo", "Locro de zapallo", 30, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWyX1QgIpsqDhtDlhN64VK4hU1Oy1C1KlhrD8LPFy-3aUa_2zsuVvCMcBU&s=10", ["Vitamina A"], ["vegetariano", "sin-gluten"],
    ["½ kg de zapallo en trozos", "2 papas amarillas", "1 choclo desgranado", "1 cebolla", "2 dientes de ajo", "100 g de queso fresco", "1 taza de leche"],
    ["Sofríe la cebolla y el ajo en poco aceite hasta que estén transparentes.", "Agrega el zapallo, las papas y el choclo, cubre con agua y cocina 20 minutos hasta que estén suaves.", "Aplasta un poco para espesar, añade la leche y el queso en cubos, y deja hervir 3 minutos."],
    ["El zapallo cuida la vista y las defensas de los niños.", "Si tienes zapallo loche, úsalo: es más cremoso y dulce.", "Añade una cucharada de quinua cocida para volverlo un plato más completo."],
    { video: yt("pSkecOL5DbY"), grupos: NGM, fuente: "https://share.google/dm5gDt8Ey2CABcAfy" }),
  r("Almuerzo", "Olluquito con carne", 35, "https://i.ytimg.com/vi/FYK94g0HIK8/maxresdefault.jpg", ["Casero"], ["sin-gluten"],
    ["½ kg de olluco en tiras", "250 g de carne de res en trocitos", "1 cebolla", "2 dientes de ajo", "1 cucharada de ají panca molido", "Perejil picado, sal y comino"],
    ["Dora la carne en una olla y retírala.", "En la misma olla prepara un aderezo con cebolla, ajo, ají panca y comino; regresa la carne con un poco de agua y cocina 15 minutos.", "Agrega el olluco y cocina 10 minutos más; termina con perejil."],
    ["El olluco es fuente de vitamina C y muy fácil de digerir.", "No laves el olluco después de picarlo para que no suelte baba.", "Sírvelo con arroz o papa sancochada para completar el plato."],
    { video: yt("FYK94g0HIK8"), grupos: NG, fuente: "https://share.google/GcfkejqoNTgPSBhly" }),
  r("Almuerzo", "Pepián de choclo con pollo", 35, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl663dsteZulUs-4TOD1LoZMuc6SgxE2J2NPFoO_2iBzoHUb313IJH8qg&s=10", ["Tradicional"], ["sin-gluten"],
    ["3 choclos rallados", "4 presas de pollo sin piel", "1 cebolla", "1 cucharada de ají amarillo molido", "2 dientes de ajo", "Culantro picado y sal"],
    ["Dora el pollo y prepara el aderezo con cebolla, ajo y ají amarillo.", "Agrega el choclo rallado con 2 tazas de agua y mueve sin parar para que no se pegue.", "Cocina el pollo dentro del pepián por 25 minutos y termina con culantro."],
    ["El choclo aporta fibra y energía a toda la familia.", "Quita la piel del pollo para un plato más ligero.", "Usa choclo tierno de temporada: es más barato y más dulce."],
    { video: yt("TT2cLGoVp4s"), grupos: NGM, dificultad: "Media", fuente: "https://share.google/3rCK0U6Mzh9FmlOHV" }),
  r("Almuerzo", "Sopa de morón con verduras", 40, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdGgcpKYWbLhRYEIgRKSfBAV3rBp8QAfSO9eE2eld0vw&s=10", ["Reconfortante"], ["vegetariano"],
    ["½ taza de morón (trigo partido) lavado", "1 zanahoria en cubitos", "2 papas en cubos", "1 rama de apio", "½ taza de habas o arvejas", "Hierbabuena y sal"],
    ["Hierve 1,5 litros de agua con la zanahoria, el apio y las papas.", "Agrega el morón lavado y cocina 25 minutos a fuego medio.", "Añade las habas o arvejas 5 minutos antes de terminar y sirve con hierbabuena picada."],
    ["El morón aporta fibra que cuida la digestión.", "Remoja el morón 1 hora antes para que se cocine más rápido y ahorres gas.", "Es una sopa económica que rinde para toda la familia."],
    { video: yt("B6TO__AK5gU"), grupos: NGM }),

  // ───────────── Cenas ligeras (5) ─────────────
  r("Cena", "Sopa de pollo", 25, "https://cocina-casera.com/wp-content/uploads/2017/12/Sopa-de-pollo.jpg", ["Reconfortante"], ["sin-gluten"],
    ["2 presas de pollo sin piel", "1 zanahoria", "1 papa", "1 rama de apio", "1 trozo de kion", "Cebolla china y sal"],
    ["Hierve el pollo con el kion y la cebolla china por 15 minutos.", "Agrega la zanahoria, la papa y el apio en trozos pequeños.", "Cocina 10 minutos más y sirve caliente con cebolla china picada."],
    ["Perfecta para las noches frías de Cusco.", "El kion ayuda a la digestión y a las defensas.", "Desmenuza el pollo para los niños pequeños."],
    { video: yt("c0BjFl5xSeY"), grupos: NGM, fuente: "https://share.google/97UnCOXHpcYb1jaCi" }),
  r("Cena", "Sopa de sémola", 15, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwTuCQ-6oPd8teYQ-UBcR6L8CVcHYNhKGEjsUb7VckDugkQAN7lahye9mv&s=10", ["Rápida"], ["vegetariano"],
    ["3 cucharadas de sémola", "1 litro de agua", "1 zanahoria rallada", "1 papa pequeña en cubitos", "½ taza de leche", "Hierbabuena y sal"],
    ["Hierve el agua con la zanahoria y la papa por 8 minutos.", "Agrega la sémola en lluvia moviendo con cuchara para evitar grumos.", "Cocina 5 minutos, añade la leche y sirve con hierbabuena."],
    ["Es suave y fácil de digerir: ideal para cenar liviano.", "Se prepara en 15 minutos con insumos que ya tienes en casa.", "Deja que se entibie un poco antes de servir a los niños."],
    { video: yt("kwrIILMMEPY"), grupos: NM, fuente: "https://share.google/Tw8qkMS3WQgrz93BE" }),
  r("Cena", "Torrejita de verduras", 20, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I6Wpgwwr5lxZ-WGjsRz7plrvyKRbUDPEFr3kB0cO8IH96IAOCfODoEk&s=10", ["Aprovecha sobras"], ["vegetariano"],
    ["1 zanahoria rallada", "1 taza de espinaca picada", "2 huevos", "3 cucharadas de harina o avena molida", "Cebolla china picada", "Sal y aceite"],
    ["Mezcla las verduras con los huevos, la harina y la sal.", "Calienta una sartén con poquito aceite.", "Cocina cucharadas de la mezcla 3 minutos por lado hasta dorar."],
    ["Es una excelente forma de que los niños coman verduras sin protestar.", "Usa las verduras que te sobren del día para ahorrar.", "Sírvelas con ensalada fresca de tomate y cebolla."],
    { video: yt("yHiNH1YU-Wc"), grupos: NGM, fuente: "https://share.google/HS3eZrBnsLroCLrWG" }),
  r("Cena", "Torrejita de plátano", 15, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIK36OgOL739WwGryBy51bjlf3yPgV3QdwY7YWEbFl5dA-1_CIPK6oJYDQ&s=10", ["Rápida"], ["vegetariano"],
    ["2 plátanos de la isla maduros", "1 huevo", "3 cucharadas de avena molida", "1 pizca de canela", "Aceite para la sartén"],
    ["Aplasta los plátanos con un tenedor hasta formar un puré.", "Mezcla con el huevo, la avena y la canela.", "Cocina cucharadas en una sartén con poquito aceite, 2 minutos por lado."],
    ["Dulce natural, sin azúcar añadida.", "El plátano aporta potasio y energía suave para la noche.", "Cocínalas a fuego medio para que no se quemen por fuera."],
    { video: yt("X6oIKa-9oCs"), grupos: NM, fuente: "https://share.google/kydV781ej8zO20rQK" }),
  r("Cena", "Rollos de plátano cocido con queso", 20, "https://recetaslily.com/wp-content/uploads/2021/10/3-7.jpg.webp", ["Económico"], ["vegetariano", "sin-gluten"],
    ["3 plátanos de la isla verdes o pintones", "100 g de queso fresco en tiras", "1 cucharadita de mantequilla", "Sal", "Orégano (opcional)"],
    ["Sancocha los plátanos pelados por 15 minutos hasta que estén suaves.", "Aplástalos formando tiras, coloca el queso al centro y enrolla.", "Dora ligeramente en una sartén con mantequilla y sirve tibio."],
    ["El plátano cocido da saciedad sin pesadez en la noche.", "El queso fresco aporta calcio y proteína.", "Usa plátano de la isla: es barato y se consigue en cualquier mercado."],
    { video: yt("TUH8m5ZAMr8"), grupos: NGM, fuente: "https://share.google/iaYVyLi2c40VLnUOo" }),

  // ───────────── Bebidas (6) ─────────────
  r("Bebida", "Extracto antiinflamatorio (kion, piña y cúrcuma)", 10, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOynx6p6TTQYbQ11wSDu-tEdHAQMzL04khNQzBvBGquKG1jtoTluY5OKQ&s=10", ["Defensas"], ["vegetariano", "sin-gluten"],
    ["2 rodajas de piña", "1 trocito de kion (2 cm)", "½ cucharadita de cúrcuma fresca o en polvo", "1 naranja exprimida", "1 vaso de agua fría"],
    ["Pela la piña y el kion; exprime la naranja.", "Licúa todo con el agua fría.", "Sirve al momento, sin colar."],
    ["Una pizca de pimienta mejora la absorción de la cúrcuma.", "Tómalo recién hecho para aprovechar la vitamina C.", "En el embarazo usa kion y cúrcuma en poca cantidad y consulta a tu obstetra."],
    { video: yt("f63JJGjl1jY"), grupos: GM, fuente: "https://share.google/bOQlzOxkYi5oeTbUx" }),
  r("Bebida", "Extracto verde de espinaca, manzana y pepino", 10, "https://www.clarin.com/2024/12/04/pc0FKQXjr_2000x1500__1.jpg", ["Rico en Hierro"], ["vegetariano", "hierro", "sin-gluten"],
    ["1 taza de espinaca fresca", "1 manzana verde", "½ pepino", "1 limón exprimido", "1 vaso de agua fría"],
    ["Lava muy bien las hojas de espinaca.", "Licúa con la manzana, el pepino, el limón y el agua.", "Sirve sin colar para conservar la fibra."],
    ["El limón ayuda a absorber el hierro de la espinaca.", "Ideal a media mañana o antes del almuerzo.", "Si a los niños no les gusta el verde, empieza con menos espinaca y más manzana."],
    { video: yt("a7NWHbTHziU"), grupos: NGM, fuente: "https://share.google/SscQ7XsGZibWuDceM" }),
  r("Bebida", "Jugo de leche, beterraga y plátano", 10, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBZMRrhe1TXDexRsoI1h9e5IhevbAzFP86lafEXAAHo2rDVHteqcGz6xrm&s=10", ["Rico en Hierro"], ["vegetariano", "sin-gluten"],
    ["1 beterraga pequeña cocida", "1 plátano", "1 taza de leche fría", "1 cucharadita de miel (opcional)", "Hielo (opcional)"],
    ["Pela la beterraga ya cocida y pícala.", "Licúa con el plátano y la leche hasta que quede cremoso.", "Sirve frío y consume al momento."],
    ["La beterraga aporta folatos, importantes en el embarazo y en el crecimiento.", "Es un «batido rosado» que a los niños les encanta.", "Cocina la beterraga el día anterior y ahorra tiempo en la mañana."],
    { video: yt("zS738FGlQtw"), grupos: NG, fuente: "https://share.google/uVTfqyCMhDq85cIVa" }),
  r("Bebida", "Emoliente", 25, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmE3CgcuPuzi__jIFdTeqWdhgC-b1a79s6p1yOkc1sohlSS9IcqLCp1okD&s=10", ["Tradicional"], ["vegetariano", "sin-gluten"],
    ["2 cucharadas de cebada tostada", "1 cucharada de linaza", "1 puñado de cola de caballo", "1 puñado de alfalfa", "1 limón", "1,5 litros de agua"],
    ["Hierve la cebada en el agua por 15 minutos.", "Agrega la linaza y las hierbas y cocina 10 minutos más.", "Cuela y sirve caliente con limón."],
    ["La linaza cuida la digestión y el estómago.", "Endulza muy poco o nada.", "Si estás gestando, consulta antes de tomar hierbas medicinales con frecuencia."],
    { video: yt("G0xHmfnJS5o"), grupos: NGM, fuente: "https://share.google/ak14T99E6NmhVVLch" }),
  r("Bebida", "Chicha morada", 35, "https://acomer.pe/wp-content/uploads/2017/01/chichamoradaweb.jpg", ["Antioxidante"], ["vegetariano", "sin-gluten"],
    ["2 mazorcas de maíz morado", "Cáscara de 1 piña", "1 manzana", "1 rama de canela y 3 clavos", "2 limones", "Azúcar rubia al gusto (poca)"],
    ["Hierve el maíz morado con la cáscara de piña, la manzana y las especias por 30 minutos.", "Deja enfriar y cuela.", "Agrega el jugo de limón y el azúcar al servir."],
    ["El maíz morado ayuda a cuidar el corazón y la presión.", "Aprovecha la cáscara de piña: ahorras y le da más sabor.", "Con poca azúcar es una bebida más saludable que las gaseosas."],
    { video: yt("vg4y10RzWbg"), grupos: NGM, fuente: "https://share.google/fHxbbpLrbjsADrLSN" }),
  r("Bebida", "Papaya con linaza", 10, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHkuNnC316QrCHH2-3UKnDtGvhUFGmr_honNGhCiQslP2dpi4QAyF8P98&s=10", ["Digestivo"], ["vegetariano", "sin-gluten"],
    ["2 tazas de papaya madura en trozos", "1 cucharada de linaza molida", "1 vaso de agua o leche", "Unas gotas de limón", "1 cucharadita de miel (opcional)"],
    ["Pica la papaya madura.", "Licúa con el agua (o la leche) y la linaza molida.", "Sirve al instante con unas gotas de limón."],
    ["La papaya ayuda a la digestión y combate el estreñimiento.", "Muele la linaza para que el cuerpo la aproveche mejor.", "Usa solo papaya bien madura, sobre todo durante el embarazo."],
    { video: yt("l72vh8fpEUU"), grupos: NGM, fuente: "https://share.google/XLFR54PR5MnNtVZtw" }),

  // ───────────── Postres (4) ─────────────
  r("Postre", "Mazamorra de kiwicha", 25, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5GGvzvAFMmJC9qFBHwpMiHCavgEOINuZyFlwdrg9FCnH6bBgL5xulVOqD&s=10", ["Rico en Calcio"], ["vegetariano", "sin-gluten"],
    ["½ taza de kiwicha", "3 tazas de agua", "1 rama de canela", "2 maracuyás", "1 taza de leche", "1 cucharada de azúcar rubia o miel"],
    ["Cocina la kiwicha con el agua y la canela por 15 minutos.", "Agrega la leche y el azúcar y cocina 5 minutos más.", "Deja entibiar, sirve en pocillos y corona con pulpa de maracuyá."],
    ["La kiwicha aporta calcio, hierro y proteína.", "Es un postre nutritivo que reemplaza a las golosinas.", "Sirve tibia o fría según el clima."],
    { video: yt("uGQc3-ZRUXo"), grupos: NGM, fuente: "https://share.google/5wa9alH3k2WiThhOR" }),
  r("Postre", "Mazamorra morada", 35, "https://mirecetadehoy.com/assets/images/2025/12/mazamorra-morada_800x534.webp", ["Tradicional"], ["vegetariano", "sin-gluten"],
    ["1 litro de chicha morada preparada", "3 cucharadas de chuño o maicena", "1 manzana picada", "Piña y guindones picados", "1 rama de canela", "Canela molida para servir"],
    ["Calienta la chicha morada con la canela y las frutas picadas por 10 minutos.", "Disuelve el chuño en un poco de agua fría y agrégalo moviendo sin parar.", "Cocina 5 minutos hasta espesar y sirve con canela molida."],
    ["Aprovecha las frutas de temporada: son más baratas y dulces.", "Usa poca azúcar; la fruta ya endulza.", "Es una buena forma de aprovechar la chicha que sobró."],
    { video: yt("zB7WDROjcQ0"), grupos: NGM, fuente: "https://share.google/t9sRVZZtAowDj1gnf" }),
  r("Postre", "Mousse de fresa", 15, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3FlYQX2QsOj3mEnfRKo5OWoJEmTi_avYdF_l2S_9NeHg4olmyOABrF6yo&s=10", ["Rápida"], ["vegetariano", "sin-gluten"],
    ["1 taza de fresas lavadas", "1 taza de yogur natural espeso", "1 cucharada de miel", "Unas gotas de limón", "Hojas de hierbabuena para decorar"],
    ["Licúa las fresas con la miel y el limón hasta obtener una crema.", "Mezcla suavemente con el yogur sin batir en exceso.", "Sirve en vasitos y refrigera 10 minutos."],
    ["Las fresas aportan vitamina C que ayuda a absorber el hierro.", "El yogur suma calcio y proteína.", "Si no hay fresas, prueba con aguaymanto o durazno de temporada."],
    { video: yt("nGATsJzMoBY"), grupos: NG, fuente: "https://share.google/HnbSL9FTlCqLZW9zc" }),
  r("Postre", "Budín de quinua", 40, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoTWtcCvfUbms3BbgX_z-yQ1PRbsUMF1HsrPT-4_uywOoCGrdChiWSAe0q&s=10", ["Proteína Completa"], ["vegetariano", "sin-gluten"],
    ["1 taza de quinua cocida", "2 huevos", "1 taza de leche", "3 cucharadas de pasas", "2 cucharadas de azúcar rubia", "Canela y vainilla"],
    ["Mezcla la quinua cocida con los huevos, la leche, el azúcar, las pasas, la canela y la vainilla.", "Vierte en un molde engrasado.", "Hornea a 180 °C por 30 a 35 minutos, hasta que cuaje y dore."],
    ["Aprovecha la quinua que sobró del almuerzo.", "Las pasas dan dulzor natural y un poco de hierro.", "Ideal para la lonchera de los niños."],
    { video: yt("iR41woet72E"), grupos: NGM, dificultad: "Media", fuente: "https://share.google/wZjKUwy7oJl0VoskE" }),
];

export const recetas: Receta[] = recetasBase.map((receta) => {
  // Si la receta ya trae una imagen directa (http...), se respeta y no se reemplaza por el catálogo.
  const photo = receta.imagen.startsWith("http") ? undefined : recipeImageById.get(receta.id);
  return { ...receta, imagen: photo ? `${photo.url}?sig=${photo.index}` : receta.imagen, imagenFuente: photo?.sourceUrl ?? receta.imagenFuente };
});

export interface Filtro {
  id: string;
  label: string;
  test: (r: Receta) => boolean;
}

export const filtrosRapidos: Filtro[] = [
  { id: "todas", label: "Todas", test: () => true },
  { id: "rapidas", label: "Rápidas (<20 min)", test: (r) => r.minutos < 20 },
  { id: "economicas", label: "Económicas", test: (r) => r.badges.includes("Económico y Accesible") },
  { id: "pocos", label: "Pocos ingredientes", test: (r) => r.ingredientes.length <= 4 },
];

export const filtrosCategoria: Filtro[] = [
  { id: "desayunos", label: "Desayunos", test: (r) => r.categoria === "Desayuno" },
  { id: "almuerzos", label: "Almuerzos", test: (r) => r.categoria === "Almuerzo" },
  { id: "cenas", label: "Cenas Ligeras", test: (r) => r.categoria === "Cena" },
  { id: "jugos", label: "Bebidas y Extractos", test: (r) => r.categoria === "Bebida" },
  { id: "postres", label: "Postres Nutritivos", test: (r) => r.categoria === "Postre" },
  { id: "especiales", label: "Dietas Especiales", test: (r) => r.categoria === "Dieta Especial" },
  { id: "diabeticos", label: "Diabéticos", test: (r) => r.dietas.includes("diabeticos") },
  { id: "vegetarianos", label: "Vegetarianos", test: (r) => r.dietas.includes("vegetariano") },
  { id: "hierro", label: "Alto en Hierro", test: (r) => r.dietas.includes("hierro") },
  { id: "sin-gluten", label: "Sin Gluten", test: (r) => r.dietas.includes("sin-gluten") },
];

export const filtrosGrupo: Filtro[] = grupos.map((g) => ({ id: g.id, label: g.label, test: (r) => gruposDe(r).includes(g.id) }));

export const filtros = [...filtrosRapidos, ...filtrosGrupo, ...filtrosCategoria];

export function filtrarRecetas(lista: Receta[], filtroId: string, busqueda: string) {
  const f = filtros.find((x) => x.id === filtroId) ?? filtros[0];
  const q = busqueda.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return lista.filter((r) => (!f || f.test(r)) && (!q || norm(r.nombre).includes(q) || norm(r.ingredientes.join(" ")).includes(q)));
}

const mercadosBase = [
  {
    id: "san-pedro",
    corto: "San Pedro",
    nombre: "Mercado de San Pedro",
    zona: "Centro Histórico, a 5 cuadras de la Plaza de Armas",
    horario: "Todos los días · 6:00 a.m. – 6:00 p.m.",
    mejoresDias: "Lunes a sábado, temprano",
    temporada: ["Granos andinos", "Frutas de la selva", "Quesos frescos", "Hierbas aromáticas"],
    tips: [
      "Llega temprano, antes de las 8:00 a.m., y encontrarás las frutas más frescas.",
      "Al fondo del mercado hay granos andinos a granel, mucho más económicos.",
      "No olvides pedir tu «yapa»: ¡es una linda costumbre cusqueña!",
    ],
  },
  {
    id: "wanchaq",
    corto: "Wanchaq",
    nombre: "Mercado de Wanchaq",
    zona: "Av. Garcilaso, Wanchaq",
    horario: "Todos los días · 6:00 a.m. – 7:00 p.m.",
    mejoresDias: "Martes y viernes",
    temporada: ["Sangrecita", "Verduras del Valle Sagrado", "Choclo", "Habas verdes"],
    tips: [
      "Es el lugar ideal para conseguir sangrecita y menudencias frescas.",
      "Las verduras del Valle Sagrado llegan los martes y viernes.",
      "Compara precios con dos o tres caseras antes de decidir tu compra.",
    ],
  },
  {
    id: "vinocanchon",
    corto: "Vinocanchón",
    nombre: "Mercado Vinocanchón",
    zona: "San Jerónimo",
    horario: "Todos los días · desde muy temprano",
    mejoresDias: "Miércoles y sábado",
    temporada: ["Papa nativa", "Habas", "Tarwi", "Olluco"],
    tips: [
      "Es un mercado mayorista: organízate con tus vecinas, compren juntas y ahorren.",
      "Excelente para papa nativa, habas y tarwi.",
      "Lleva tu propia bolsa de tela y monedas sencillas.",
    ],
  },
  {
    id: "huancaro",
    corto: "Huancaro",
    nombre: "Feria de Huancaro",
    zona: "Huancaro, Santiago",
    horario: "Solo domingos · 5:00 a.m. – 2:00 p.m.",
    mejoresDias: "Domingo antes de las 9:00 a.m.",
    temporada: ["Quesos de las comunidades", "Cuy", "Granos recién cosechados", "Aguaymanto"],
    tips: [
      "Compras directo a los productores de las comunidades, a precios justos.",
      "Encontrarás quesos frescos, cuy y granos recién cosechados.",
      "Llega antes de las 9:00 a.m. para disfrutar de la mayor variedad.",
    ],
  },
];

export const mercados = mercadosBase.map((mercado) => {
  const photo = marketImageById.get(mercado.id);
  return { ...mercado, imagen: photo ? `${photo.url}?sig=${photo.index}` : undefined, imagenFuente: photo?.sourceUrl };
});

// Enlace del grupo compartido para todos los accesos a la comunidad.
export const WHATSAPP_MENSAJE = "Hola Kallpa Nutrición, quiero unirme a la comunidad para recibir tips y recetas";
export const WHATSAPP_GROUP_URL = `https://chat.whatsapp.com/DhEObwHb39MDUrKdrRTpBB?s=sh&p=a&iam=2`;
