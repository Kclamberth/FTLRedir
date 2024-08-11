browser.webRequest.onBeforeRequest.addListener(
  async (requestDetails) => {
    if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(requestDetails.url)) {
      const redirectUrl = `freetube://${requestDetails.url}`;

      let { firstTimeRedirect } = await browser.storage.local.get('firstTimeRedirect');

      if (firstTimeRedirect === undefined) {
        firstTimeRedirect = true; 
      }

      const delay = firstTimeRedirect ? 10000 : 1000; 

      setTimeout(() => {
        browser.tabs.remove(requestDetails.tabId).catch((error) => {
          console.error('Failed to remove tab:', error);
        });
      }, delay);

      if (firstTimeRedirect) {
        await browser.storage.local.set({ firstTimeRedirect: false });
      }

      return { redirectUrl };
    }
  },
  { urls: ["*://*.youtube.com/*", "*://*.youtu.be/*"] },
  ["blocking"]
);

