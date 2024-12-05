# ASOS E-shop projekt - Frontend
Tento repozitár obsahuje kód pre Frontendovú časť projektu na predmet ASOS v 2. ročníku API na FEI STU.  
Frontend je naprogramovaný v knižnici React použitím nástroja Vite. Celý projekt je dockerizovaný.

Projektom je webová aplikácia e-shop. Pre správne fungovanie je potrebné mať spustenú aj Backendovú časť aplikácie, 
ktorú nájdete tu: https://github.com/ASOS-Semestralny-projekt/Back-end.git.

Aplikácia poskytuje základné funkcionality bežného e-shopu. Používateľ si môže prezerať všetky produkty, ktoré máme v
ponuke. Produkty si tiež môže pozerať podľa dostupných kategórii, prípadne vyhľadať podľa kľúčového slova. Každý produkt
má aj svoju samotatnú stránku s detailným popisom. Používateľ si môže produkty vkladať do košíku, následne ľubovoľne 
pridávať, resp. uberať množstvo a neskôr aj vykonať objednávku. 

Aplikácia ponúka možnosť registrácie. Ak už je používateľ registrovaný, môže sa do svojho účtu prihlásiť. Prihlásený 
používateľ si vie v aplikácii pozrieť históriu svojich objednávok, pričom ku každej nájde dátum vytvorenia, číslo 
objednávky, celkovú sumu a jednotlivé produkty objednávky. 

Okrem toho, prihlásený používateľ si môže vo svojom profile zmeniť osobné údaje (okrem emailovej adresy), ktorými sa 
registroval. Taktiež má možnosť zmeny hesla, pričom však musí poznať svoje aktuálne heslo. 

Neprihlásený používateľ nemá v aplikácii možnosť vidieť históriu svojich objednávok a ani nemá prístup k zmene údajov či 
zmene hesla. 

Každý používateľ má možnosť vytvoriť objednávku z našich tovarov. Ikona košíku sa nachádza v hornom menu a zobrazí sa po
pridaní aspoň jedného tovaru do košíku. V prvom kroku procesu objednávky je používateľovi prehľadne zobrazený obsah košíku
aj s celkovou sumou. V druhom kroku používateľ zadá svoje údaje. Ak je používateľ prihlásený, tak sa mu tieto údaje 
automaticky predvyplnia, môže si ich však ľubovolne zmeniť. Ak používateľ nie je prihlásený, tak musí tieto údaje vyplniť.
V treťom kroku si používateľ môže pozrieť súhrn objednávky, teda všetky produkty, ich množstvá a celkovú sumu. Okrem toho
si tiež môže skontrolovať svoje údaje. Ak je spokojný, môže objednávku odoslať. Ak nie, môže sa vrátiť na niektorý z 
predošlých krokov a upraviť čo potrebuje. Po odoslaní objednávky za zobrazí hláška o odoslaní objednávky a následne
je používateľ presmerovaný na domovskú stránku.

## Návod na lokálne spustenie
1. Stihnite si a nainštalujte Node.js https://nodejs.org/en/download/prebuilt-installer.
2. Naklonujte si zdrojový kód pomocou príkazu:
```bash
   git clone https://github.com/ASOS-Semestralny-projekt/Front-end.git`
```
3. Prejdite do domovského adresára projetku:
 ```bash
   cd cesta_k_priečinku/Frontend
```
4. Nainštalujte dependencie projektu:
```bash
   npm install
```
5. Spustite aplikáciu pomocou príkazu
```bash
   npm run dev
```
6. V prehliadači otvorte aplikáciu na adrese http://localhost:3000/


## Návod na sputenie v Dockeri
1. Otvorte si aplikáciu Docker v počítači
2. Naklonujte si zdrojový kód pomocou príkazu:
```bash
   git clone https://github.com/ASOS-Semestralny-projekt/Front-end.git`
```
3. Prejdite do domovského adresára projetku:
 ```bash
   cd cesta_k_priečinku/Frontend
```
4. Vytvorte Docker kontajner aplikácie pomocou príkazu
```bash
   docker-compose up --build
```
5. V prehliadači otvorte aplikáciu na adrese http://localhost:3000/