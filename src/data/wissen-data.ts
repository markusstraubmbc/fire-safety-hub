/**
 * Zentrale Datenquelle für den Wissen-/Ratgeber-Bereich (/wissen).
 *
 * SEO-Zweck: Long-Tail-Suchanfragen (DGUV-Prüffristen, FwDV 7, Software-Einführung)
 * mit echtem Fachcontent abdecken statt nur mit Meta-Keywords.
 *
 * WICHTIG: Wie bei module-data.ts gilt — nach Änderungen
 * `npm run generate-sitemap` ausführen und public/sitemap.xml mit committen.
 * Die Slug-Keys werden von scripts/generate-sitemap.cjs und
 * scripts/prerender.mjs per Regex geparst (Format: "slug": { ... title: "..." ... description: "..." ).
 */

export interface WissenSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface WissenArticle {
  title: string;
  description: string;
  keywords: string[];
  datePublished: string;
  readingMinutes: number;
  intro: string;
  sections: WissenSection[];
  hinweis?: string;
  relatedModules: { slug: string; label: string }[];
}

export const wissenArtikel: Record<string, WissenArticle> = {
  "dguv-pruefristen-feuerwehr": {
    title: "DGUV-Prüffristen bei der Feuerwehr: Der Überblick für Gerätewarte",
    description:
      "Welche Prüffristen gelten für Leitern, Schläuche, Atemschutz und elektrische Geräte der Feuerwehr? Überblick über DGUV-Vorgaben, Dokumentationspflichten und wie Gerätewarte Fristen sicher im Griff behalten.",
    keywords: [
      "DGUV Prüffristen Feuerwehr",
      "Prüffristen Feuerwehrgeräte",
      "DGUV Grundsatz 305-002",
      "Gerätewart Prüfung",
      "Geräteprüfung Feuerwehr Dokumentation",
      "Wartungsplaner Feuerwehr",
    ],
    datePublished: "2026-06-09",
    readingMinutes: 6,
    intro:
      "Ob Steckleiter, Druckschlauch oder Sprungpolster: Nahezu jedes Gerät im Feuerwehrhaus unterliegt wiederkehrenden Prüfpflichten. Grundlage sind die Unfallverhütungsvorschriften der gesetzlichen Unfallversicherung (DGUV) sowie die Herstellerangaben. Dieser Überblick zeigt, welche Fristen typischerweise gelten, wer prüfen darf und warum die Dokumentation mindestens so wichtig ist wie die Prüfung selbst.",
    sections: [
      {
        heading: "Warum Prüffristen kein Papierkram, sondern Kameradenschutz sind",
        paragraphs: [
          "Die DGUV Vorschrift 49 (Unfallverhütungsvorschrift Feuerwehren) verpflichtet die Träger der Feuerwehr, Ausrüstung und Geräte in ordnungsgemäßem Zustand zu halten. Wie geprüft wird, konkretisiert vor allem der DGUV Grundsatz 305-002 (Prüfgrundsätze für Ausrüstung und Geräte der Feuerwehr) – ergänzt durch die Gebrauchsanleitungen der Hersteller.",
          "Im Schadensfall zählt nicht, ob geprüft wurde, sondern ob es nachweisbar ist. Fehlt der Prüfnachweis, steht im Ernstfall der Gerätewart oder der Kommandant in der Verantwortung – bis hin zu haftungsrechtlichen Konsequenzen für die Gemeinde als Trägerin.",
        ],
      },
      {
        heading: "Typische Prüfintervalle im Überblick",
        paragraphs: [
          "Die folgenden Intervalle sind übliche Richtwerte nach DGUV Grundsatz 305-002 und gängiger Praxis. Maßgeblich sind immer die jeweils aktuelle Fassung der Prüfgrundsätze und die Herstellerangaben für das konkrete Gerät:",
        ],
        list: [
          "Tragbare Leitern (Steckleiter, Schiebleiter): Sicht- und Funktionsprüfung nach jeder Benutzung, wiederkehrende Prüfung in der Regel jährlich",
          "Druckschläuche: Sichtprüfung nach jedem Einsatz, Druckprüfung wiederkehrend sowie nach besonderer Beanspruchung",
          "Atemschutzgeräte und Masken: Prüfung nach jedem Gebrauch sowie in den vom Hersteller vorgegebenen Intervallen durch den Atemschutzgerätewart",
          "Elektrische Betriebsmittel (Tauchpumpen, Beleuchtung, Ladegeräte): wiederkehrende Prüfung nach DGUV Vorschrift 3 durch eine befähigte Person",
          "Sprungrettungsgeräte und Hebekissen: jährliche Prüfung nach Herstellerangaben",
          "PSA gegen Absturz (Gerätesatz Absturzsicherung): Sichtprüfung vor jeder Benutzung, wiederkehrende Prüfung mindestens jährlich durch einen Sachkundigen",
          "Hydraulische Rettungsgeräte (Schere/Spreizer): jährliche Sicht- und Funktionsprüfung, umfassende Prüfung in größeren Intervallen nach Hersteller",
        ],
      },
      {
        heading: "Wer darf prüfen?",
        paragraphs: [
          "Wiederkehrende Prüfungen führen sogenannte befähigte Personen durch – in der Praxis meist Gerätewarte mit entsprechender Ausbildung (z. B. Gerätewart-Lehrgang, herstellerspezifische Schulungen für Atemschutz oder hydraulische Rettungsgeräte). Für bestimmte Geräte wie PSA gegen Absturz ist ein gesonderter Sachkundenachweis erforderlich.",
        ],
      },
      {
        heading: "Dokumentation: Das eigentliche Nadelöhr",
        paragraphs: [
          "Jede Prüfung muss nachvollziehbar dokumentiert werden: Gerät, Datum, Prüfer, Ergebnis, festgestellte Mängel und deren Behebung. Papierlisten und Excel-Tabellen stoßen hier schnell an Grenzen – Fristen werden übersehen, Nachweise sind im Ernstfall nicht auffindbar, und bei einem Wechsel des Gerätewarts geht Wissen verloren.",
          "Eine digitale Lösung legt für jedes Gerät eine lückenlose Historie an, erinnert automatisch an fällige Prüfungen und hält Prüfnachweise mit Foto und digitaler Signatur revisionssicher fest. So wird aus der Zettelwirtschaft ein belastbares Nachweissystem.",
        ],
      },
    ],
    hinweis:
      "Dieser Beitrag gibt einen redaktionellen Überblick und ersetzt keine Rechtsberatung. Maßgeblich sind die jeweils aktuellen DGUV-Vorschriften und -Grundsätze, landesrechtliche Regelungen sowie die Herstellerangaben Ihrer Geräte.",
    relatedModules: [
      { slug: "wartungsmanagement", label: "Wartungsmanagement" },
      { slug: "ausruestungsverwaltung", label: "Gerätehaus & Technik" },
    ],
  },

  "atemschutz-dokumentation-fwdv7": {
    title: "Atemschutz-Dokumentation nach FwDV 7: Diese Pflichten gelten",
    description:
      "FwDV 7 kompakt: jährliche Unterweisung, Belastungsübung, arbeitsmedizinische Vorsorge und Einsatznachweise für Atemschutzgeräteträger. Was dokumentiert werden muss und wie die digitale Atemschutzüberwachung hilft.",
    keywords: [
      "FwDV 7 Dokumentation",
      "Atemschutz Nachweis Feuerwehr",
      "Atemschutzgeräteträger Voraussetzungen",
      "Belastungsübung Atemschutz Frist",
      "Atemschutzüberwachung digital",
      "G26.3 Feuerwehr",
    ],
    datePublished: "2026-06-09",
    readingMinutes: 5,
    intro:
      "Kaum ein Bereich der Feuerwehr ist so streng geregelt wie der Atemschutz – aus gutem Grund: Atemschutzgeräteträger arbeiten an der gefährlichsten Stelle des Einsatzes. Die Feuerwehr-Dienstvorschrift 7 (FwDV 7) definiert, wer unter Atemschutz eingesetzt werden darf und was dafür jährlich nachzuweisen ist. Wir fassen die Dokumentationspflichten zusammen.",
    sections: [
      {
        heading: "Die vier Säulen der Atemschutztauglichkeit",
        paragraphs: [
          "Nach FwDV 7 darf nur eingesetzt werden, wer alle Voraussetzungen aktuell erfüllt. In der Praxis müssen pro Geräteträger fortlaufend nachgewiesen werden:",
        ],
        list: [
          "Arbeitsmedizinische Vorsorge (früher 'G26.3'): Eignungsnachweis in den vorgeschriebenen Intervallen, abhängig von Alter und ärztlicher Beurteilung",
          "Jährliche Unterweisung: theoretische Auffrischung zu Geräten, Einsatzgrundsätzen und Notfallverfahren",
          "Jährliche Belastungsübung: z. B. Durchgang in der Atemschutzübungsanlage (Atemschutzstrecke)",
          "Einsatz oder Übung unter Atemschutz: mindestens eine dokumentierte Tätigkeit unter Atemschutz pro Jahr",
        ],
        // Hinweis: Details (z. B. Vorsorge-Intervalle) variieren je nach Landesrecht und ärztlicher Festlegung.
      },
      {
        heading: "Der Atemschutznachweis: Pro Kamerad, lückenlos, aktuell",
        paragraphs: [
          "Für jeden Geräteträger ist ein persönlicher Nachweis zu führen, aus dem Einsätze, Übungen, Unterweisungen und die Tauglichkeit hervorgehen. Läuft eine der Voraussetzungen ab, erlischt die Einsatzberechtigung – und genau das muss der Einheitsführer vor dem Einsatz wissen, nicht erst danach.",
          "In vielen Wehren wird dieser Nachweis noch auf Karteikarten oder in Tabellen geführt. Das Risiko: abgelaufene Fristen fallen erst bei der Jahresüberprüfung auf. Eine digitale Lösung zeigt den Tauglichkeitsstatus jedes Kameraden tagesaktuell an und warnt rechtzeitig vor ablaufenden Fristen.",
        ],
      },
      {
        heading: "Atemschutzüberwachung im Einsatz",
        paragraphs: [
          "Neben den persönlichen Nachweisen verlangt die FwDV 7 eine Atemschutzüberwachung während des Einsatzes: registrierte Trupps, Uhrzeiten und Druckkontrollen. Die klassische Tafel mit Wachsstift funktioniert – aber die Dokumentation für den Einsatzbericht muss anschließend manuell übertragen werden.",
          "Digitale Atemschutzüberwachung erfasst Trupps, Zeiten und Meldungen strukturiert und übernimmt sie direkt in die Einsatzdokumentation. Das entlastet den Atemschutzüberwacher und macht die Nachweisführung konsistent.",
        ],
      },
      {
        heading: "Geräteseite nicht vergessen",
        paragraphs: [
          "Parallel zur Personalseite sind die Geräte selbst zu prüfen und zu dokumentieren: nach jedem Gebrauch, nach Herstellerangaben und nach den Prüfgrundsätzen des DGUV Grundsatzes 305-002. Flaschen, Lungenautomaten und Masken haben eigene Prüfzyklen – ein weiterer Fall für ein sauberes Fristen- und Wartungsmanagement.",
        ],
      },
    ],
    hinweis:
      "Dieser Beitrag gibt einen redaktionellen Überblick und ersetzt keine Rechtsberatung. Maßgeblich sind die FwDV 7 in der jeweils gültigen Fassung, landesrechtliche Regelungen und die Festlegungen Ihres Trägers bzw. Arztes.",
    relatedModules: [
      { slug: "atemschutzueberwachung", label: "Atemschutzüberwachung" },
      { slug: "wartungsmanagement", label: "Wartungsmanagement" },
      { slug: "mannschaftsverwaltung", label: "Personalverwaltung" },
    ],
  },

  "feuerwehrsoftware-einfuehren-leitfaden": {
    title: "Feuerwehrsoftware einführen: Der Leitfaden für Kommandanten und Gemeinden",
    description:
      "Von Excel und Papier zur digitalen Wache: Anforderungen definieren, DSGVO klären, Mannschaft mitnehmen. Schritt-für-Schritt-Leitfaden zur Einführung einer Feuerwehr-Verwaltungssoftware – mit Checkliste.",
    keywords: [
      "Feuerwehrsoftware einführen",
      "Feuerwehr Verwaltungssoftware Auswahl",
      "Feuerwehr Digitalisierung",
      "DSGVO Feuerwehr Software",
      "Feuerwehr Software Vergleich",
      "Gerätehaus digitalisieren",
    ],
    datePublished: "2026-06-09",
    readingMinutes: 7,
    intro:
      "Mitgliederlisten in Excel, Prüfnachweise im Ordner, Einsatzberichte in Word und die Alarmverfügbarkeit im Gruppenchat: So sieht der Alltag vieler Freiwilliger Feuerwehren aus. Der Umstieg auf eine zentrale Verwaltungssoftware lohnt sich – wenn die Einführung strukturiert angegangen wird. Dieser Leitfaden zeigt die fünf entscheidenden Schritte.",
    sections: [
      {
        heading: "Schritt 1: Anforderungen aus dem Alltag ableiten",
        paragraphs: [
          "Bevor Anbieter verglichen werden, sollte die eigene Wehr ihre Prozesse auflisten: Wer verwaltet Geräte und Prüffristen? Wie entstehen Einsatzberichte? Wie werden Lehrgänge und Qualifikationen nachgehalten? Daraus ergibt sich der Modulbedarf – von Wartungsmanagement über Einsatzdokumentation bis zur Personalverwaltung.",
          "Wichtig ist auch der Blick auf die Nutzungssituation: Im Gerätehaus bewährt sich ein Kiosk-Modus auf einem Tablet, mit dem Kameraden Wartungen und Meldungen ohne eigenen Rechner erfassen. Unterwegs zählt die mobile Nutzung im Browser, ohne App-Installation.",
        ],
      },
      {
        heading: "Schritt 2: Datenschutz von Anfang an klären",
        paragraphs: [
          "Feuerwehrdaten sind sensibel: Gesundheitsdaten (Atemschutztauglichkeit), Erreichbarkeiten, Qualifikationen. Verantwortlich im Sinne der DSGVO ist in der Regel die Gemeinde als Trägerin der Feuerwehr. Vor der Einführung gehören deshalb auf den Tisch:",
        ],
        list: [
          "Serverstandort Deutschland bzw. EU und ein Auftragsverarbeitungsvertrag (AVV) mit dem Anbieter",
          "Rollen- und Rechtekonzept: Wer sieht welche Daten? (Kommandant, Gerätewart, Kassier, Mannschaft)",
          "Löschkonzept und Datenexport: Kommen die Daten im Zweifel wieder vollständig heraus?",
          "Verschlüsselung der Übertragung und der gespeicherten Daten",
        ],
      },
      {
        heading: "Schritt 3: Budget und Beschaffung über die Gemeinde",
        paragraphs: [
          "Feuerwehrsoftware wird üblicherweise aus dem Gemeindehaushalt finanziert. Jahrespreise im niedrigen drei- bis mittleren vierstelligen Bereich (je nach Gemeindegröße) sind im Vergleich zu den Kosten eines einzigen verlorenen Haftungsfalls oder einer fehlgeschlagenen Beschaffung gut argumentierbar. Hilfreich für den Gemeinderat: eine kurze Gegenüberstellung der heutigen Aufwände (Verwaltungsstunden, Papier, Insellösungen) und der erwarteten Entlastung.",
        ],
      },
      {
        heading: "Schritt 4: Datenübernahme und Start klein halten",
        paragraphs: [
          "Der häufigste Fehler bei der Einführung: alles auf einmal. Bewährt hat sich ein Start mit einem Kernmodul – meist der Geräteverwaltung mit Prüffristen, weil dort der Leidensdruck am größten ist. Bestandsdaten (Inventarlisten, Mitgliederdaten) sollten vom Anbieter beim Onboarding mit übernommen werden, statt sie händisch neu zu erfassen.",
        ],
      },
      {
        heading: "Schritt 5: Die Mannschaft mitnehmen",
        paragraphs: [
          "Software, die nur der Schriftführer bedienen kann, scheitert. Entscheidend ist, dass die Bedienung für alle Kameraden intuitiv ist und der Nutzen sofort spürbar wird – etwa wenn die Wartung am Kiosk im Gerätehaus in zwei Minuten erfasst ist oder der Einsatzbericht per Sprache diktiert werden kann. Ein kurzer Übungsabend zur Einführung wirkt mehr als jedes Handbuch.",
        ],
      },
      {
        heading: "Checkliste für die Anbieterauswahl",
        list: [
          "Deckt die Software unsere Kernprozesse ab (Geräte, Einsätze, Personal, Termine)?",
          "Serverstandort Deutschland, AVV, Rollen- und Rechtekonzept vorhanden?",
          "Kiosk-/Tablet-Bedienung im Gerätehaus möglich?",
          "Funktioniert sie mobil im Browser, ohne Installationsaufwand?",
          "Werden Bestandsdaten beim Onboarding übernommen?",
          "Gibt es Erinnerungen für Prüffristen und ablaufende Qualifikationen?",
          "Transparente Jahrespreise passend zur Gemeindegröße?",
          "Persönlicher Support statt anonymer Ticketsysteme?",
        ],
      },
    ],
    relatedModules: [
      { slug: "wartungsmanagement", label: "Wartungsmanagement" },
      { slug: "kiosk-modus", label: "Kiosk-Modus" },
      { slug: "einsatzerfassung", label: "Einsätze & Übungen" },
    ],
  },
};
