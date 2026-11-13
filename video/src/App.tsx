import { useLayoutEffect, useState } from "react";
import { Film } from "./Film";
import { Player } from "./Player";
import { RENDER } from "./daten";
import { bruecke } from "./lib/bruecke";

/** Beim Rendern nur die Bühne in Originalgröße, sonst die Vorschau mit Wiedergabe und Ton. */
export function App() {
  const [bild, setBild] = useState(() => Number(new URLSearchParams(window.location.search).get("bild") ?? 0));
  useLayoutEffect(() => {
    bruecke.setze = setBild;
    bruecke.melde();
  }, []);
  return RENDER ? <Film bild={bild} /> : <Player bild={bild} setBild={setBild} />;
}
