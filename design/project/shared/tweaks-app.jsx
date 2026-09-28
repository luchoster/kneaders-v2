/* global React, framerMotion */
/* ============================================================
   KNEADERS — TWEAKS APPLICATION
   Reads tweak state and applies to <html> data-* attrs.
   Loads Google Fonts on type pairing change.
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "bakery-red",
  "type": "grotesk-serif",
  "density": "editorial",
  "heroVariant": "photo",
  "showGrid": false
}/*EDITMODE-END*/;

function HearthlineTweaks({ onHeroVariant }) {
  const { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle } = window.TweaksPanel || {};
  if (!TweaksPanel) return null;

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme/accent/type/density to <html>
  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme   = tweaks.theme;
    root.dataset.accent  = tweaks.accent;
    root.dataset.type    = tweaks.type;
    root.dataset.density = tweaks.density;
    root.dataset.grid    = tweaks.showGrid ? "true" : "false";
  }, [tweaks.theme, tweaks.accent, tweaks.type, tweaks.density, tweaks.showGrid]);

  // Apply hero variant via callback
  React.useEffect(() => { onHeroVariant?.(tweaks.heroVariant); }, [tweaks.heroVariant]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Theme">
        <TweakRadio
          value={tweaks.theme} onChange={(v) => setTweak("theme", v)}
          options={[
            { value: "light", label: "Light" },
            { value: "moody", label: "Moody" },
            { value: "dark",  label: "Dark"  },
          ]}
        />
      </TweakSection>

      <TweakSection title="Seasonal accent">
        <TweakRadio
          value={tweaks.accent} onChange={(v) => setTweak("accent", v)}
          options={[
            { value: "bakery-red", label: "Brick Red" },
            { value: "sage",       label: "Sage" },
            { value: "butter",     label: "Harvest Gold" },
            { value: "rose",       label: "Lake Blue" },
            { value: "persimmon",  label: "Rust" },
          ]}
        />
      </TweakSection>

      <TweakSection title="Typography">
        <TweakRadio
          value={tweaks.type} onChange={(v) => setTweak("type", v)}
          options={[
            { value: "grotesk-serif", label: "Archer + Barlow" },
            { value: "serif-display", label: "Arvo + Archer" },
            { value: "condensed",     label: "Condensed + Barlow" },
          ]}
        />
      </TweakSection>

      <TweakSection title="Density">
        <TweakRadio
          value={tweaks.density} onChange={(v) => setTweak("density", v)}
          options={[
            { value: "compact",   label: "Compact" },
            { value: "editorial", label: "Editorial" },
            { value: "loose",     label: "Loose" },
          ]}
        />
      </TweakSection>

      {onHeroVariant && (
        <TweakSection title="Hero variant">
          <TweakRadio
            value={tweaks.heroVariant} onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "photo", label: "Full-bleed" },
              { value: "split", label: "Split" },
              { value: "type",  label: "Type-only" },
            ]}
          />
        </TweakSection>
      )}

      <TweakSection title="Editor">
        <TweakToggle label="Show grid + CMS labels" value={tweaks.showGrid} onChange={(v) => setTweak("showGrid", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

window.HL_HearthlineTweaks = HearthlineTweaks;
