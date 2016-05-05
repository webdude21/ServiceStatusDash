let update = require('../services/update-status');
const updateFrequency = 1000 * 60; // one minute

function updateForever() {
  update();
  setTimeout(updateForever, updateFrequency);
}

chrome.runtime.onStartup.addListener(updateForever);
