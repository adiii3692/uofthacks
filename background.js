let timer_state = null;

function makeBlur(tabId, url) {
  if (url && !url.startsWith("chrome://") && !url.startsWith("edge://")) {
    // Check if the tab is already blurred
    chrome.storage.local.get([`tab-${tabId}`], (result) => {
      let isBlurred = result[`tab-${tabId}`] || false;

      // Toggle the blur state
      isBlurred = !isBlurred;

      // Generate a random blur value between 6px and 12px
      const blurValue = getRandomBlurValue(6, 12);
      console.log(`blur: ${blurValue}`)
      // Execute script to apply/remove blur based on the state and pass the blur value
      chrome.scripting.executeScript({
        target: { tabId },
        func: applyBlur,  // This function will be defined below
        args: [isBlurred, blurValue] // Pass both blur state and blur value to the content script
      });

      // Save the new blur state
      chrome.storage.local.set({ [`tab-${tabId}`]: isBlurred });

      // Schedule the next blur/unblur action
      scheduleNextBlur(tabId, url);
    });
  }
}

// Function to generate a random blur value between min and max
function getRandomBlurValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Random value between min and max
}

// Function to apply/remove blur based on the passed state and blur value
function applyBlur(isBlurred, blurValue) {
  const body = document.body;
  body.style.transition = 'filter 3.5s ease-in-out'; // 3.5s transition duration
  if (isBlurred) {
    body.style.filter = `blur(${blurValue}px)`; // Apply random blur
  } else {
    body.style.filter = 'none'; // Remove blur
  }
}

// Clear stored data when tab is removed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove(`tab-${tabId}`);
});

// Random time interval generation function (between 5 to 20 seconds)
function makeTime() {
  const rand_array = new Uint32Array(1); // Array with 1 element
  crypto.getRandomValues(rand_array); // Fill with a random value
  const rand_num = rand_array[0] / (2 ** 32); // Normalize between 0 and 1
  const minTime = 5000;  // 5 seconds in ms
  const maxTime = 12000; // 20 seconds in ms
  return Math.floor(rand_num * (maxTime - minTime + 1) + minTime); // Random time between 5000ms and 20000ms
}

// Schedule the next blur/unblur action
function scheduleNextBlur(tabId, url) {
  const randomDelay = makeTime(); // Get a random delay
  console.log(`delay: ${randomDelay}`)
  setTimeout(() => {
    makeBlur(tabId, url); // Call makeBlur again after the random delay
  }, randomDelay);
}

// Handle the action button click to start and stop the blur timer
chrome.action.onClicked.addListener((tab) => {
  if (timer_state) {
    // If the timer is already running, stop it
    clearTimeout(timer_state);
    timer_state = null;
    console.log("Blur stopped.");
  } else {
    // Otherwise, apply the blur and start the timer
    makeBlur(tab.id, tab.url); // Apply blur on first click
    timer_state = setTimeout(() => {
      makeBlur(tab.id, tab.url); // Apply blur/unblur after a random delay
    }, makeTime());
    console.log("Blur started.");
  }
});
