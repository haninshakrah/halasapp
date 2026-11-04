# Halas vård- och omsorgsapp

**Manual för att ändra appen och ta den i bruk**

- **Webbplats:** [haninshakrah.github.io/halasapp](https://haninshakrah.github.io/halasapp/)
- **Repository:** [github.com/haninshakrah/halasapp](https://github.com/haninshakrah/halasapp)

> [!TIP]
> Följ avsnitten i ordning om du sätter upp appen för första gången. Använd innehållsförteckningen för att hoppa direkt till ett ämne.

## Innehåll

- [0. Börja från noll: skapa en ny repo](#0-börja-från-noll-skapa-en-ny-repo)
- [1. Vad finns i repon?](#1-vad-finns-i-repon)
- [2. Små ändringar själv](#2-små-ändringar-själv)
- [3. Större ändringar med Claude](#3-större-ändringar-med-claude)
- [4. Bilder](#4-bilder)
- [5. Lunchmenyn](#5-lunchmenyn)
- [6. Ta appen i bruk](#6-ta-appen-i-bruk)
- [7. Viktigt innan ni börjar använda appen](#7-viktigt-innan-ni-börjar-använda-appen)
- [8. Rekommenderad ordning](#8-rekommenderad-ordning)
- [9. Felsökning](#9-felsökning)

## 0. Börja från noll: skapa en ny repo

Du behöver mappen `github-upload`. Ladda ner den från Claude och packa upp den. Den innehåller appfilerna, men inte arbetsflödesfilen. Den skapar du direkt på GitHub i steg 3.

### Steg 1: Skapa repon

1. Gå till [github.com](https://github.com), tryck på **+** uppe till höger och välj **New repository**.
2. Skriv `halasapp` som namn och välj **Public**.
3. Kryssa i **Add a README file** så att repon inte är tom.
4. Tryck på **Create repository**.

### Steg 2: Ladda upp filerna

1. I repon, välj **Add file** och sedan **Upload files**.
2. Öppna mappen `github-upload` på datorn. Markera allt som ligger **inuti** mappen: `index.html`, `menu.json`, `support.js`, `ios-frame.jsx`, `_ds`, `uploads` och `scripts`.
3. Dra de markerade filerna och mapparna till webbläsaren. Dra inte själva mappen `github-upload`.
4. Använd Chrome eller Edge, som kan ta emot mappar. Vänta tills alla filer har laddats upp (ungefär 30 filer).
5. Tryck på **Commit changes** längst ned.

**Kontrollera uppladdningen:** startsidan i repon ska visa `index.html`, `menu.json` och mapparna `_ds`, `scripts` och `uploads` direkt. Där ska inte finnas en extra mapp som heter `github-upload` eller `Family care coordination app`. Om filerna hamnade i en sådan mapp behöver du flytta upp dem till reponens rot.

### Steg 3: Skapa arbetsflödet för menyn

Dolda mappar som `.github` följer ofta inte med vid uppladdning. Skapa därför arbetsflödesfilen direkt på GitHub:

1. Tryck på **Add file** och välj **Create new file**.
2. Skriv exakt detta i namnfältet: `.github/workflows/update-menu.yml`. Snedstrecken skapar mapparna.
3. Klistra in hela texten nedan.
4. Tryck på **Commit changes** och sedan på **Commit changes** igen.

```yaml
name: Uppdatera matsedel
on:
  schedule:
    - cron: '0 5 * * 1,4'
  workflow_dispatch:
permissions:
  contents: write
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: node scripts/update-menu.mjs menu.json
      - name: Spara om något ändrats
        run: |
          git config user.name "menu-bot"
          git config user.email "menu-bot@users.noreply.github.com"
          git add menu.json
          git diff --cached --quiet || (git commit -m "Uppdaterad matsedel" && git push)
```

### Steg 4: Slå på webbplatsen

1. Öppna **Settings** och välj **Pages** i vänstermenyn.
2. Under **Build and deployment** väljer du **Deploy from a branch**.
3. Välj branch `main` och mapp `/ (root)`, och tryck på **Save**.
4. Efter 1–2 minuter visas webbplatsens adress högst upp. Öppna [https://haninshakrah.github.io/halasapp/](https://haninshakrah.github.io/halasapp/).

### Steg 5: Ge arbetsflödet skrivrätt och kör det

1. Öppna **Settings → Actions → General**.
2. Under **Workflow permissions** väljer du **Read and write permissions** och trycker på **Save**.
3. Gå till fliken **Actions**. Om GitHub frågar om att slå på arbetsflöden trycker du på den gröna knappen.
4. Välj **Uppdatera matsedel → Run workflow → Run workflow**.
5. En grön bock efter en stund betyder att arbetsflödet har fungerat.

> [!TIP]
> Om sidan inte syns: kontrollera att Pages-körningen under **Actions** är grön, att `index.html` ligger i reponens rot och ladda om sidan med **Ctrl+Skift+R**.

## 1. Vad finns i repon?

| Fil eller mapp | Vad den används till |
| --- | --- |
| `index.html` | Hela appen: familjeappen, skärmsläckaren och personalvyn. Det är den här filen du ändrar. |
| `menu.json` | Lunchmenyn. Filen skrivs över automatiskt – ändra den inte för hand. |
| `uploads/` | Bilder till albumen. |
| `scripts/update-menu.mjs` | Hämtar menyn från Malmö stads sida. |
| `.github/workflows/update-menu.yml` | Kör menyskriptet varje måndag och torsdag. |
| `support.js`, `ios-frame.jsx`, `_ds/` | Behövs för att appen ska visas. Ta inte bort dem. |

## 2. Små ändringar själv

Det här passar för ändringar av text, namn, kategorier och tider.

1. Öppna repon på GitHub och klicka på `index.html`.
2. Klicka på pennan (**Edit this file**) uppe till höger.
3. Klicka i texten och tryck **Ctrl+F** (eller **Cmd+F** på Mac). Sök efter det du vill ändra.
4. Ändra texten. Rör inte tecken som `,`, `<`, `>` eller citattecknen runt orden.
5. Tryck på **Commit changes**, skriv en kort beskrivning och tryck på **Commit changes** igen.
6. Vänta ungefär en minut och ladda om sidan utan cache: **Ctrl+Skift+R** (eller **Cmd+Skift+R** på Mac).

### Sökord för vanliga ändringar

| Sök efter | Ändrar |
| --- | --- |
| `FAMILY =` | Familjemedlemmarnas namn i vyn 4c. |
| `CATS =` | Kategorierna, till exempel Inköp, Hämta medicin och Övrigt. Varje rad har id, namn och exempeltext. |
| `TOS =` | Mottagarknapparna: Sjuksköterska, Kontaktperson och Annan. |
| `12000` | Hur ofta skärmsläckaren byter sida, i millisekunder. `12000` är 12 sekunder och `20000` är 20 sekunder. |
| `Fosieborgs` | Boendets namn. |
| `seedEntries` | Exempelposterna. Ta bort raderna för att starta med en tom lista. |

**Om något går fel:** öppna filen, välj **History** och leta upp en äldre version. Tryck på **⋯** och välj **Revert**, eller kopiera tillbaka innehållet från den äldre versionen.

## 3. Större ändringar med Claude

Använd det här arbetssättet för nya skärmar, ny layout, nya funktioner eller flera ändringar samtidigt.

1. Öppna projektet **Family care coordination app** i Claude.
2. Beskriv vad du vill ändra, helst en sak i taget. Exempel: ”Lägg till kategorin Frisör” eller ”Gör texten på skärmsläckaren större”.
3. Granska resultatet i förhandsvisningen och be om justeringar vid behov.
4. Be Claude: ”Skapa en ny `index.html` av senaste versionen”. Ladda ner filen.
5. Ersätt filen i repon: välj **Add file → Upload files**, dra in den nya `index.html` i reponens rot och tryck på **Commit changes**. Den gamla filen ersätts.
6. Vänta en minut och ladda om sidan utan cache.

> [!WARNING]
> Ändra inte både på GitHub och i Claude samtidigt. Den nya filen från Claude kan skriva över ändringarna på GitHub. Lägg i så fall in ändringen i Claude eller be Claude göra om den.

## 4. Bilder

1. Öppna mappen `uploads` i repon.
2. Välj **Add file → Upload files**, dra in bilderna och tryck på **Commit changes**.
3. Lägg till bilderna i bildlistan i `index.html` för att de ska visas. Be Claude lägga in dem, eller sök på `uploads/` och kopiera en befintlig rad.

- Använd bilder som är mindre än 500 kB.
- Undvik `å`, `ä` och `ö` i filnamnen.

> [!CAUTION]
> Repon är publik. Lägg inte upp privata eller känsliga bilder.

## 5. Lunchmenyn

- Menyn hämtas varje måndag och torsdag.
- Appen läser `menu.json` varje timme.
- Kör hämtningen direkt via **Actions → Uppdatera matsedel → Run workflow → Run workflow**.

**Om det blir fel:**

- **Rött kryss:** öppna körningen och läs felet. ”Hittade ingen meny” betyder att Malmö stad kan ha ändrat sin sida. Skicka felet till Claude.
- **”Permission denied”:** gå till **Settings → Actions → General → Workflow permissions**, välj **Read and write permissions** och spara.
- **Menyn ligger en vecka efter:** Malmö stad kan ha publicerat den nya menyn sent. Då visas den gamla menyn tills nästa uppdatering.

## 6. Ta appen i bruk

### Surfplattan på väggen

1. Öppna appens adress i surfplattans webbläsare.
2. **iPad:** välj **Dela → Lägg till på hemskärmen** och öppna appen därifrån för att dölja adressfältet.
3. **Android:** välj **Installera app** eller **Lägg till på startskärmen**.
4. Stäng av skärmlåset via **Inställningar → Skärm → Automatisk låsning → Aldrig** och låt surfplattan stå på laddning.
5. **iPad:** slå på Guidad åtkomst under Tillgänglighet så att ingen råkar lämna sidan. **Android:** använd en kioskapp, till exempel Fully Kiosk Browser.

Sidan visar själv tid och datum. Den byter sida var 12:e sekund och behöver inga tryck.

### Personalen

- Öppna samma adress och välj vyn **Personal** (4b).
- Skriv namn, välj kategori och mottagare och spara.
- Mottagaren trycker på **Kvittera**. Namn, dag och tid loggas på posten.
- Poster med datum i **Tid eller besök** och **Praktiskt** visas på skärmsläckaren.

### Familjen

- Öppna samma adress och välj vyn **Familj** (4c).
- Välj namn, kategori och mottagare.
- Familjen kan se om personalen har kvitterat och trycker själv på **Kvittera läst**.
- Kalendern är Halas Google-kalender. Alla som har länken kan lägga in tider.

## 7. Viktigt innan ni börjar använda appen

> [!IMPORTANT]
> Appen är i nuläget inte en gemensam eller inloggningsskyddad tjänst. Tänk på begränsningarna nedan innan den används i verksamheten.

- **Poster delas inte mellan enheter.** Det personalen skriver in syns bara i webbläsaren på enheten där det skrevs. Surfplattan, personalens telefoner och familjens telefoner får därför olika listor.
  - **Möjlig lösning:** koppla in en gemensam databas, till exempel Firebase eller Supabase. Be Claude om hjälp. Du behöver skapa ett gratis konto och klistra in en nyckel.
- **Ingen inloggning eller aviseringar.** Alla som har adressen kan läsa och skriva. Adressen är öppen på internet.
- **Känsliga uppgifter:** skriv inte personnummer, diagnoser eller medicinuppgifter i appen innan databas, inloggning och regler för personuppgifter finns på plats. Prata med boendet om vad som får registreras.
- **Inga albumuppladdningar från telefoner.** Bilder läggs in via repon.

## 8. Rekommenderad ordning

1. Skapa repon och lägg upp filerna (avsnitt 0).
2. Kontrollera att menyflödet fungerar och att `menu.json` uppdateras (avsnitt 0, steg 5, och avsnitt 5).
3. Ta bort exempelposterna (sök på `seedEntries`) och byt namn och bilder till era egna.
4. Prova flödet: skicka en post som familj i 4c, kvittera som personal i 4b och kontrollera loggen.
5. Ställ in surfplattan (avsnitt 6).
6. Be Claude koppla in en gemensam databas så att alla ser samma poster.
7. Be om inloggning och aviseringar när databasen fungerar.

## 9. Felsökning

| Problem | Kontrollera eller gör så här |
| --- | --- |
| Sidan visar gammalt innehåll | Ladda om utan cache (**Ctrl+Skift+R**). Kontrollera under **Actions** att **pages build and deployment** är grön. |
| Sidan är tom | Gå till **History** för `index.html` och återställ den senaste fungerande versionen. |
| Bilder saknas | Kontrollera att filen ligger i `uploads` och att namnet i bildlistan stämmer exakt, inklusive stora och små bokstäver. |
| Kalendern visar inloggning | I Google Kalender: öppna **Inställningar → Åtkomstbehörigheter** och slå på **Gör tillgänglig för allmänheten**. |
| Menyn visar ”Exempeldata” | Kontrollera att `menu.json` ligger i reponens rot och kör menyflödet. |
| Kvittera gör inget | Skriv ditt namn i namnfältet först. |
