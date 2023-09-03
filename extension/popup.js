document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("mySwitch");

  button.addEventListener("click", function() {
    // Send a message to the background script
    chrome.runtime.sendMessage({ action: "performAction" }, function(response) {
      console.log(response.message);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const inputField = document.getElementById('token');
  const submitButton = document.getElementById('submitButton');
  const feedbackContainer = document.getElementById('feedback');

  submitButton.addEventListener('click', function() {
      const value = inputField.value;
      
      // Sending the value to background.js
      chrome.runtime.sendMessage({type: "inputValueChanged", value: value});

      // Provide feedback to the user
      feedbackContainer.innerHTML = '<span>Submitted!</span>'; // or you can use an icon here
  });
});