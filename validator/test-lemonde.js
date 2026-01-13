const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Navigate to the site
  await page.goto("https://www.lemonde.fr", { waitUntil: "domcontentloaded" });

  // 2. Simulate the cosmetic filter: lemonde.fr##.gdpr-lmd-wall
  // We inject a style tag to ensure it stays hidden even if the DOM updates
  await page.addStyleTag({
    content: `
      .gdpr-lmd-wall {
        display: none !important;
      }
      /* Often needed to restore scrolling once the wall is 'gone' */
      html, body {
        overflow: auto !important;
        position: static !important;
      }
    `,
  });

  // Optional: Take a screenshot to verify
  await page.screenshot({ path: "lemonde-no-wall.png" });

  console.log("Cosmetic filter applied and scroll restored.");

  // Keep browser open for a moment to inspect
  // await browser.close();
})();
