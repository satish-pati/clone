chrome.runtime.onInstalled.addListener(() => {
    console.log('insatlled');
});//just wrote for debugging 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['src/content.js']
        }).catch(error => {
          console.log('error');
        });
    }
});
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'readContent') {
      chrome.tts.speak(request.text, { rate: 1.0, pitch: 1.0, volume: 1.0 });
    }
  });
  // Listen for messages from popup.html or content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openLanguagePopup') {
      // Open the popup when the language button is clicked
      chrome.action.openPopup();
      sendResponse({ status: 'Popup opened' });
  }

  if (request.action === 'translatePage') {
      // Forward the translation request to the active tab (web page)
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'translatePage',
              languageCode: request.languageCode
          });
      });
      sendResponse({ status: 'Translation requested' });
  }
});
