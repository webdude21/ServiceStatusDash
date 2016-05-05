// let statusUpdate = require('../services/update-status');
const updateFrequency = 1000 * 60; // one minute

function updateForever() {
  console.info('Service updated');
  setTimeout(updateForever, updateFrequency);
}

chrome.runtime.onStartup.addListener(updateForever);
