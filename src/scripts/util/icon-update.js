const FAIL_ICON = '../img/icons/fail48.png',
  SUCCESS_ICON = '../img/icons/success48.png',
  OK_ICON = '../img/icons/ok48.png';

module.exports = function (selectedServices) {
  let icon = FAIL_ICON;

  if (selectedServices.every(service => service.working)) {
    icon = SUCCESS_ICON;
  } else if (selectedServices.some(service => service.working)) {
    icon = OK_ICON;
  }

  chrome.browserAction.setIcon({ path: icon });
};
