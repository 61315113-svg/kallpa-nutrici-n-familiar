import ponche from "@/assets/ponche.jpg";
import solterito from "@/assets/solterito.jpg";
import crema from "@/assets/crema.jpg";
import extracto from "@/assets/extracto.jpg";
import mazamorra from "@/assets/mazamorra.jpg";
import sangrecita from "@/assets/sangrecita.jpg";

export type Categoria = "Desayuno" | "Almuerzo" | "Cena" | "Bebida" | "Postre" | "Dieta Especial";

export interface Receta {
  id: string;
  nombre: string;
  categoria: Categoria;
  costo: number;
  minutos: number;
  dificultad: "Fácil" | "Media";
  imagen: string;
  badges: string[];
  dietas: ("diabeticos" | "vegetariano" | "hierro")[];
  ingredientes: string[];
  pasos: string[];
  tips: string[];
}

export const recetas: Receta[] = [
  {
    id: "ponche-habas",
    nombre: "Ponche de Habas con Avena y Manzana",
    categoria: "Desayuno",
    costo: 2.5,
    minutos: 25,
    dificultad: "Fácil",
    imagen: ponche,
    badges: ["Bajo Costo", "Rico en Fibra"],
    dietas: ["vegetariano"],
    ingredientes: ["1 taza de harina de habas tostadas", "½ taza de avena", "1 manzana picada", "1 rama de canela y 3 clavos", "1 litro de agua", "Chancaca al gusto"],
    pasos: ["Hierve el agua con la canela, el clavo y la manzana por 10 minutos.", "Disuelve la harina de habas y la avena en un poco de agua fría.", "Agrega la mezcla a la olla moviendo sin parar para que no se formen grumos.", "Cocina 10 minutos más, endulza con chancaca y sirve calientito."],
    tips: ["Las habas aportan proteína vegetal: ideales para que los niños rindan en el colegio.", "La avena da energía duradera y ayuda a la digestión.", "Usa poca chancaca: la manzana ya endulza naturalmente."],
  },
  {
    id: "solterito",
    nombre: "Solterito Cusqueño con Tarwi y Queso Fresco",
    categoria: "Almuerzo",
    costo: 6,
    minutos: 15,
    dificultad: "Fácil",
    imagen: solterito,
    badges: ["Alto en Proteína", "En 15 minutos"],
    dietas: ["vegetariano", "diabeticos"],
    ingredientes: ["1 taza de tarwi desamargado", "100 g de queso fresco", "1 taza de choclo desgranado", "1 tomate", "½ cebolla roja", "Habas cocidas", "Limón, aceite y perejil"],
    pasos: ["Pica el tomate, la cebolla y el queso en cubitos.", "Mezcla en un bol el tarwi, el choclo y las habas.", "Agrega el tomate, la cebolla y el queso.", "Aliña con limón, aceite, sal y perejil picado."],
    tips: ["El tarwi tiene más proteína que la carne y es muy económico en el mercado.", "Combinar limón con legumbres ayuda a absorber mejor el hierro.", "Plato fresco y bajo en azúcar: apto para personas con diabetes."],
  },
  {
    id: "crema-zapallo",
    nombre: "Crema de Zapallo Loche y Quinua",
    categoria: "Cena",
    costo: 4,
    minutos: 30,
    dificultad: "Fácil",
    imagen: crema,
    badges: ["Ligera", "Rico en Vitamina A"],
    dietas: ["vegetariano", "diabeticos"],
    ingredientes: ["½ kg de zapallo loche", "½ taza de quinua lavada", "1 cebolla", "2 dientes de ajo", "1 papa amarilla", "Pepitas de zapallo para decorar"],
    pasos: ["Sofríe la cebolla y el ajo con una cucharadita de aceite.", "Agrega el zapallo y la papa en trozos, cubre con agua y cocina 20 minutos.", "Licúa hasta que quede cremoso.", "Cocina la quinua aparte y sírvela encima con las pepitas."],
    tips: ["El zapallo cuida la vista y las defensas gracias a su vitamina A.", "La quinua es proteína completa: perfecta para la cena familiar.", "Una cena ligera ayuda a dormir mejor."],
  },
  {
    id: "extracto-kion",
    nombre: "Extracto Antiinflamatorio de Kion, Piña y Turmeric",
    categoria: "Bebida",
    costo: 3,
    minutos: 10,
    dificultad: "Fácil",
    imagen: extracto,
    badges: ["Defensas", "En 15 minutos"],
    dietas: ["vegetariano"],
    ingredientes: ["2 rodajas de piña", "1 trocito de kion (jengibre)", "½ cucharadita de turmeric (palillo)", "1 naranja", "1 vaso de agua fría"],
    pasos: ["Pela la piña y el kion.", "Exprime la naranja.", "Licúa todo con el agua y el turmeric.", "Sirve al momento, sin colar para no perder la fibra."],
    tips: ["El kion y el turmeric ayudan a bajar la inflamación y cuidan del frío cusqueño.", "Una pizca de pimienta mejora la absorción del turmeric.", "Tómalo recién hecho para aprovechar la vitamina C."],
  },
  {
    id: "mazamorra-kiwicha",
    nombre: "Mazamorra de Kiwicha con Maracuyá",
    categoria: "Postre",
    costo: 3.5,
    minutos: 20,
    dificultad: "Fácil",
    imagen: mazamorra,
    badges: ["Rico en Calcio", "Bajo Costo"],
    dietas: ["vegetariano"],
    ingredientes: ["½ taza de kiwicha", "3 tazas de agua", "1 rama de canela", "2 maracuyás", "Chancaca o miel al gusto"],
    pasos: ["Cocina la kiwicha con el agua y la canela por 15 minutos, moviendo seguido.", "Endulza ligeramente cuando espese.", "Deja entibiar y sirve en pocillos.", "Corona con la pulpa de maracuyá."],
    tips: ["La kiwicha tiene más calcio que la leche: ideal para huesos fuertes.", "El maracuyá aporta vitamina C y un sabor que encanta a los niños.", "Un postre nutritivo que reemplaza las golosinas."],
  },
  {
    id: "saltadito-sangrecita",
    nombre: "Saltadito de Sangrecita con Verduras del Valle",
    categoria: "Dieta Especial",
    costo: 5,
    minutos: 20,
    dificultad: "Media",
    imagen: sangrecita,
    badges: ["Rico en Hierro", "Contra la Anemia"],
    dietas: ["hierro", "diabeticos"],
    ingredientes: ["250 g de sangrecita de pollo cocida", "1 cebolla roja en tiras", "1 tomate en gajos", "1 pimiento", "Vainitas y espinaca del Valle Sagrado", "Ajo, sillao y vinagre"],
    pasos: ["Desmenuza la sangrecita cocida.", "Saltea el ajo y la cebolla a fuego alto.", "Agrega las verduras y la sangrecita, mezcla 3 minutos.", "Añade el tomate, un chorrito de sillao y vinagre. Sirve con arroz o papa."],
    tips: ["La sangrecita es uno de los alimentos más ricos en hierro y de los más baratos del mercado.", "Acompáñala con una fruta cítrica para absorber mejor el hierro.", "Evita el té o café justo después: dificultan la absorción del hierro."],
  },
];

export interface Filtro {
  id: string;
  label: string;
  test: (r: Receta) => boolean;
}

export const filtros: Filtro[] = [
  { id: "todas", label: "Todas", test: () => true },
  { id: "economicas", label: "Económicas (< S/ 10)", test: (r) => r.costo < 10 },
  { id: "rapidas", label: "En 15 minutos", test: (r) => r.minutos <= 15 },
  { id: "desayunos", label: "Desayunos", test: (r) => r.categoria === "Desayuno" },
  { id: "almuerzos", label: "Almuerzos", test: (r) => r.categoria === "Almuerzo" },
  { id: "cenas", label: "Cenas", test: (r) => r.categoria === "Cena" },
  { id: "postres", label: "Postres Nutritivos", test: (r) => r.categoria === "Postre" },
  { id: "jugos", label: "Jugos y Extractos", test: (r) => r.categoria === "Bebida" },
  { id: "diabeticos", label: "Diabéticos", test: (r) => r.dietas.includes("diabeticos") },
  { id: "vegetarianos", label: "Vegetarianos", test: (r) => r.dietas.includes("vegetariano") },
  { id: "hierro", label: "Alto en Hierro", test: (r) => r.dietas.includes("hierro") },
];

export const mercados = [
  {
    nombre: "Mercado de San Pedro",
    zona: "Centro Histórico, a 5 cuadras de la Plaza de Armas",
    dias: "Todos los días · 6:00 a.m. – 6:00 p.m.",
    tips: [
      "Llega temprano, antes de las 8:00 a.m., y encontrarás las frutas más frescas.",
      "Al fondo del mercado hay granos andinos a granel, mucho más económicos.",
      "No olvides pedir tu «yapa»: ¡es una linda costumbre cusqueña!",
    ],
  },
  {
    nombre: "Mercado de Wanchaq",
    zona: "Av. Garcilaso, Wanchaq",
    dias: "Todos los días · 6:00 a.m. – 7:00 p.m.",
    tips: [
      "Es el lugar ideal para conseguir sangrecita y menudencias frescas.",
      "Las verduras del Valle Sagrado llegan los martes y viernes.",
      "Compara precios con dos o tres caseras antes de decidir tu compra.",
    ],
  },
  {
    nombre: "Mercado Vinocanchón",
    zona: "San Jerónimo",
    dias: "Mejores días: miércoles y sábado",
    tips: [
      "Es un mercado mayorista: organízate con tus vecinas, compren juntas y ahorren.",
      "Excelente para papa nativa, habas y tarwi.",
      "Lleva tu propia bolsa de tela y monedas sencillas.",
    ],
  },
  {
    nombre: "Feria de Huancaro",
    zona: "Huancaro, Santiago",
    dias: "Solo domingos · 5:00 a.m. – 2:00 p.m.",
    tips: [
      "Compras directo a los productores de las comunidades, a precios justos.",
      "Encontrarás quesos frescos, cuy y granos recién cosechados.",
      "Llega antes de las 9:00 a.m. para disfrutar de la mayor variedad.",
    ],
  },
];

// Placeholder: reemplazar por el enlace final del grupo (https://chat.whatsapp.com/...)
export const WHATSAPP_MENSAJE = "Hola Kallpa Nutrición, quiero unirme a la comunidad para recibir tips y recetas";
export const WHATSAPP_GROUP_URL = `https://wa.me/51999999999?text=${encodeURIComponent(WHATSAPP_MENSAJE)}`;
