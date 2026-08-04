# EU AI Act – Einordnung für RESQIO

**Stand: 4. August 2026** · Verordnung (EU) 2024/1689

> Dieses Dokument ist eine technische Bestandsaufnahme, **keine Rechtsberatung**.
> Die Einstufung als Hochrisiko-KI hat erhebliche Folgen (Konformitäts­bewertung,
> CE-Kennzeichnung, EU-Datenbank-Registrierung) und gehört vor der Umsetzung
> anwaltlich geprüft. Die hier markierten offenen Punkte sind genau die, bei
> denen die Prüfung ansetzen muss.

---

## 1. Welche Rolle hat RESQIO?

RESQIO entwickelt KI-Funktionen und bringt sie unter eigenem Namen auf den
Markt → **Anbieter** (*provider*, Art. 3 Nr. 3). Das ist die Rolle mit den
weitaus meisten Pflichten.

Die Feuerwehren, Gemeinden und Landkreise, die RESQIO einsetzen, sind
**Betreiber** (*deployer*, Art. 3 Nr. 4). Das ist für den Vertrieb relevant:
öffentliche Stellen als Betreiber eines Hochrisiko-Systems müssen nach **Art. 27
eine Grundrechte-Folgenabschätzung** durchführen. Wenn RESQIO in eine
Hochrisiko-Kategorie fällt, wird jede ausschreibende Kommune danach fragen.

Die Sprachmodelle stammen laut Modulbeschreibung von Drittanbietern
(„Anbieter-Wahl: Die genutzte KI lässt sich zwischen mehreren Anbietern
umschalten"). Die GPAI-Pflichten aus Kapitel V liegen damit bei diesen
Anbietern, nicht bei RESQIO — solange kein eigenes Modell trainiert oder
substanziell nachtrainiert wird.

---

## 2. Der kritische Befund: zwei mögliche Hochrisiko-Kategorien

### 2.1 Anhang III Nr. 4 – Beschäftigung (hohe Wahrscheinlichkeit)

Auf der Website wird beworben:

> „**KI-Personalanalyse: Erkennt, wer für Beförderungen bereit ist** und welche
> Qualifikationen fehlen"
> — `src/data/module-data.ts`, Modul `ki-integration`

Anhang III Nr. 4 Buchst. b erfasst KI-Systeme, die dazu bestimmt sind,
Entscheidungen über **Beförderungen** zu treffen oder zu beeinflussen, Aufgaben
anhand persönlicher Merkmale zuzuweisen oder **Leistung und Verhalten von
Personen zu bewerten**. Die beworbene Funktion trifft die Formulierung sehr
direkt.

Zwei Gegenargumente, die geprüft werden müssen:

- **Art. 6 Abs. 3 – Ausnahme.** Wenn das System nur eine eng umgrenzte
  Verfahrensaufgabe erfüllt oder ein Ergebnis menschlicher Arbeit lediglich
  verbessert, ohne die menschliche Bewertung zu ersetzen, entfällt die
  Einstufung. **Aber:** Sobald ein *Profiling natürlicher Personen* stattfindet,
  greift die Ausnahme nie (Art. 6 Abs. 3 letzter Unterabsatz). „Erkennt, wer für
  Beförderungen bereit ist" klingt nach genau diesem Profiling. Wer sich auf die
  Ausnahme beruft, muss die Bewertung **dokumentieren** (Art. 6 Abs. 4) und sich
  trotzdem in der EU-Datenbank registrieren.
- **Sind ehrenamtliche Feuerwehrleute „Beschäftigte"?** Bei Berufsfeuerwehren
  eindeutig ja. Bei Freiwilligen Feuerwehren ist es diskutabel — der AI Act
  spricht von „arbeitsbezogenen Vertragsverhältnissen", was weit ausgelegt
  wird. Für ein Produkt, das beide bedient, ist das kein tragfähiger
  Ausschlussgrund.

### 2.2 Anhang III Nr. 5 Buchst. d – Notfalldienste (klärungsbedürftig)

Diese Kategorie erfasst KI-Systeme zur Bewertung und Klassifizierung von
Notrufen, zur **Entsendung oder Priorisierung der Entsendung von Einsatzkräften
— ausdrücklich einschließlich der Feuerwehr** — sowie **Systeme zur Triage von
Patienten in der Notfallversorgung**.

Berührungspunkte im Produkt:

| Modul | Funktion | Frage |
|---|---|---|
| `stab-modul` | „MANV-Sichtungsliste mit Triage T1–T4" | Schlägt die KI eine Sichtungskategorie vor, oder erfasst das System nur, was ein Mensch entschieden hat? |
| `lagemonitor` / `alarmmonitor` | „Intelligentes Lage-Mapping mit automatischer Objektdaten-Zuordnung" | Beeinflusst das die Alarmierung/Priorisierung, oder blendet es nur Daten ein? |
| `ki-integration` | „Gefahrstoff-Assistenz: Schutzempfehlungen" | Empfehlung an die Einsatzleitung — mit Fachberater-Vorbehalt dokumentiert |

**Das ist die entscheidende Frage des ganzen Dokuments.** Reine Erfassung und
Darstellung ist keine KI-gestützte Triage. Ein Vorschlag der Maschine ist es.

---

## 3. Verbotene Praktiken – was nie passieren darf (Art. 5, gilt seit 2/2025)

- **Emotionserkennung am Arbeitsplatz** ist verboten (Art. 5 Abs. 1 Buchst. f),
  außer aus medizinischen oder Sicherheitsgründen. Eine „Personalanalyse" darf
  also niemals Stimmungs-, Stress- oder Motivationslagen aus Sprache, Text oder
  Verhalten ableiten. Beim Diktiermodul heißt das konkret: Transkription ja,
  Auswertung des emotionalen Zustands der sprechenden Person nein.
- **Social Scoring** (Art. 5 Abs. 1 Buchst. c): keine übergreifende
  Verhaltensbewertung von Kameraden, die zu Benachteiligung in unzusammen­hängenden
  Kontexten führt.

Verstöße hier sind mit bis zu **35 Mio. € oder 7 % des Jahresumsatzes** bewehrt —
der höchste Bußgeldrahmen der Verordnung.

---

## 4. Pflichten, die unabhängig von der Risikoklasse gelten

### Art. 4 – KI-Kompetenz (gilt seit 2. Februar 2025, also bereits jetzt)

Anbieter **und** Betreiber müssen sicherstellen, dass ihr Personal über
ausreichende KI-Kompetenz verfügt. Für RESQIO heißt das: eine dokumentierte,
nachweisbare Schulung für alle, die an den KI-Funktionen arbeiten oder Kunden
dazu beraten. Kein Formalismus — das ist die am einfachsten prüfbare Pflicht
überhaupt und kostet wenig.

### Art. 50 – Transparenz (gilt seit 2. August 2026, seit zwei Tagen)

| Absatz | Betrifft | Was RESQIO tun muss |
|---|---|---|
| Abs. 1 | Systeme, die direkt mit Menschen interagieren | Der „Wissensassistent" (Fragen in natürlicher Sprache) muss erkennbar als KI ausgewiesen sein |
| Abs. 2 | Anbieter generativer Systeme | KI-erzeugte Texte/Bilder **maschinenlesbar** markieren. Eine sichtbare Kennzeichnung allein genügt nicht — gefordert sind Metadaten bzw. Wasserzeichen |
| Abs. 4 | Betreiber | Deepfakes offenlegen; öffentlich publizierte, KI-erzeugte Texte zu Themen öffentlichen Interesses kennzeichnen, außer bei menschlicher Prüfung mit redaktioneller Verantwortung |

Die Produktbeschreibung sagt bereits zu: *„Jede KI-Ausgabe ist klar als
KI-generiert gekennzeichnet."* Für Abs. 2 muss das über die sichtbare
Kennzeichnung hinaus **maschinenlesbar** sein (z. B. C2PA-Metadaten bei Bildern).
Bitte prüfen, ob das im Produkt tatsächlich so umgesetzt ist — es steht als
Zusage auf einer öffentlichen Verkaufsseite.

---

## 5. Wenn Hochrisiko: was dann fällig wird

Falls eine der beiden Kategorien aus Abschnitt 2 greift, sind das die
Artefakte, die vorliegen müssen — der Umfang ist erheblich:

| Artikel | Artefakt |
|---|---|
| Art. 9 | Risikomanagementsystem über den gesamten Lebenszyklus |
| Art. 10 | Daten-Governance: Trainings-/Testdaten, Bias-Prüfung |
| Art. 11 + Anhang IV | Technische Dokumentation |
| Art. 12 | Automatische Protokollierung (Logs) |
| Art. 13 | Betriebsanleitung für die Feuerwehren |
| Art. 14 | Menschliche Aufsicht — konstruktiv verankert, nicht nur behauptet |
| Art. 15 | Genauigkeit, Robustheit, Cybersicherheit |
| Art. 17 | Qualitätsmanagementsystem |
| Art. 43 + Anhang VI | Konformitätsbewertung (interne Kontrolle) |
| Art. 47/48 | EU-Konformitätserklärung, CE-Kennzeichnung |
| Art. 49 | Registrierung in der EU-Datenbank |

Bußgeldrahmen bei Verstößen: bis zu **15 Mio. € oder 3 %** des Jahresumsatzes
(Art. 99 Abs. 4).

---

## 6. Der Werbeaussagen-Punkt

Auf der öffentlichen Modulseite steht als Vorteil:

> „Transparenz: Nachvollziehbar, wo KI eingesetzt wird – **im Sinne des EU AI Act**"

Das ist eine Konformitätsaussage auf einer Verkaufsseite. Solange die
Einordnung aus Abschnitt 2 offen ist, ist sie mindestens verfrüht. Zwei Risiken:

1. **Wettbewerbsrecht (UWG):** Werbung mit Rechtskonformität, die nicht belegt
   ist, ist abmahnfähig.
2. **Vergaberecht:** Kommunen zitieren solche Zusagen in Ausschreibungen. Wenn
   die Zusage später nicht haltbar ist, wird daraus ein Vertragsproblem.

Dasselbe gilt für den Style-Guide-Grundsatz im Repo, der „zertifiziert" und
„rechtssicher" bewusst vermeidet — die AI-Act-Aussage widerspricht dieser
Linie.

**Empfehlung:** die Aussage entschärfen, bis die Einordnung steht. Etwa:
„Transparenz: Nachvollziehbar, wo und in welchem Umfang KI eingesetzt wird."
Das ist die belegbare Tatsache ohne die Rechtsbehauptung.

---

## 7. Wichtiger Vorbehalt zum Zeitplan

Die reguläre Anwendbarkeit der Hochrisiko-Vorschriften aus Anhang III ist der
**2. August 2026**. Es gab jedoch einen Vorschlag der Kommission („Digital
Omnibus", November 2025), Teile davon zu verschieben und an die Verfügbarkeit
harmonisierter Normen zu koppeln.

**Ob und wie dieser Vorschlag verabschiedet wurde, kann ich nicht verlässlich
sagen** — mein Wissensstand endet im Mai 2026. Der aktuelle Stand muss vor
jeder Planung geprüft werden; er entscheidet über die Fristen, nicht über die
Pflichten selbst.

Zuständige Marktüberwachungsbehörde in Deutschland: Bundesnetzagentur.

---

## 8. Nächste Schritte

**Sofort, ohne weitere Klärung:**

1. Art. 4 KI-Kompetenz: Schulung aufsetzen und dokumentieren.
2. Prüfen, dass nirgends Emotionserkennung stattfindet (Art. 5).
3. Die AI-Act-Werbeaussage entschärfen (Abschnitt 6).
4. Prüfen, ob die zugesagte KI-Kennzeichnung **maschinenlesbar** ist (Art. 50 Abs. 2).

**Nach Klärung der zwei Fragen aus Abschnitt 2:**

5. Einordnung anwaltlich bestätigen lassen — insbesondere Anhang III Nr. 4.
6. Falls Hochrisiko: Artefakte aus Abschnitt 5 aufbauen.
7. Falls Art. 6 Abs. 3 greifen soll: Bewertung dokumentieren, EU-Datenbank-
   Registrierung trotzdem einplanen.
8. Betriebsanleitung und Zuarbeit für die Grundrechte-Folgenabschätzung der
   Kommunen (Art. 27) vorbereiten — das wird zum Vertriebsargument.
