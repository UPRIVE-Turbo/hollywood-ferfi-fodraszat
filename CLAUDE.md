# Hollywood Férfi Fodrászat — Weboldal Projekt

## Mit kell csinálnod
Építs egy **egyoldalas, magyar nyelvű landing page-et** a(z) **Hollywood Férfi Fodrászat** (Férfi fodrászat, Miskolc) számára.

## Lépések

### 1. AIDesigner projekt LÉTREHOZÁSA (KÖTELEZŐ ELSŐ LÉPÉS!)
Az AIDesigner MCP nem generál designt amíg nincs projekt. ELŐSZÖR mindig:
- Hívd meg az AIDesigner `create_project` (vagy `new_project`) toolt a cég nevével: "Hollywood Férfi Fodrászat"
- Jegyezd meg a visszakapott project ID-t — ezt fogod használni a design generáláshoz
- Csak ha a projekt létrejött, lépj tovább a design generálásra

Ha nem tudod pontosan a tool nevét, listázd ki az AIDesigner MCP elérhető tooljait,
és keresd a projekt-létrehozó toolt (create/new project), hívd meg azt elsőként.

### 2. Design generálás (AIDesigner MCP)
A létrehozott projekt ID-jával használd a `generate_design` toolt:
- Olvasd el a `spec.md` fájlt — ott van a teljes design specifikáció
- Olvasd el a `prompt.json` fájlt — ott vannak a színek, betűtípusok, céges adatok
- Prompt az AIDesigner-nek: A spec.md-ben lévő teljes magyar nyelvű leírás
- Viewport: desktop (1440px)
- Generálj egy mobil verziót is (viewport: mobile, 390px)

### 3. Design finomítás
Ha az első design nem tökéletes, használd a `refine_design` toolt:
- "Legyen magyarabb a szöveg / természetesebb"
- "A színek legyenek jobban a prompt.json szerint"
- "Mobilon legyen jobb a spacing"

### 4. Frontend implementálás — PIXEL-PERFECT az AIDesigner design alapján!

⚠️ KRITIKUS SZABÁLY: A Next.js implementációnak **PONTOSAN** úgy kell kinéznie, mint az AIDesigner-ben generált design. NE tervezz újra, NE csinálj mást. Az AIDesigner outputja a "source of truth" — minden szín, spacing, layout, tipográfia, sorrend, szekció-struktúra 1:1 megegyezzen.

**Képek kezelése — NE legyenek üres placeholder-ek:**
- Az AIDesigner által generált designben lévő képeket (stock fotók, illusztrációk) HASZNÁLD a Next.js oldalon
- Ha az AIDesigner képeket generált a designhez, mentsd le azokat és használd `next/image`-gel
- Ha nincs kép az AIDesigner-től, használj VALÓDI stock fotókat (Unsplash, Pexels stb.) a cég iparágának megfelelően — pl. tetoválás stúdióhoz tetoválás képek, fodrászathoz fodrászat képek
- SOHA ne hagyj üres `<img>` tag-et alt szöveggel kép nélkül — ez nem demo-képes
- Minden képnek legyen valódi `src` URL-je, ne csak alt text

**Implementálás lépései:**
- Hozd létre a Next.js oldalakat (`src/app/page.tsx`)
- Használj Tailwind CSS-t — a színek, spacing, border-radius, shadow PONTOSAN az AIDesigner design szerint
- Google Fonts betöltés a megadott betűtípusokkal
- Minden szekció: Hero → Szolgáltatások → Rólunk → Galéria → Űrlap → Kapcsolat → Lábléc
- A szekciók sorrendje, mérete, elrendezése AZONOS legyen az AIDesigner designnal
- A gombok, CTA-k stílusa is AZONOS legyen

### 5. Payload CMS collections (Postgres adapter!)
A projekt Postgres-t használ (`@payloadcms/db-postgres`, Drizzle ORM).
Hozd létre:
- `src/collections/Services.ts` — név, leírás, ár, ikon, sorrend
- `src/collections/Gallery.ts` — kép, alt szöveg, sorrend
- `src/collections/Submissions.ts` — név, telefon, email, szolgáltatás, időpont, üzenet
- `src/globals/Settings.ts` — cégnév, telefon, cím, email, nyitvatartás, facebook, instagram

FONTOS Postgres-nél:
- A `payload.config.ts`-ben a postgresAdapter legyen beállítva `DATABASE_URI`-val
- Fejlesztésben `push: true` (auto séma-szinkron), production-ban migrációk
- Ha sématváltozás van: `npm run payload migrate:create` majd `migrate`

### 6. Seed data
Töltsd fel a Settings-et a `prompt.json`-ból:
- Cégnév, telefon, cím, email, social linkek
- Adj hozzá 3-5 placeholder szolgáltatást a spec.md alapján

### 7. Űrlap
Az időpontfoglalás/kapcsolat űrlap mentse a Payload `submissions` collection-be.
Server action vagy API route — NE client-side fetch.

### 8. Vercel deploy előkészítés
- Hozz létre `vercel.json`-t ha nincs
- `.env.local` fájlba: DATABASE_URI (Postgres), PAYLOAD_SECRET placeholder
- `next.config.js`-ben legyen output: 'standalone' ha szükséges
- Ellenőrizd hogy `npm run build` hiba nélkül lefut

### 9. Végső ellenőrzés
- `npm run dev` → localhost:3000 működjön
- ⚠️ DESIGN EGYEZÉS: hasonlítsd össze az AIDesigner designt a kész oldallal — AZONOSNAK kell lennie
- ⚠️ KÉPEK: minden kép helyén VALÓDI kép legyen, NE alt szöveg vagy üres placeholder
- Mobil nézet OK (telefon szélességen is jól nézzen ki)
- Minden szöveg magyar
- Űrlap működik (beküldés után mentődik)
- Google Maps embed a kapcsolat szekcióban
- Gombok, linkek, telefonszámok mind működnek

## Fontos szabályok
- ⚠️ AZ IMPLEMENTÁLT OLDAL PONTOSAN ÚGYNÉZZEN KI MINT AZ AIDESIGNER DESIGN — ne tervezz újra!
- ⚠️ MINDEN KÉPNEK LEGYEN VALÓDI FORRÁSA (AIDesigner képek, Unsplash, Pexels) — SOHA ne legyen üres kép vagy csak alt szöveg
- MINDEN szöveg, gomb, placeholder, hibaüzenet MAGYARUL
- Tegező/magázó stílus a spec.md szerint
- A design a `prompt.json` színeit és betűtípusait használja
- Mobile-first, reszponzív
- Telefonszámok kattinthatóak (tel: link)
- Ez egy DEMO oldal amit ügyfeleknek mutatunk — profinak és késznek kell kinéznie!
