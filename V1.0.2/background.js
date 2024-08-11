browser.webRequest.onBeforeRequest.addListener(
  (requestDetails) => {
    if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(requestDetails.url)) {
      const redirectUrl = `freetube://${requestDetails.url}`;

      setTimeout(() => {
        browser.tabs.remove(requestDetails.tabId).catch((error) => {
          console.error('Failed to remove tab:', error);
        });
      }, 1000); 

      return { redirectUrl };
    }
  },
  { urls: ["*://*.youtube.com/*", "*://*.youtu.be/*"] },
  ["blocking"]
);

