document.addEventListener('DOMContentLoaded', () => {
    browser.storage.local.get(['closeDelay', 'redirectEnabled']).then(data => {
        if (typeof data.closeDelay !== 'undefined') {
            const timerValue = data.closeDelay / 1000;
            document.getElementById('timer').value = timerValue;
        } else {
	    // default timer = 5 sec
	    document.getElementById('timer').value = 5;
	}

	// default = true
        document.getElementById('toggleRedirect').checked = data.redirectEnabled !== false;  
    });

    document.getElementById('timer').addEventListener('input', saveSettings);
    document.getElementById('toggleRedirect').addEventListener('change', saveSettings);
});

function saveSettings() {
    const timerValue = parseInt(document.getElementById('timer').value, 10);
    const redirectEnabled = document.getElementById('toggleRedirect').checked;

    browser.storage.local.set({
        closeDelay: timerValue * 1000,
        redirectEnabled: redirectEnabled
    });
}

