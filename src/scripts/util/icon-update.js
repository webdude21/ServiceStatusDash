let storage = require('../services/storage');
/**
 * Updates the action icon based on the services statuses
 * @param {Service} selectedServices
 */
function updateIcon({ selectedServices }) {
  let iconPath = 'img/icons/fail48.png';

  if (selectedServices.every(service => service.working)) {
    iconPath = 'img/icon/success48.png';
  } else if (selectedServices.some(service => service.working)) {
    iconPath = 'img/icon/ok48.png';
  }

  chrome.browserAction.setIcon({ path: iconPath });
}

module.exports = () => storage.loadOptions().then(updateIcon);
