document.addEventListener('DOMContentLoaded', () => {
    browser.storage.local.get('closeDelay').then(data => {
        if (data.closeDelay) {
            const timerValue = data.closeDelay / 1000;  
            document.getElementById('timer').value = timerValue;
        }
    }, error => {
        console.error(`Error fetching storage data: ${error}`);
    });
});

document.getElementById('save').addEventListener('click', () => {
    const timerValue = document.getElementById('timer').value;
    browser.storage.local.set({closeDelay: timerValue * 1000}).then(() => {
	window.close();
    });
});

