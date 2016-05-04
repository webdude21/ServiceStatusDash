const storage = require('../services/storage');

/**
 * Updates the action icon based on the services statuses
 * @param {Service} selectedServices
 */
function updateIcon({ selectedServices }) {
  if (selectedServices.every(service => service.working)) {
    // success
  } else if (selectedServices.some(service => service.working)) {
    // ok
  } else {
    // fail
  }
}

module.exports = () => storage.loadOptions().then(updateIcon);
