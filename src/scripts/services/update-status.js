let statusService = require('./status'),
  storage = require('./storage'),
  iconUpdate = require('../util/icon-update');

/**
 * Updates the internal caches with the result from the service call.
 * @param availableServices
 * @param selectedServices
 * @param fetchedAvailableServices
 * @returns {*|Promise} which is resolved when the saving is done
 */
function handleServiceUpdate([{ availableServices, selectedServices }, fetchedAvailableServices]) {
  let newDiscoveredServices,
    allKnownServices = availableServices.concat(selectedServices);

  newDiscoveredServices = fetchedAvailableServices
    .filter(service => !allKnownServices.some(knownService => knownService.name === service.name));

  iconUpdate(selectedServices);
  console.info('Service updated');
  return storage.saveOptions(availableServices.concat(newDiscoveredServices), selectedServices);
}

module.exports = function () {
    return Promise.all([storage.loadOptions(), statusService.getProjectStates()])
      .then(handleServiceUpdate);
};
