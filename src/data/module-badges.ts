/**
 * Labels für frisch veröffentlichte Module.
 *
 * Bewusst eine eigene, winzige Datei: module-data.ts ist rund 80 KB groß und
 * wird nur auf der Modul-Detailseite geladen. Die Funktionsübersicht auf der
 * Startseite braucht lediglich diese Labels — sie soll dafür nicht die
 * komplette Moduldatenbank in den Homepage-Chunk ziehen.
 */
export type ModuleBadge = "neu";

export const moduleBadgeLabels: Record<ModuleBadge, string> = {
    neu: "Neu",
};
