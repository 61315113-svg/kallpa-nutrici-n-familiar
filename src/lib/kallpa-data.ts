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

export type Categoria = "Desayuno" | "Almuerzo" | "Cena" | "Bebida" | "Postre" | "Dieta Especial";
type Dieta = "diabeticos" | "vegetariano" | "hierro" | "sin-gluten" | "proteina";

export interface Receta {
  id: string;
  nombre: string;
  categoria: Categoria;
  minutos: number;
  dificultad: "Fácil" | "Media";
  imagen: string;
  badges: string[];
  dietas: Dieta[];
  ingredientes: string[];
  pasos: string[];
  tips: string[];
}

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
  dificultad: "Fácil" | "Media" = "Fácil",
): Receta {
  return { id: slug(nombre), nombre, categoria, minutos, dificultad, imagen, badges: ["Económico y Accesible", ...badges], dietas, ingredientes, pasos, tips };
}

export const recetas: Receta[] = [
  // Desayunos
  r("Desayuno", "Ponche de habas con avena", 25, ponche, ["Rico en Fibra"], ["vegetariano"],
    ["1 taza de harina de habas tostadas", "½ taza de avena", "1 manzana picada", "1 rama de canela y 3 clavos", "1 litro de agua"],
    ["Hierve el agua con la canela, el clavo y la manzana por 10 minutos.", "Disuelve la harina de habas y la avena en un poco de agua fría y agrégala moviendo sin parar.", "Cocina 10 minutos más y sirve calientito."],
    ["Las habas aportan proteína vegetal: ideales para que los niños rindan en el colegio.", "Endulza poco: la manzana ya aporta dulzor natural."]),
  r("Desayuno", "Quinua con manzana y canela", 20, quinua, ["Proteína Completa"], ["vegetariano", "sin-gluten"],
    ["½ taza de quinua lavada", "2 tazas de agua", "1 manzana en cubitos", "1 rama de canela", "1 taza de leche"],
    ["Cocina la quinua con el agua y la canela por 15 minutos.", "Agrega la leche y la manzana, cocina 5 minutos más.", "Sirve tibio con una pizca de canela molida."],
    ["La quinua tiene todos los aminoácidos esenciales.", "Lávala bien para quitarle la saponina y el sabor amargo."]),
  r("Desayuno", "Tamalitos de maíz con queso", 45, solterito, ["Energía Andina"], ["vegetariano", "sin-gluten"],
    ["2 tazas de choclo molido", "100 g de queso fresco", "1 huevo", "1 cucharada de manteca", "Pancas de choclo", "Sal y anís"],
    ["Mezcla el choclo molido con el huevo, la manteca, sal y anís.", "Coloca una porción en cada panca con un trozo de queso y envuelve.", "Cocina al vapor por 35 minutos."],
    ["El choclo cusqueño da energía para empezar el día.", "Prepara varios y guárdalos: duran hasta 3 días en refrigeración."], "Media"),
  r("Desayuno", "Avena con maca y plátano", 10, ponche, ["Energía", "Rápida"], ["vegetariano"],
    ["½ taza de avena", "1 cucharada de maca", "1 plátano", "1 taza de leche o agua"],
    ["Cocina la avena con la leche por 5 minutos.", "Agrega la maca y mezcla bien.", "Sirve con el plátano en rodajas."],
    ["La maca ayuda a tener energía y buen ánimo.", "El plátano aporta potasio para los músculos."]),
  r("Desayuno", "Pan con sangrecita y criollita", 15, sangrecita, ["Rico en Hierro"], ["hierro"],
    ["4 panes de tu panadería", "200 g de sangrecita cocida", "1 cebolla roja", "1 limón", "Perejil, ajo y sal"],
    ["Saltea la sangrecita con ajo y sal por 5 minutos.", "Prepara la criollita: cebolla en pluma, limón, perejil y sal.", "Rellena el pan con sangrecita y criollita."],
    ["La sangrecita es el aliado más barato contra la anemia.", "El limón de la criollita ayuda a absorber mejor el hierro."]),

  // Almuerzos
  r("Almuerzo", "Solterito cusqueño con tarwi", 15, solterito, ["Alto en Proteína", "Rápida"], ["vegetariano", "diabeticos"],
    ["1 taza de tarwi desamargado", "100 g de queso fresco", "1 taza de choclo desgranado", "1 tomate", "½ cebolla roja", "Limón y perejil"],
    ["Pica el tomate, la cebolla y el queso en cubitos.", "Mezcla con el tarwi y el choclo.", "Aliña con limón, aceite, sal y perejil."],
    ["El tarwi tiene más proteína que la carne y es muy económico.", "Plato fresco y bajo en azúcar: apto para personas con diabetes."]),
  r("Almuerzo", "Saltadito de sangrecita", 20, sangrecita, ["Rico en Hierro"], ["hierro"],
    ["250 g de sangrecita cocida", "1 cebolla roja", "1 tomate", "1 pimiento", "Vainitas", "Ajo y sillao"],
    ["Desmenuza la sangrecita.", "Saltea ajo y cebolla a fuego alto, agrega las verduras y la sangrecita.", "Añade el tomate y un chorrito de sillao. Sirve con arroz o papa."],
    ["Acompaña con una fruta cítrica para aprovechar el hierro.", "Evita el té o café justo después de comer."], "Media"),
  r("Almuerzo", "Crema de zapallo loche con quinua", 30, crema, ["Rico en Vitamina A"], ["vegetariano", "diabeticos", "sin-gluten"],
    ["½ kg de zapallo loche", "½ taza de quinua", "1 cebolla", "1 papa amarilla", "2 dientes de ajo"],
    ["Sofríe la cebolla y el ajo.", "Agrega zapallo y papa, cubre con agua y cocina 20 minutos.", "Licúa y sirve con la quinua cocida encima."],
    ["El zapallo cuida la vista y las defensas.", "La quinua convierte la crema en un plato completo."]),
  r("Almuerzo", "Guiso de olluco con carne", 40, guiso, ["Casero"], [],
    ["½ kg de olluco en tiras", "250 g de carne de res en cubos", "2 papas", "1 cebolla", "Ajo, ají panca y perejil"],
    ["Dora la carne y retírala.", "Haz un aderezo con cebolla, ajo y ají panca; regresa la carne con un poco de agua.", "Agrega olluco y papa, cocina 20 minutos y termina con perejil."],
    ["El olluco es fuente de vitamina C y muy fácil de digerir.", "No lo laves después de picarlo para que no suelte baba."], "Media"),
  r("Almuerzo", "Pepián de choclo con pollo", 40, crema, ["Tradicional"], ["sin-gluten"],
    ["3 choclos rallados", "4 piezas de pollo", "1 cebolla", "Ají amarillo", "Ajo y culantro"],
    ["Dora el pollo y prepara el aderezo con cebolla, ajo y ají.", "Agrega el choclo rallado con agua y mueve sin parar.", "Cocina el pollo en el pepián 25 minutos y termina con culantro."],
    ["El choclo aporta fibra y energía.", "Retira la piel del pollo para un plato más ligero."], "Media"),

  // Cenas ligeras
  r("Cena", "Sopa de morón con verduras", 35, sopa, ["Ligera"], ["vegetariano"],
    ["½ taza de morón (trigo partido)", "1 zanahoria", "2 papas", "1 rama de apio", "Hierbabuena"],
    ["Hierve 1,5 litros de agua con las verduras picadas.", "Agrega el morón lavado y cocina 25 minutos.", "Sirve con hierbabuena picada."],
    ["Una sopa caliente y ligera ayuda a dormir mejor.", "El morón aporta fibra que cuida la digestión."]),
  r("Cena", "Ensalada tibia de habas y queso", 15, solterito, ["Rápida"], ["vegetariano", "diabeticos", "sin-gluten"],
    ["2 tazas de habas verdes", "100 g de queso fresco", "1 tomate", "Cebolla china", "Limón y aceite"],
    ["Sancocha las habas 10 minutos y pélalas.", "Mezcla tibias con el queso, tomate y cebolla china.", "Aliña con limón, aceite y sal."],
    ["Las habas verdes tienen proteína y hierro vegetal.", "Ideal para una cena rápida y saciadora."]),
  r("Cena", "Crema de cañihua y verduras", 30, crema, ["Rico en Hierro"], ["vegetariano", "hierro", "sin-gluten"],
    ["4 cucharadas de cañihua", "1 zanahoria", "1 zapallito", "1 papa", "1 cebolla"],
    ["Cocina las verduras en agua por 15 minutos.", "Licúa y regresa a la olla.", "Agrega la cañihua disuelta en agua fría y cocina 10 minutos."],
    ["La cañihua es uno de los granos andinos con más hierro.", "No necesita lavarse: no tiene saponina."]),
  r("Cena", "Tortilla de verduras del valle", 15, sangrecita, ["Rápida"], ["vegetariano", "diabeticos", "sin-gluten"],
    ["3 huevos", "1 taza de espinaca", "½ zanahoria rallada", "Cebolla china"],
    ["Bate los huevos con sal.", "Agrega las verduras picadas.", "Cocina en sartén con poco aceite, 4 minutos por lado."],
    ["El huevo es proteína de calidad y al alcance de todos.", "Usa las verduras que te sobren del día."]),
  r("Cena", "Consomé de pollo con verduras locales", 40, sopa, ["Reconfortante"], ["sin-gluten"],
    ["2 piezas de pollo", "1 zanahoria", "1 nabo", "1 rama de apio", "Kion y cebolla china"],
    ["Hierve el pollo con kion y cebolla 25 minutos.", "Agrega las verduras en trozos y cocina 15 minutos más.", "Sirve bien caliente con cebolla china picada."],
    ["Perfecto para las noches frías de Cusco.", "El kion ayuda a la digestión y a las defensas."]),

  // Bebidas
  r("Bebida", "Extracto antiinflamatorio (kion, piña y cúrcuma)", 10, extracto, ["Defensas", "Rápida"], ["vegetariano", "sin-gluten"],
    ["2 rodajas de piña", "1 trocito de kion", "½ cucharadita de cúrcuma (palillo)", "1 naranja"],
    ["Pela la piña y el kion; exprime la naranja.", "Licúa todo con un vaso de agua fría.", "Sirve al momento, sin colar."],
    ["Una pizca de pimienta mejora la absorción de la cúrcuma.", "Tómalo recién hecho para aprovechar la vitamina C."]),
  r("Bebida", "Emoliente tradicional reforzado", 25, chicha, ["Tradicional"], ["vegetariano", "sin-gluten"],
    ["2 cucharadas de cebada tostada", "1 cucharada de linaza", "Cola de caballo", "Alfalfa", "1 limón"],
    ["Hierve la cebada en 1,5 litros de agua por 15 minutos.", "Agrega linaza y hierbas, cocina 10 minutos.", "Cuela y sirve con limón."],
    ["La linaza cuida la digestión y el estómago.", "Endulza muy poco o nada."]),
  r("Bebida", "Chicha morada natural sin azúcar", 40, chicha, ["Antioxidante"], ["vegetariano", "diabeticos", "sin-gluten"],
    ["2 mazorcas de maíz morado", "Cáscara de 1 piña", "1 manzana", "Canela y clavo", "2 limones"],
    ["Hierve el maíz con la cáscara de piña, manzana y especias por 35 minutos.", "Deja enfriar y cuela.", "Agrega limón al servir."],
    ["El maíz morado ayuda a cuidar la presión y el corazón.", "Sin azúcar es apta para personas con diabetes."]),
  r("Bebida", "Jugo de papaya con linaza", 10, extracto, ["Digestivo", "Rápida"], ["vegetariano", "sin-gluten"],
    ["2 tazas de papaya", "1 cucharada de linaza molida", "1 vaso de agua"],
    ["Pica la papaya.", "Licúa con agua y linaza.", "Sirve al instante."],
    ["La papaya ayuda a la digestión.", "Muele la linaza para que el cuerpo la aproveche mejor."]),
  r("Bebida", "Extracto verde de espinaca y manzana", 10, extracto, ["Rico en Hierro", "Rápida"], ["vegetariano", "hierro", "sin-gluten"],
    ["1 taza de espinaca", "1 manzana verde", "½ pepino", "1 limón"],
    ["Lava bien las hojas.", "Licúa con un vaso de agua y el jugo de limón.", "Sirve sin colar."],
    ["El limón ayuda a absorber el hierro de la espinaca.", "Ideal a media mañana."]),

  // Postres
  r("Postre", "Mazamorra de kiwicha con maracuyá", 20, mazamorra, ["Rico en Calcio"], ["vegetariano", "sin-gluten"],
    ["½ taza de kiwicha", "3 tazas de agua", "1 rama de canela", "2 maracuyás"],
    ["Cocina la kiwicha con agua y canela por 15 minutos.", "Deja entibiar y sirve en pocillos.", "Corona con pulpa de maracuyá."],
    ["La kiwicha tiene más calcio que la leche.", "Un postre nutritivo que reemplaza las golosinas."]),
  r("Postre", "Compota de aguaymanto y manzana", 20, mazamorra, ["Vitamina C"], ["vegetariano", "sin-gluten"],
    ["1 taza de aguaymanto", "2 manzanas", "1 rama de canela", "½ taza de agua"],
    ["Pica las manzanas.", "Cocina con aguaymanto, canela y agua por 15 minutos.", "Sirve tibia o fría."],
    ["El aguaymanto es rico en vitamina C y antioxidantes.", "Excelente para la lonchera de los niños."]),
  r("Postre", "Mazamorra morada con frutas de estación", 40, chicha, ["Tradicional"], ["vegetariano", "sin-gluten"],
    ["Chicha morada sin azúcar (1 litro)", "3 cucharadas de chuño o maicena", "1 manzana", "Piña y guindones", "Canela"],
    ["Calienta la chicha morada con las frutas picadas.", "Agrega el chuño disuelto en agua fría moviendo sin parar.", "Cocina 5 minutos y sirve con canela."],
    ["Aprovecha las frutas de temporada: son más baratas.", "Usa poco azúcar: la fruta ya endulza."], "Media"),
  r("Postre", "Budín de quinua y pasas", 50, quinua, ["Proteína Completa"], ["vegetariano", "sin-gluten"],
    ["1 taza de quinua cocida", "2 huevos", "1 taza de leche", "3 cucharadas de pasas", "Canela y vainilla"],
    ["Mezcla todos los ingredientes.", "Vierte en un molde engrasado.", "Hornea a 180 °C por 40 minutos."],
    ["Aprovecha la quinua que sobró del almuerzo.", "Las pasas dan dulzor y hierro."], "Media"),
  r("Postre", "Mousse de palta con cacao puro", 10, mazamorra, ["Grasas Buenas", "Rápida"], ["vegetariano", "diabeticos", "sin-gluten"],
    ["1 palta madura", "2 cucharadas de cacao puro", "1 plátano", "Unas gotas de vainilla"],
    ["Licúa todos los ingredientes hasta obtener una crema.", "Sirve en vasitos.", "Refrigera 10 minutos antes de comer."],
    ["La palta aporta grasas buenas para el corazón.", "El cacao peruano es rico en antioxidantes."]),

  // Dietas especiales
  r("Dieta Especial", "Capchi de setas", 25, guiso, ["Vegano"], ["vegetariano", "sin-gluten"],
    ["300 g de setas u hongos", "4 papas", "1 cebolla", "Ají amarillo", "Huacatay"],
    ["Sancocha las papas.", "Saltea la cebolla y el ají, agrega las setas.", "Mezcla con las papas y termina con huacatay picado."],
    ["Las setas aportan proteína y vitamina B.", "Plato 100% vegetal y muy cusqueño."]),
  r("Dieta Especial", "Ensalada de tarwi y verduras", 15, solterito, ["Apto Diabetes", "Rápida"], ["diabeticos", "vegetariano", "proteina"],
    ["1 taza de tarwi", "1 pepino", "1 tomate", "Lechuga", "Limón y aceite de oliva"],
    ["Pica las verduras.", "Mezcla con el tarwi.", "Aliña con limón, aceite y sal."],
    ["El tarwi ayuda a controlar el azúcar en sangre.", "Rica en fibra: da saciedad por más tiempo."]),
  r("Dieta Especial", "Guiso de sangrecita", 25, sangrecita, ["Alto en Hierro"], ["hierro"],
    ["250 g de sangrecita", "1 cebolla", "Ají panca", "Ajo", "Papa sancochada"],
    ["Haz un aderezo con cebolla, ajo y ají panca.", "Agrega la sangrecita desmenuzada y un poco de agua.", "Cocina 10 minutos y sirve con papa."],
    ["Ideal para niños y gestantes con anemia.", "Sirve con un jugo de naranja."]),
  r("Dieta Especial", "Sopa de quinua sin gluten", 35, sopa, ["Sin Gluten"], ["sin-gluten", "vegetariano"],
    ["½ taza de quinua", "2 papas", "1 zanahoria", "Habas verdes", "Hierbabuena"],
    ["Hierve las verduras en 1,5 litros de agua.", "Agrega la quinua lavada y cocina 20 minutos.", "Termina con hierbabuena."],
    ["La quinua es naturalmente libre de gluten.", "Un plato completo para toda la familia."]),
  r("Dieta Especial", "Porridge de cañihua", 15, quinua, ["Alto en Proteína"], ["proteina", "hierro", "sin-gluten", "vegetariano"],
    ["4 cucharadas de cañihua", "1 taza de leche", "1 plátano", "Canela"],
    ["Calienta la leche con canela.", "Agrega la cañihua y cocina 8 minutos moviendo.", "Sirve con plátano en rodajas."],
    ["La cañihua tiene más proteína que la mayoría de cereales.", "Perfecto antes de entrenar o ir a trabajar."]),
];

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

export const filtros = [...filtrosRapidos, ...filtrosCategoria];

export function filtrarRecetas(lista: Receta[], filtroId: string, busqueda: string) {
  const f = filtros.find((x) => x.id === filtroId) ?? filtros[0];
  const q = busqueda.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return lista.filter((r) => (!f || f.test(r)) && (!q || norm(r.nombre).includes(q) || norm(r.ingredientes.join(" ")).includes(q)));
}

export const mercados = [
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

// Placeholder: reemplazar por el enlace final del grupo (https://chat.whatsapp.com/...)
export const WHATSAPP_MENSAJE = "Hola Kallpa Nutrición, quiero unirme a la comunidad para recibir tips y recetas";
export const WHATSAPP_GROUP_URL = `https://chat.whatsapp.com/DhEObwHb39MDUrKdrRTpBB?s=sh&p=a&iam=2`;
