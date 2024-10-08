browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(changeInfo.url)) {
        browser.storage.local.get(['redirectEnabled', 'closeDelay', 'initialLaunch']).then(data => {

            if (data.redirectEnabled !== false) {  
                const redirectUrl = `freetube://${changeInfo.url}`;

                browser.tabs.update(tabId, { url: redirectUrl }).then(() => {
                    if (typeof data.initialLaunch === 'undefined') {
                        browser.storage.local.set({ initialLaunch: false });

                    } else {
                        const delay = data.closeDelay !== undefined && data.closeDelay !== null ? data.closeDelay : 5000;
                        if (delay > 0) {
                            setTimeout(() => {
                                browser.tabs.remove(tabId).catch(error => {
                                    console.error('Failed to remove tab:', error);
                                });
                            }, delay);
                        }
                    }
                });
            }
        });
    }
});

