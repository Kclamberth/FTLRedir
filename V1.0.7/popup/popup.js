document.addEventListener('DOMContentLoaded', () => {
    browser.storage.local.get(['closeDelay', 'redirectEnabled']).then(data => {
        if (data.closeDelay) {
            const timerValue = data.closeDelay / 1000;
            document.getElementById('timer').value = timerValue;
        }

	// default is true
        document.getElementById('toggleRedirect').checked = data.redirectEnabled !== false;  
    }, error => {
        console.error(`Error fetching storage data: ${error}`);
    });

});

document.getElementById('save').addEventListener('click', () => {
    const timerValue = document.getElementById('timer').value;
    const redirectEnabled = document.getElementById('toggleRedirect').checked;

    browser.storage.local.set({
        closeDelay: timerValue * 1000,
        redirectEnabled: redirectEnabled
    }).then(() => {
	window.close();
    });
});

