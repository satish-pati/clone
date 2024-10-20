chrome.runtime.onInstalled.addListener(() => {
    console.log('insatlled');
});//just wrote for debugging 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['dist/content.bundle.js']
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
  // background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'translatePage') {
      chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: triggerGoogleTranslate
      });
  }
});
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ language: 'en' }); // Default language is English
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setLanguage') {
    chrome.storage.sync.set({ language: request.language });
    sendResponse({ status: 'success' });
  }
});
