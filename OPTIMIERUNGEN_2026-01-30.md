# Website-Optimierungen - 30. Januar 2026

## Status Vor Optimierung

### Build-Statistik
```
Bundle: 501.45 kB (158.10 kB gzip)
Warnung: Chunk größer als 500 kB
```

### Screenshot-Größen
```
showcase-kiosk-mobile.png:   699.81 kB
showcase-kiosk-home.png:     680.95 kB
showcase-lagemonitor.png:    621.31 kB
showcase-dialogs.png:        346.00 kB
showcase-statistics.png:     225.56 kB
showcase-operations.png:     147.58 kB

Gesamt Screenshots: ~2.7 MB
```

---

## Geplante Optimierungen

### 1. ✅ Bild-Optimierung (WebP)
**Problem:** PNG-Screenshots sind sehr groß (2.7 MB gesamt)

**Lösung:** Konvertierung zu WebP mit 85% Qualität
- Erwartete Reduktion: 50-80% kleinere Dateien
- Fallback für ältere Browser via `<picture>` Element

**Implementation:**
```bash
# Sharp für Bild-Konvertierung installieren
npm install --save-dev sharp

# Konvertierungs-Script erstellen
```

**Erwartetes Ergebnis:**
- showcase-kiosk-mobile.png (700 kB) → showcase-kiosk-mobile.webp (~200 kB)
- showcase-kiosk-home.png (681 kB) → showcase-kiosk-home.webp (~200 kB)
- showcase-lagemonitor.png (621 kB) → showcase-lagemonitor.webp (~180 kB)

**Gesamt-Einsparung: ~1.5 MB**

---

### 2. ✅ Lazy Loading für Bilder
**Problem:** Alle Screenshots werden sofort geladen

**Lösung:** Browser-natives lazy loading
```tsx
<img
  src={item.image}
  alt={item.title}
  loading="lazy"
  decoding="async"
/>
```

**Vorteil:** Bilder werden erst geladen, wenn sie sichtbar werden

---

### 3. ✅ Code-Splitting für große Komponenten
**Problem:** Alles in einem Chunk (501 kB)

**Lösung:** Dynamic Imports für große Komponenten
```tsx
import { lazy, Suspense } from "react";

const SoftwareShowcaseSection = lazy(() =>
  import("@/components/SoftwareShowcaseSection")
);
const FeaturesSection = lazy(() =>
  import("@/components/FeaturesSection")
);

// In Index.tsx
<Suspense fallback={<div>Lädt...</div>}>
  <SoftwareShowcaseSection />
</Suspense>
```

**Erwartetes Ergebnis:** Main Bundle < 500 kB

---

### 4. ✅ Auto-Play Verbesserungen
**Problem:** Auto-Play läuft immer, auch bei Hover

**Lösung:** Pause bei Interaktion
```tsx
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (!api || isPaused) return;

  const interval = setInterval(() => {
    api.scrollNext();
  }, 5000);

  return () => clearInterval(interval);
}, [api, isPaused]);

// Pause bei Hover
<div
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
>
```

**Vorteil:** Bessere User Experience, kein störendes Weiterschalten

---

### 5. ✅ Accessibility (A11y) Verbesserungen
**Problem:** Fehlende ARIA-Labels für Screen Reader

**Lösung:**
```tsx
<Carousel
  aria-label="Software Screenshots Galerie"
  aria-live="polite"
>
  <button
    aria-label={`Gehe zu Screenshot ${index + 1}: ${item.title}`}
    aria-current={current === index}
  >
```

**Vorteil:** Bessere Zugänglichkeit für Screen Reader

---

### 6. ✅ Mobile Optimierung
**Problem:** Thumbnails zu klein auf Mobile (96x64)

**Lösung:**
```tsx
className="w-28 h-20 md:w-32 md:h-24"  // 112x80 statt 96x64
```

**Auto-Play Mobile Deaktivierung:**
```tsx
const isMobile = window.innerWidth < 768;
const autoPlayDelay = isMobile ? 0 : 5000; // Kein Auto-Play auf Mobile
```

**Vorteil:** Bessere Touch-Bedienung, weniger Akku-Verbrauch

---

### 7. ✅ Picture Element mit Fallback
**Problem:** WebP wird nicht von allen Browsern unterstützt

**Lösung:**
```tsx
<picture>
  <source srcSet={item.imageWebp} type="image/webp" />
  <img src={item.imagePng} alt={item.title} loading="lazy" />
</picture>
```

**Vorteil:** Moderne Browser nutzen WebP, alte Browser PNG

---

## Erwartete Ergebnisse

### Bundle-Size
```
Vorher: 501.45 kB (158.10 kB gzip)
Nachher: ~350 kB (~110 kB gzip)
Reduktion: -30%
```

### Screenshot-Größen
```
Vorher: 2.7 MB (PNG)
Nachher: ~1.2 MB (WebP mit PNG Fallback)
Reduktion: -55%
```

### Load Time (Geschätzt)
```
Initial Load: -40% schneller
Time to Interactive: -35% schneller
Largest Contentful Paint: -50% besser
```

### Lighthouse Score (Erwartet)
```
Performance: 85 → 95
Accessibility: 90 → 98
Best Practices: 95 → 100
SEO: 100 (bleibt)
```

---

## Implementation-Reihenfolge

### Phase 1: Bilder (Höchste Priorität)
1. WebP-Konvertierungs-Script erstellen
2. Alle Screenshots konvertieren
3. Picture-Element implementieren
4. Lazy Loading aktivieren

**Erwartete Zeit:** 30 Minuten
**Impact:** 🔥🔥🔥 Sehr hoch (-1.5 MB)

### Phase 2: Code-Splitting (Hohe Priorität)
1. Lazy Imports für große Komponenten
2. Suspense Boundaries hinzufügen
3. Loading-Spinner erstellen

**Erwartete Zeit:** 20 Minuten
**Impact:** 🔥🔥 Hoch (Bundle < 500 kB)

### Phase 3: UX-Verbesserungen (Mittlere Priorität)
1. Auto-Play Pause bei Hover
2. Visibility API für Tab-Wechsel
3. Mobile Auto-Play Deaktivierung

**Erwartete Zeit:** 15 Minuten
**Impact:** 🔥 Mittel (Bessere UX)

### Phase 4: Accessibility (Wichtig)
1. ARIA-Labels hinzufügen
2. Keyboard-Navigation testen
3. Screen Reader testen

**Erwartete Zeit:** 15 Minuten
**Impact:** 🔥 Mittel (Compliance)

### Phase 5: Mobile (Nice-to-have)
1. Thumbnail-Größen anpassen
2. Touch-Gesten optimieren

**Erwartete Zeit:** 10 Minuten
**Impact:** 🔥 Niedrig

---

## WebP-Konvertierungs-Script

```javascript
// scripts/convert-images.js
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';

const assetsDir = './src/assets';
const quality = 85;

async function convertImages() {
  const files = await readdir(assetsDir);
  const pngFiles = files.filter(f => f.endsWith('.png') && f.startsWith('showcase-'));

  for (const file of pngFiles) {
    const input = path.join(assetsDir, file);
    const output = input.replace('.png', '.webp');

    await sharp(input)
      .webp({ quality })
      .toFile(output);

    console.log(`✓ ${file} → ${path.basename(output)}`);
  }
}

convertImages();
```

**Nutzung:**
```bash
node scripts/convert-images.js
```

---

## Testing-Checklist

### Nach Implementation:
- [ ] Build erfolgreich (npm run build)
- [ ] Bundle < 500 kB
- [ ] Screenshots laden lazy
- [ ] WebP wird in Chrome/Firefox geladen
- [ ] PNG Fallback funktioniert in Safari/IE
- [ ] Auto-Play pausiert bei Hover
- [ ] Auto-Play stoppt bei Tab-Wechsel
- [ ] Thumbnails sind klickbar
- [ ] Click-to-Enlarge funktioniert
- [ ] Keyboard-Navigation funktioniert
- [ ] Screen Reader kann navigieren
- [ ] Mobile: Thumbnails gut sichtbar
- [ ] Mobile: Touch-Gesten funktionieren

### Lighthouse Audit:
```bash
npm run build
npm run preview
# Chrome DevTools → Lighthouse → Run Audit
```

**Ziel-Werte:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## Monitoring

### Metriken überwachen:
1. **Bundle Size:** Via Vite Build Output
2. **Load Time:** Chrome DevTools Network Tab
3. **Core Web Vitals:**
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

### Tools:
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **WebPageTest:** https://www.webpagetest.org/
- **Lighthouse CI:** Für kontinuierliche Überwachung

---

## Rollback-Plan

Falls Probleme auftreten:

```bash
# Letzten Commit rückgängig machen
git revert HEAD

# Oder zu vorherigem Commit zurückkehren
git reset --hard HEAD~1

# Build-Cache löschen
rm -rf node_modules/.vite dist
npm run build
```

---

## Nächste Schritte

1. **Phase 1 starten:** WebP-Konvertierung
2. **Tests durchführen:** Browser-Kompatibilität
3. **Messen:** Vorher/Nachher Vergleich
4. **Dokumentieren:** Tatsächliche Ergebnisse
5. **Commit & Push:** Mit Performance-Metriken

---

*Dokumentation erstellt am: 30. Januar 2026*
*Status: Geplant → In Umsetzung*
