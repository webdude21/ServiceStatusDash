let update = require('../services/update-status'),
  createAlarm = () => chrome.alarms.create('updateAlarm', { periodInMinutes: 1 });

chrome.runtime.onStartup.addListener(createAlarm);
chrome.runtime.onInstalled.addListener(createAlarm);
chrome.alarms.onAlarm.addListener(update);
