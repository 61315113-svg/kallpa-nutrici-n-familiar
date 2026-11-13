import { describe, expect, it } from "vitest";
import { recetas, mercados, filtrarRecetas } from "@/lib/kallpa-data";
import { kallpaImages, recipeImageById, marketImageById } from "@/lib/kallpa-images";

describe("Kallpa recipe rules", () => {
  it("tiene las 26 recetas, 4 mercados y fotos únicas por tarjeta", () => {
    expect(recetas).toHaveLength(26);
    expect(mercados).toHaveLength(4);
    expect(kallpaImages).toHaveLength(35);
    expect(new Set(kallpaImages.map((p) => p.photoId)).size).toBe(35);
    expect(new Set(recetas.map((r) => r.id)).size).toBe(26);
    expect(recetas.every((r) => Boolean(r.imagen))).toBe(true);
    expect(kallpaImages.every((p) => new URL(p.sourceUrl).searchParams.get("sig") === String(p.index))).toBe(true);
  });
  it("distribuye las recetas en las 5 categorías pedidas", () => {
    const count = (c: string) => recetas.filter((r) => r.categoria === c).length;
    expect([count("Desayuno"), count("Almuerzo"), count("Cena"), count("Bebida"), count("Postre")]).toEqual([5, 6, 5, 6, 4]);
  });
  it("cada receta con foto del catálogo conserva su propia foto aunque se reordenen", () => {
    for (const receta of [...recetas].reverse()) {
      const image = recipeImageById.get(receta.id);
      if (image && !receta.imagen.includes("gstatic.com")) expect(image.sourceUrl).toBe(receta.imagenFuente);
    }
  });
  it("records San Pedro provenance without claiming other markets are verified", () => {
    expect(marketImageById.get("san-pedro")?.photoId).toBe("1465512861810-7dd31b34ed98");
    expect(marketImageById.get("san-pedro")?.verification).toBe("location-verified");
    for (const id of ["wanchaq", "vinocanchon", "huancaro"]) {
      expect(marketImageById.get(id)?.verification).toBe("illustrative");
    }
  });
  it("finds ingredient names immediately including tarwi, sangrecita and quinua", () => {
    for (const ingredient of ["tarwi", "sangrecita", "quinua"]) {
      const found = filtrarRecetas(recetas, "todas", ingredient);
      expect(found.length).toBeGreaterThan(0);
      expect(found.every((r) => `${r.nombre} ${r.ingredientes.join(" ")}`.toLowerCase().includes(ingredient))).toBe(true);
    }
  });
  it("matches cañihua without accents", () => {
    expect(filtrarRecetas(recetas, "todas", "canihua").map((r) => r.id)).toEqual(filtrarRecetas(recetas, "todas", "cañihua").map((r) => r.id));
    expect(filtrarRecetas(recetas, "todas", "canihua")).toHaveLength(1);
  });
  it("only accepts YouTube embed URLs for recipe videos", () => {
    for (const receta of recetas) {
      if (receta.videoUrl) {
        expect(receta.videoUrl).toMatch(/^https:\/\/www\.youtube\.com\/embed\/[\w-]+/);
      }
    }
  });
  it("limits quick recipes to strictly less than 20 minutes", () => {
    const found = filtrarRecetas(recetas, "rapidas", "");
    expect(found.length).toBeGreaterThan(0);
    expect(found.every((r) => r.minutos < 20)).toBe(true);
    expect(found.some((r) => r.minutos === 20)).toBe(false);
  });
});
import { gruposDe, filtrarRecetas as fr, recetas as rs } from "@/lib/kallpa-data";
describe("grupos y pasos", () => {
  it("cada receta beneficia al menos a un grupo", () => { for (const r of rs) expect(gruposDe(r).length).toBeGreaterThan(0); });
  it("recetas altas en hierro sirven a madres gestantes", () => { expect(gruposDe({ categoria: "Almuerzo", dietas: ["hierro"] })).toContain("gestantes"); });
  it("filtro de gestantes solo muestra recetas para gestantes", () => { const l = fr(rs, "gestantes", ""); expect(l.length).toBeGreaterThan(0); for (const r of l) expect(gruposDe(r)).toContain("gestantes"); });
  it("máximo 5 pasos por receta", () => { for (const r of rs) expect(r.pasos.length).toBeLessThanOrEqual(5); });
});
