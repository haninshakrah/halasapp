# halasapp
Jag har gjort en nedladdningsbar mapp, github-upload, med rätt filer och uppdaterat manualen med ett nytt avsnitt 0, "Börja från noll". Jag har inte testat uppladdningen eller sett manualen i förhandsvisningen.  Kort version  Skapa en ny publik repo som heter halasapp. Kryssa i Add a README file. 

#Manual
Halas vård och omsorgsapp
Så ändrar du appen och tar den i bruk. Adress: haninshakrah.github.io/halasapp · Repo: github.com/haninshakrah/halasapp
0. Börja från noll: ny repo i 5 steg
Du behöver mappen github-upload (ladda ner den från Claude och packa upp den). Den innehåller allt utom arbetsflödesfilen, som du skapar direkt på GitHub i steg 3.

#Steg 1. Skapa repon
Gå till github.com, tryck + uppe till höger och välj New repository.
Namn: halasapp. Välj Public. Kryssa i Add a README file så att repon inte är tom. Tryck Create repository.

#Steg 2. Ladda upp filerna
I repon, tryck Add file och Upload files.
Öppna mappen github-upload på din dator. Markera allt som ligger inuti den (index.html, menu.json, support.js, ios-frame.jsx, _ds, uploads, scripts). Dra det hela in i webbläsaren. Dra inte själva mappen github-upload.
Använd Chrome eller Edge, de kan ta emot mappar. Vänta tills alla filer är uppladdade (de är ungefär 30 stycken).
Tryck Commit changes längst ned.
Kontrollera: startsidan ska visa index.html, menu.json och mapparna _ds, scripts och uploads direkt, utan någon mapp som heter github-upload eller Family care coordination app. Är det fel, radera repon och börja om.

#Steg 3. Skapa arbetsflödet (för menyn)
Dolda mappar som .github följer ofta inte med vid uppladdning, så den här filen skapas på GitHub.

Tryck Add file och Create new file.
Skriv i namnfältet exakt: .github/workflows/update-menu.yml (snedstrecken skapar mapparna).
Klistra in texten nedan, tryck Commit changes och sedan Commit changes igen.
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

#Steg 4. Slå på webbplatsen
Settings, sedan Pages i vänstermenyn.
Under Build and deployment: välj Deploy from a branch, branch main, mapp / (root). Tryck Save.
Efter 1–2 minuter visas adressen högst upp: https://haninshakrah.github.io/halasapp/. Öppna den.

#Steg 5. Ge arbetsflödet skrivrätt och kör det
Settings, Actions, General. Under Workflow permissions välj Read and write permissions och tryck Save.
Gå till fliken Actions. Tryck på den gröna knappen om GitHub frågar om att slå på arbetsflöden.
Välj Uppdatera matsedel, Run workflow, Run workflow. Grön bock efter en stund betyder att det fungerar.
Om sidan inte syns: kontrollera att Pages-körningen under Actions är grön, att index.html ligger i roten och ladda om med Ctrl+Skift+R.

1. Vad finns i repon
index.html
Hela appen: familjeappen, skärmsläckaren, personalvyn. Det är den här filen du ändrar.
menu.json
Lunchmenyn. Skrivs över automatiskt, ändra inte för hand.
uploads/
Bilder till albumen.
scripts/update-menu.mjs
Hämtar menyn från Malmö stads sida.
.github/workflows/update-menu.yml
Kör skriptet varje måndag och torsdag.
support.js, ios-frame.jsx, _ds/
Krävs för att appen ska visas. Ta inte bort.
2. Små ändringar själv
Gäller text, namn, kategorier och tider.

Öppna repon på github.com och klicka på index.html.
Klicka på pennan (Edit this file) uppe till höger.
Klicka i texten och tryck Ctrl+F (Cmd+F på Mac). Sök på det du vill ändra.
Ändra texten. Rör inte tecken som , < > eller citattecken runt orden.
Tryck Commit changes, skriv en kort beskrivning och tryck Commit changes igen.
Vänta ungefär en minut. Ladda om sidan med Ctrl+Skift+R (Cmd+Skift+R).
Sökord för vanliga ändringar
FAMILY =
Familjemedlemmarnas namn i 4c.
CATS =
Kategorierna (Inköp, Hämta medicin, Övrigt med flera). Varje rad har id, namn och exempeltext.
TOS =
Mottagarknapparna: Sjuksköterska, Kontaktperson, Annan.
12000
Hur ofta skärmsläckaren byter sida, i millisekunder. 12000 är 12 sekunder, 20000 är 20 sekunder.
Fosieborgs
Boendets namn.
seedEntries
Exempelposterna. Radera raderna för att starta med en tom lista.
Gick något fel: öppna filen, välj History och sedan en äldre version. Tryck ⋯ och Revert eller kopiera tillbaka innehållet.

#3. Större ändringar med Claude
Gäller nya skärmar, ny layout, nya funktioner eller flera ändringar samtidigt.

Öppna projektet Family care coordination app i Claude.
Skriv vad du vill ha ändrat, helst en sak i taget. Exempel: "Lägg till kategorin Frisör" eller "Gör texten på skärmsläckaren större".
Granska resultatet i förhandsvisningen. Säg till om något ska justeras.
Be Claude: "Skapa en ny index.html av senaste versionen". Ladda ner filen.
Ersätt filen i repon: öppna repon, välj Add file, Upload files, dra in den nya index.html i roten och tryck Commit changes. Den gamla filen ersätts.
Vänta en minut och ladda om sidan utan cache.
Gör inte ändringar både på GitHub och i Claude samtidigt. Då skriver den nya filen över dina ändringar på GitHub. Lägg i så fall in ändringen i Claude, eller be Claude om den på nytt.

#4. Bilder
Öppna mappen uploads i repon. Välj Add file, Upload files, dra in bilderna och tryck Commit changes.
Bilderna visas först när de finns i bildlistan i index.html. Be Claude lägga in dem, eller sök på uploads/ och kopiera en befintlig rad.
Använd bilder under 500 kB och undvik å, ä och ö i filnamnen.
Repon är publik. Lägg inte upp privata eller känsliga bilder.

#5. Lunchmenyn
Menyn hämtas varje måndag och torsdag. Appen läser menu.json varje timme.
Kör den direkt: Actions, Uppdatera matsedel, Run workflow, Run workflow.
Rött kryss: öppna körningen och läs felet. "Hittade ingen meny" betyder att Malmö stad ändrat sin sida. Skicka felet till Claude.
Står det "Permission denied": Settings, Actions, General, Workflow permissions, välj Read and write permissions och spara.
Menyn är en vecka bakom när Malmö stad publicerar sent. Då syns den gamla menyn.

#6. Ta appen i bruk
Surfplattan på väggen
Öppna adressen i surfplattans webbläsare.
iPad: välj Dela, Lägg till på hemskärmen och öppna därifrån, så försvinner adressfältet. Android: välj Installera app eller Lägg till på startskärmen.
Slå av skärmlåset: Inställningar, Skärm, Automatisk låsning på Aldrig. Sätt surfplattan på laddning.
iPad: slå på Guidad åtkomst (Tillgänglighet) så att ingen kan lämna sidan av misstag. Android: använd en kioskapp, till exempel Fully Kiosk Browser.
Sidan visar tid och datum själv. Den byter sida var 12:e sekund och behöver inga tryck.
Personalen
Samma adress, vyn "Personal" (4b). Skriv namn, välj kategori och mottagare, och spara.
Den som tar emot trycker Kvittera. Namn, dag och tid loggas på posten.
Poster med datum i Tid eller besök och Praktiskt visas på skärmsläckaren.
Familjen
Samma adress, vyn "Familj" (4c). Välj namn, kategori och mottagare.
Familjen ser om personalen kvitterat och trycker själv "Kvittera läst".
Kalendern är Halas Google-kalender. Alla med länken kan lägga in tider.

#7. Att veta innan ni börjar använda den på riktigt
Poster delas inte mellan enheter. Det som personalen skriver in syns bara i webbläsaren på den enhet där det skrevs. Surfplattan, personalens telefoner och familjens telefoner ser alltså olika listor. Kvittenserna och loggen gäller på samma sätt bara på den enheten.
Lösning: Koppla in en gemensam databas, till exempel Firebase eller Supabase. Be Claude om det. Du behöver då skapa ett gratis konto och klistra in en nyckel.
Ingen inloggning och inga aviseringar. Alla som har adressen kan läsa och skriva. Adressen är öppen på internet.
Känsliga uppgifter. Skriv inte personnummer, diagnoser eller medicinuppgifter i appen innan databas, inloggning och regler för personuppgifter finns på plats. Prata med boendet om vad som får registreras.
Inga albumuppladdningar från telefoner. Bilder läggs in via repon.

#8. Rekommenderad ordning
Skapa repon och lägg upp filerna (avsnitt 0).
Kontrollera att menyflödet fungerar och att menu.json uppdateras (avsnitt 0, steg 5 och avsnitt 5).
Ta bort exempelposterna (sök på seedEntries) och byt namn och bilder till era egna.
Prova flödet själv: skicka som familj i 4c, kvittera som personal i 4b och kontrollera loggen.
Ställ in surfplattan (avsnitt 6).
Be Claude koppla in en gemensam databas, så att alla ser samma poster.
Be om inloggning och aviseringar när databasen fungerar.

#9. Felsökning
Sidan visar gammalt innehåll
Ladda om utan cache (Ctrl+Skift+R). Kontrollera under Actions att "pages build and deployment" är grön.
Sidan är tom
Gå till History för index.html och återställ senaste fungerande version.
Bilder saknas
Kontrollera att filen ligger i uploads och att namnet i listan stämmer exakt, inklusive stor och liten bokstav.
Kalendern visar inloggning
I Google Kalender: Inställningar, Åtkomstbehörigheter, slå på "Gör tillgänglig för allmänheten".
Menyn visar "Exempeldata"
Kontrollera att menu.json ligger i roten av repon och kör menyflödet.
Kvittera gör inget
Skriv ditt namn i namnfältet först.
