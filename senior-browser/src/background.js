//import { MongoClient } from 'mongodb'; 
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isLoggedIn: false });
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
  chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  });

  /*
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "searchVideos") {
        const sampleVideos = [
            { title: "How to Use Chrome Extensions", url: chrome.runtime.getURL("videos/video2.mp4") }
        ];

        const filteredVideos = sampleVideos.filter(video =>
            video.title.toLowerCase().includes(message.query.toLowerCase())
        );

        sendResponse({ videos: filteredVideos });
    }
    return true;
});
*/
