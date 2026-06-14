# Hollywood Férfi Fodrászat — Weboldal Specifikáció

**Típus:** Egyoldalas magyar nyelvű landing page
**Iparág:** Férfi fodrászat | **Város:** Miskolc
**Web státusz:** Csak Facebook (nincs weboldal) — ellenőrzendő
**Elérhetőség:** Tel: +36 30 978 4624 | FB: facebook.com/hollywoodfodraszat | Cím: Andrássy Gyula u. 3-5 (D lépcsőház), Miskolc

---

Készíts egy magyar nyelvű, egyoldalas landing page-et egy férfi fodrászatnak:

AZ ÜZLET ADATAI:
- Név: Hollywood Férfi Fodrászat
- Cím: Andrássy Gyula u. 3-5 (D lépcsőház), Miskolc
- Telefon: +36 30 978 4624
- Facebook: facebook.com/hollywoodfodraszat
- Szolgáltatások: Férfi hajvágás, szakálligazítás

DESIGN:
- Stílus: Klasszikus, maszkulin, retro-hollywoodi
- Színek: Sötét antracit (#22262A) fejlécekhez, arany (#C5A04E) kiemelésekhez, krém (#EEE9E1) háttérhez, sötétszürke (#2A2A2A) szöveghez
- Betűtípus: Karakteres (pl. Oswald címekhez, Roboto szöveghez)

FELÉPÍTÉS (egyetlen görgethető oldal):
1. Hero szekció: "Hollywood Férfi Fodrászat — Miskolc", szlogen ("Klasszikus stílus, profi kezekben"), CTA: "Időpontfoglalás"
2. Szolgáltatások: Hajvágás, szakálligazítás, kombinált csomag — rövid leírás + ár
3. Rólunk: A fodrászat bemutatkozása
4. Galéria: 6 kép placeholder
5. Időpontfoglalás űrlap: Név, telefon, szolgáltatás, kívánt időpont
6. Elérhetőség: Telefon, cím, nyitvatartás, Google Maps
7. Lábléc: Facebook, telefon, cím, © 2026

HANGNEM: Magabiztos, közvetlen, klasszikus. Tegező.

TECHNIKAI: Mobilbarát, reszponzív.

---

## Technikai követelmények
- **Stack:** Next.js 14+ (App Router) + Payload CMS 3.x (Postgres / @payloadcms/db-postgres) + Tailwind CSS
- **Nyelv:** Magyar (HU)
- **Hosting:** Vercel-kompatibilis
- **Responsive:** Mobile-first
- **SEO:** Meta tagek, Open Graph, magyar title/description
- **Űrlap:** Payload CMS form submission → submissions collection
- **Térkép:** Google Maps embed (Miskolc)

## Payload CMS Collections (Postgres adapter)
- `services` — Szolgáltatások (név, leírás, ár, ikon)
- `gallery` — Galéria képek (kép, alt, sorrend)
- `submissions` — Űrlap beküldések (név, telefon, email, üzenet, szolgáltatás, időpont)
- `settings` — Globális (cégnév, telefon, cím, nyitvatartás, social linkek)
