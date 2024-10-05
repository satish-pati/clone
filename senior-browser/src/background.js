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
  
