// Brücke zwischen dem Render-Skript (außerhalb von React) und dem Zustand der Seite:
// main.tsx ruft `setze` auf, App.tsx hängt hier seinen Zustand ein.
let melde: () => void = () => {};

export const bruecke = {
  setze: (_n: number) => {},
  /**
   * Erfüllt sich, sobald App seinen Zustand eingehängt hat. `ready` in main.tsx wartet darauf:
   * Wären Schriften und Bilder schneller geladen, als React einhängt, liefe das erste setFrame ins Leere.
   */
  eingehaengt: new Promise<void>((fertig) => {
    melde = fertig;
  }),
  melde: () => melde(),
};
