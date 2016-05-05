const updateFrequency = 1000 * 60; // one minute

function updateForever() {
  setTimeout(updateForever, updateFrequency);
}

chrome.runtime.onStartup.addListener(updateForever);
