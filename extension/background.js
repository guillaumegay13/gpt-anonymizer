chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'fetchData') {
    fetch(request.url, request.options)
      .then(response => response.json())
      .then(data => sendResponse({ data: data }))
      .catch(error => sendResponse({ error: error }));
    return true;  // Will respond asynchronously.
  }
});

/*

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "getMap") {
      // Process the request and send a response
      const mapArray = Array.from(personMappingListProxy);
      sendResponse(mapArray);
      return true; // Enable asynchronous response
    }
  });

  */

// `active` is a boolean indicating whether the extension is active
let currentActiveStatus = true;
let currentIsTyping = false;

// Listen for a message from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === "updateActiveStatus" && request.value !== undefined) {
    if (request.value != currentActiveStatus) {
      updateIcon(request.value);
      currentActiveStatus = request.value;
      sendResponse({ message: "Action performed in background script" });
      return true;
    }
  }

  if (request.action === "isTyping") {
    currentIsTyping = request.value;
    if (currentIsTyping) {
      console.log("Setting active icon");
      chrome.action.setIcon({ path: 'images/icon128.png' });
      chrome.action.setBadgeBackgroundColor({ color: [70, 136, 241, 255] }); // Active badge color
      chrome.action.setBadgeText({text: '...'}); // Active badge text
      console.log("Active icon set");
    } else {
      updateIcon(currentActiveStatus);
    }
    sendResponse({ message: "Action performed in background script" });
    return true;
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  if (request.action === "performAction") {
    // Manual change
    // Perform the desired action in the background script
    console.log("Action triggered in background script");
    currentActiveStatus = !currentActiveStatus;
    updateIcon(currentActiveStatus);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "updateActiveStatus", value: currentActiveStatus }, function (response) { });
    });

    // Send a response back to the popup script (optional)
    sendResponse({ message: "Action performed in background script" });
    return true;
  }
});


// `active` is a boolean indicating whether the extension is active
function updateIcon(currentActiveStatus) {
  if (currentActiveStatus) {
    console.log("Setting active icon");
    chrome.action.setIcon({ path: 'images/icon128.png' });
    chrome.action.setBadgeBackgroundColor({ color: [70, 136, 241, 255] }); // Active badge color
    chrome.action.setBadgeText({ text: 'ON' }); // Active badge text
    console.log("Active icon set");
  } else {
    console.log("Setting inactive icon");
    chrome.action.setIcon({ path: 'images/icon-inactive-128.png' });
    chrome.action.setBadgeBackgroundColor({ color: [211, 211, 211, 255] }); // Inactive badge color
    chrome.action.setBadgeText({ text: 'OFF' }); // Inactive badge text
  }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "inputValueChanged") {
      // Forward the message to the content script of the current tab
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          const currentTab = tabs[0];
          chrome.tabs.sendMessage(currentTab.id, {type: "inputValue", value: message.value});
      });
  }
});