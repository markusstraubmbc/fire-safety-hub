/**
 * Store-Links der RESQIO Alarm-App – einzige Quelle für Website und Build-Skripte.
 *
 * `appStoreUrl` darf `null` sein, solange die App im Apple App Store nicht live ist:
 * die Komponente blendet den Button dann aus, statt auf einen toten Link zu zeigen.
 * Sobald die Store-URL (https://apps.apple.com/<land>/app/resqio-alarm/id6808550999) vorliegt,
 * genügt es, sie hier einzutragen – Startseite, Footer, Modulseite, Prerender und
 * llms.txt ziehen nach.
 */
export const ALARM_APP = {
    name: "RESQIO Alarm",
    packageId: "io.resqio.alarm",
    googlePlayUrl: "https://play.google.com/store/apps/details?id=io.resqio.alarm",
    appStoreUrl: "https://apps.apple.com/ch/app/resqio-alarm/id6808550999" as string | null,
};
