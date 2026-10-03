import type { DsBlock } from "@/data/datenschutz-app";

/** Gemeinsamer Renderer für die Datenschutz-Blöcke (/datenschutz, auch die App-Sektion). */
export const renderDsBlock = (b: DsBlock, i: number) => {
  switch (b.type) {
    case "h3":
      return <h3 key={i} className="text-lg font-medium text-foreground mb-2 mt-4">{b.text}</h3>;
    case "note":
      return <p key={i} className="text-sm font-semibold text-foreground border-l-4 border-destructive bg-destructive/5 p-3 mt-2">{b.text}</p>;
    case "list":
      return (
        <ul key={i} className="list-disc pl-5 space-y-2 text-muted-foreground text-sm mt-2">
          {b.items.map((t) => <li key={t}>{t}</li>)}
        </ul>
      );
    case "table":
      return (
        <div key={i} className="overflow-x-auto mt-3">
          <table className="w-full border-collapse text-sm text-muted-foreground">
            <thead>
              <tr>{b.head.map((h) => <th key={h} className="border border-border bg-muted p-2 text-left align-top text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]}>{r.map((c) => <td key={c} className="border border-border p-2 align-top">{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return <p key={i} className="text-muted-foreground text-sm mt-2">{b.text}</p>;
  }
};
