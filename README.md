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
- Pred spustenim testou je potrebne spustit 000-login.spec.ts aby sa vygeneroval login session / ( mal by byt v global setupe aby sa spustil pred vsetkymi testami )

## bugy

## Known Issues / Observations

| Feature / Field | Expected Behavior | Actual Behavior |
|-----------------|-----------------|----------------|
| **Date input fields** | Should allow manual entry without being overwritten. | Manually typed dates are overwritten automatically; only selectable via calendar. |
| **Field character limits** | Fields should have character limits and not break layout when exceeded. | Fields have no character limit; entering long text shifts the entire layout (CSS affected). |
| **Error handling in fields** | Validation should occur “live” upon field change or blur. | Errors are displayed only after clicking "Continue"; no live validation. |
| **Cargo detail section** | `Value`, `Max Length`, and `Unit Weight` should not accept negative numbers. | Negative values are allowed and not blocked. |
| **Street & Number / ZIP in route waypoints** | Changes should reflect in the left-side route waypoints section. | Values do not update in specific cases in the left-side section. |

