import { describe, expect, it } from "vitest";
import { recetas, mercados, filtrarRecetas } from "@/lib/kallpa-data";
import { kallpaImages, recipeImageById, marketImageById } from "@/lib/kallpa-images";

describe("Kallpa recipe rules", () => {
  it("assigns genuinely distinct photos to all 30 recipes, four markets and cover", () => {
    expect(recetas).toHaveLength(30);
    expect(mercados).toHaveLength(4);
    expect(kallpaImages).toHaveLength(35);
    expect(new Set(kallpaImages.map((p) => p.photoId)).size).toBe(35);
    expect(new Set(recetas.map((r) => r.imagen)).size).toBe(30);
    expect(recetas.every((r) => r.imagenFuente?.startsWith("https://images.unsplash.com/photo-"))).toBe(true);
    expect(kallpaImages.every((p) => new URL(p.sourceUrl).searchParams.get("sig") === String(p.index))).toBe(true);
  });
  it("uses 34 distinct source URLs across recipes and markets, without query-string duplicates", () => {
    const photos = [...recetas, ...mercados];
    expect(new Set(photos.map((photo) => photo.imagenFuente?.split("?")[0])).size).toBe(34);
    expect(new Set(photos.map((photo) => photo.imagen)).size).toBe(34);
  });
  it("keeps every dish assigned to its own photo even when recipes are reordered", () => {
    const reversed = [...recetas].reverse();
    for (const receta of reversed) {
      const image = recipeImageById.get(receta.id);
      expect(image?.sourceUrl).toBe(receta.imagenFuente);
    }
    expect(recipeImageById.size).toBe(30);
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
    expect(filtrarRecetas(recetas, "todas", "canihua")).toHaveLength(2);
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
