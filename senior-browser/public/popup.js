document.getElementById('translateButton').addEventListener('click', () => {
    const languageCode = document.getElementById('languageSelect').value;
    // Send message to background.js or content.js to trigger translation
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'translatePage', languageCode: languageCode });
    });
});
