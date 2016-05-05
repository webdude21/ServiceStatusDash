let statusService = require('./status'),
  storage = require('./storage'),
  iconUpdate = require('../util/icon-update');

function handleServiceUpdate([{ availableServices, selectedServices }, fetchedAvailableServices]) {
  let newDiscoveredServices,
    allKnownServices = availableServices.concat(selectedServices);

  newDiscoveredServices = fetchedAvailableServices
    .filter(service => !allKnownServices.some(knownService => knownService.name === service.name));

  storage.saveOptions(availableServices.concat(newDiscoveredServices), selectedServices);
  iconUpdate(selectedServices);
  console.info('Service updated');
}

module.exports = function () {
  return new Promise(resolve => {
    Promise.all([storage.loadOptions(), statusService.getProjectStates()])
      .then(handleServiceUpdate)
      .then(resolve)
      .catch(e => console.error('Update failed. Error message: %s', e));
  });
};
