/**
 * Labels für frisch veröffentlichte bzw. noch nicht verfügbare Module.
 *
 * Bewusst eine eigene, winzige Datei: module-data.ts ist rund 80 KB groß und
 * wird nur auf der Modul-Detailseite geladen. Die Funktionsübersicht auf der
 * Startseite braucht lediglich diese Labels — sie soll dafür nicht die
 * komplette Moduldatenbank in den Homepage-Chunk ziehen.
 */
export type ModuleBadge = "neu" | "in-entwicklung";

export const moduleBadgeLabels: Record<ModuleBadge, string> = {
    neu: "Neu",
    "in-entwicklung": "In Entwicklung",
};
