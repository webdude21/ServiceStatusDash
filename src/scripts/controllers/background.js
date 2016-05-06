let update = require('../services/update-status');

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create('updateAlarm', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener(update);
