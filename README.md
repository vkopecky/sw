# SWIDA Playwright E2E Test Suite

## Run Instructions

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Spustite testy:
   ```powershell
   npx playwright test
   ```
3. Pre spustenie v headed móde:
   ```powershell
   npx playwright test --headed
   ```
4. Pre zobrazenie trace:
   ```powershell
   npx playwright show-trace test-results/failed-setup-trace.zip
   ```

## Credentials
Použite vlastný testovací účet. Príklad:
- Email: kopecky.vlado@gmail.com
- Heslo: 159357aA

## Testy pokrývajú:
- Happy path: Vytvorenie Transport Request
- Negatívny scenár: Validácia povinných polí
- UX/Resilience: Disabled stav tlačidla, error message, prevencia duplicitného submitu

## Poznámky
- Nepoužívajte produkčné prostredie.
- Nepoužívajte hardcoded credentials v kóde, použite .env.
- V prípade bugov ich popíšte v README.

## bugy

-datum po vpisovani rucne sa buguje, 
-note ide vyplnit nekonecne dlhe a posuva cele CSS
-pickup point a deliveri point , ma sa vyberat v pripade, ze sa vyplna prva cast fomularu ?
