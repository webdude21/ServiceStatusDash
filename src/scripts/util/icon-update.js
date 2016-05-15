const FAIL_ICON = '../img/icons/fail48.png',
  SUCCESS_ICON = '../img/icons/success48.png',
  OK_ICON = '../img/icons/ok48.png',
  BLUE = [0, 170, 0, 200];

let drawServiceCounter = function (services) {
  let workingServicesCount = services.filter(s => s.working).length,
    allServicesCount = services.length,
    iconText = '';

  chrome.browserAction.setBadgeBackgroundColor({ color: BLUE });

  if (allServicesCount !== workingServicesCount) {
    iconText = `${workingServicesCount}/${allServicesCount}`;
  }

  chrome.browserAction.setBadgeText({ text: iconText });
};

module.exports = function (selectedServices) {
  let icon = FAIL_ICON;

  if (selectedServices.every(service => service.working)) {
    icon = SUCCESS_ICON;
  } else if (selectedServices.some(service => service.working)) {
    icon = OK_ICON;
  }

  chrome.browserAction.setIcon({ path: icon });
  drawServiceCounter(selectedServices);
};
