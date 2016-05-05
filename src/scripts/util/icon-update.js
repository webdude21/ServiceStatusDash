let storage = require('../services/storage');
const FAIL_ICON = '../img/icons/fail48.png',
  SUCCESS_ICON = '../img/icons/success48.png',
  OK_ICON = '../img/icons/ok48.png';

/**
 * Updates the action icon based on the services statuses
 * @param {Service} selectedServices
 */
function updateIcon({ selectedServices }) {
  let icon = FAIL_ICON;

  if (selectedServices.every(service => service.working)) {
    icon = SUCCESS_ICON;
  } else if (selectedServices.some(service => service.working)) {
    icon = OK_ICON;
  }

  chrome.browserAction.setIcon({ path: icon });
}

module.exports = () => storage.loadOptions().then(updateIcon);
