function makeBlur(){
  chrome.action.onClicked.addListener((tab) => {
  if (tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
    // Check current blur state for the tab
    chrome.storage.local.get([`tab-${tab.id}`], (result) => {
      const isBlurred = result[`tab-${tab.id}`] || false;

      // Toggle the blur state
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });

      // Update the blur state
      chrome.storage.local.set({ [`tab-${tab.id}`]: !isBlurred });
    });
  } else {
    console.error("Cannot inject script into this page.");
  }
})};

// Clear stored state when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove(`tab-${tabId}`);
});

function setTimer(){
  // const randomDelay = Math.random()*(20000-5000)+5000;
  makeBlur();
  setTimeout(setTimer, 3)
}

chrome.action.onClicked.addListener((tab) => {
  if (tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
    setTimer()
  }
});
