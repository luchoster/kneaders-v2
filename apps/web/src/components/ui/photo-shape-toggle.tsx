"use client";

import { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup, type Key } from "react-aria-components";

type Shape = "square" | "circle";
const STORAGE_KEY = "k-photo-shape";

/** Sets `data-photo-shape` before first paint so a saved choice doesn't flash. Inlined in <head>. */
export const photoShapeScript = `try{var s=localStorage.getItem("${STORAGE_KEY}");if(s==="circle")document.documentElement.dataset.photoShape=s}catch(e){}`;

/**
 * Review-only control: flips every photo between squares and circles so the
 * client can compare. Remove it (and the <head> script) once a shape is chosen.
 */
export function PhotoShapeToggle() {
  const [shape, setShape] = useState<Shape>("square");

  useEffect(() => {
    if (document.documentElement.dataset.photoShape === "circle") setShape("circle");
  }, []);

  const choose = (keys: Set<Key>) => {
    const next = ([...keys][0] as Shape | undefined) ?? "square";
    setShape(next);
    if (next === "circle") document.documentElement.dataset.photoShape = "circle";
    else delete document.documentElement.dataset.photoShape;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
  };

  return (
    <div data-tone="ink" className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-k-cream/30 bg-k-black py-1.5 pr-1.5 pl-4 text-k-cream">
      <span id="photo-shape-label" className="font-condensed text-[11px] uppercase tracking-[0.14em]">
        Photos
      </span>
      <ToggleButtonGroup
        aria-labelledby="photo-shape-label"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[shape]}
        onSelectionChange={choose}
        className="flex gap-1"
      >
        {(["square", "circle"] as const).map((s) => (
          <ToggleButton
            key={s}
            id={s}
            className="cursor-pointer rounded-full px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.04em] text-k-cream data-[selected]:bg-k-cream data-[selected]:text-k-black"
          >
            {s === "square" ? "Square" : "Circle"}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
