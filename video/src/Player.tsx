import { useEffect, useRef, useState } from "react";
import { Film } from "./Film";
import { SZENEN, ZEITLEISTE } from "./daten";

/**
 * Vorschau im Browser: abspielen mit Ton, springen, Bild für Bild weiter. Nur zum Ansehen beim Bauen;
 * das fertige Video entsteht über scripts/render.mjs, nicht über diese Wiedergabe.
 *
 * Tasten: Leertaste = abspielen/anhalten, Pfeil links/rechts = ein Bild zurück/vor.
 */
export function Player({ bild, setBild }: { bild: number; setBild: (n: number) => void }) {
  const [laeuft, setLaeuft] = useState(false);
  const [massstab, setMassstab] = useState(0.5);
  const bildRef = useRef(bild);
  bildRef.current = bild;
  const puffer = useRef(new Map<string, AudioBuffer>());
  const { fps, totalFrames, ton } = ZEITLEISTE;

  useEffect(() => {
    const passe = () => setMassstab(Math.min(window.innerWidth / 1920, (window.innerHeight - 96) / 1080));
    passe();
    window.addEventListener("resize", passe);
    return () => window.removeEventListener("resize", passe);
  }, []);

  useEffect(() => {
    const taste = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setLaeuft((l) => !l);
      } else if (e.code === "ArrowRight") {
        setBild(Math.min(totalFrames - 1, bildRef.current + 1));
      } else if (e.code === "ArrowLeft") {
        setBild(Math.max(0, bildRef.current - 1));
      }
    };
    window.addEventListener("keydown", taste);
    return () => window.removeEventListener("keydown", taste);
  }, [setBild, totalFrames]);

  useEffect(() => {
    if (!laeuft) return;
    const ctx = new AudioContext();
    const abSek = bildRef.current / fps;
    const start = performance.now() - abSek * 1000;
    let raf = 0;
    let beendet = false;

    // Jede Aufnahme an ihre Stelle legen. Im Entwicklungsserver liegen die Tondateien unter /audio/….
    (async () => {
      for (const t of ton) {
        const beginn = t.startSample / 48000;
        if (beginn + t.sekunden < abSek) continue;
        let daten = puffer.current.get(t.datei);
        if (!daten) {
          const antwort = await fetch(`/${t.datei}`);
          if (!antwort.ok) continue;
          daten = await ctx.decodeAudioData(await antwort.arrayBuffer());
          puffer.current.set(t.datei, daten);
        }
        if (beendet) return;
        const jetzt = (performance.now() - start) / 1000;
        const quelle = ctx.createBufferSource();
        quelle.buffer = daten;
        quelle.connect(ctx.destination);
        if (beginn >= jetzt) quelle.start(ctx.currentTime + (beginn - jetzt));
        else if (jetzt - beginn < t.sekunden) quelle.start(ctx.currentTime, jetzt - beginn);
      }
    })();

    const schritt = () => {
      const n = Math.floor(((performance.now() - start) / 1000) * fps);
      if (n >= totalFrames) {
        setLaeuft(false);
        return;
      }
      setBild(n);
      raf = requestAnimationFrame(schritt);
    };
    raf = requestAnimationFrame(schritt);
    return () => {
      beendet = true;
      cancelAnimationFrame(raf);
      void ctx.close();
    };
  }, [laeuft, fps, totalFrames, ton, setBild]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#dfe6f3" }}>
      <div style={{ width: 1920 * massstab, height: 1080 * massstab, margin: "0 auto", overflow: "hidden" }}>
        <div style={{ transform: `scale(${massstab})`, transformOrigin: "0 0" }}>
          <Film bild={bild} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 20px", fontSize: 14 }}>
        <button type="button" onClick={() => setLaeuft((l) => !l)} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #3a4662", background: "#17223b", color: "#fff", cursor: "pointer" }}>
          {laeuft ? "Anhalten" : "Abspielen"}
        </button>
        <input type="range" min={0} max={totalFrames - 1} value={bild} onChange={(e) => setBild(Number(e.target.value))} style={{ flex: 1 }} aria-label="Position im Video" />
        <span style={{ fontVariantNumeric: "tabular-nums", minWidth: 150 }}>
          {(bild / fps).toFixed(1)} s von {(totalFrames / fps).toFixed(1)} s
        </span>
        {SZENEN.map((s) => (
          <button key={s.id} type="button" onClick={() => setBild(s.start)} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #3a4662", background: "transparent", color: "#dfe6f3", cursor: "pointer" }}>
            {s.id}
          </button>
        ))}
      </div>
    </div>
  );
}
