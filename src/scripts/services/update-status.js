let statusService = require('./status'),
  storage = require('./storage'),
  iconUpdate = require('../util/icon-update');

module.exports = function () {
  function handleServiceUpdate(fetchedAvailableServices, { availableServices, selectedServices }) {
    fetchedAvailableServices.forEach(service => {

    });

    iconUpdate(selectedServices);
  }

  Promise
    .all([storage.loadOptions(), statusService.fetch()])
    .then(handleServiceUpdate)
    .catch((e) => console.warn('Update failed. Error message: %s', e));
};
