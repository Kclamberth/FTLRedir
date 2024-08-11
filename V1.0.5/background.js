browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/.test(changeInfo.url)) {

        const redirectUrl = `freetube://${changeInfo.url}`;
	    
        browser.tabs.update(tabId, { url: redirectUrl }).then(() => {
            browser.storage.local.get('closeDelay').then(data => {
                const delay = data.closeDelay || 5000; // Default Time 5 Sec
                setTimeout(() => {
                    browser.tabs.remove(tabId).catch(error => {
                        console.error('Failed to remove tab:', error);
                    });
                }, delay);
            });
        });
    }
});

