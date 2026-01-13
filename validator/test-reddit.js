const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log("Navigating to Reddit...");
  // 1. Inject the "Janitor" script before the page loads
  await page.addInitScript(() => {
    // 1. Only run in the top-level window (ignores iframes like reCAPTCHA)
    if (window.self !== window.top) return;

    const startObserver = () => {
      const targetNode = document.documentElement;

      // 2. Safety check: If the DOM isn't ready yet, wait and try again
      if (!targetNode) {
        window.requestAnimationFrame(startObserver);
        return;
      }

      const selector = "shreddit-ad-post";
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              if (node.matches(selector)) node.remove();
              node.querySelectorAll(selector).forEach((el) => el.remove());
            }
          });
        }
      });

      observer.observe(targetNode, {
        childList: true,
        subtree: true,
      });

      console.log("Janitor script successfully attached to documentElement.");
    };

    startObserver();
  });

  // 2. Navigate to the site
  await page.goto("https://www.reddit.com/r/all");

  // Now, as you scroll, ads will be deleted from the DOM instantly.
})();
