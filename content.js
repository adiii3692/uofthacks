// Function to apply or remove the blur effect based on the state and blur value
function applyBlur(isBlurred, blurValue) {
  const body = document.body;
  body.style.transition = 'filter 5s ease-in-out'; // 0.5s transition duration
  if (isBlurred) {
    // Apply blur filter to the body element
    body.style.filter = `blur(${blurValue}px)`;
  } else {
    // Remove blur filter from the body element
    body.style.filter = 'none';
  }
}

// Listen for messages from the background script to apply or remove blur
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'applyBlur') {
    // Apply or remove the blur based on the passed message
    applyBlur(message.isBlurred, message.blurValue);
  }
});
