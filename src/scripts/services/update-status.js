let statusService = require('./status'),
  storage = require('./storage'),
  iconUpdate = require('../util/icon-update');

module.exports = function () {
  function handleServiceUpdate([{ availableServices, selectedServices }, fetchedAvailableServices]) {
    let newDiscoveredServices,
      allKnownServices = availableServices.concat(selectedServices);

    newDiscoveredServices = fetchedAvailableServices
      .filter(service => !allKnownServices.some(knownService => knownService.name === service.name));

    storage.saveOptions(newDiscoveredServices, selectedServices);
    iconUpdate(selectedServices);
    console.info('Service updated');
  }

  Promise.all([storage.loadOptions(), statusService.getProjectStates()])
    .then(handleServiceUpdate)
    .catch(e => console.error('Update failed. Error message: %s', e));
};
