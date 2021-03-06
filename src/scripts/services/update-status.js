let statusService = require('./status'),
  storage = require('./storage'),
  iconUpdate = require('../util/icon-update');

/**
 * Updates the internal caches with the result from the service call.
 * @param {Array.<Service>} availableServices
 * @param {Array.<Service>} selectedServices
 * @param {Array.<Service>} fetchedAvailableServices
 * @returns {*|Promise} which is resolved when the saving is done
 */
function handleServiceUpdate([{ availableServices, selectedServices }, fetchedAvailableServices]) {
  let newDiscoveredServices,
    updatedSelectedService,
    allKnownServices = availableServices.concat(selectedServices),
    updateService = serviceToUpdate => fetchedAvailableServices
    .find(service => service.name === serviceToUpdate.name);

  newDiscoveredServices = fetchedAvailableServices
    .filter(service => !allKnownServices.some(knownService => knownService.name === service.name));

  updatedSelectedService = selectedServices.map(updateService);

  iconUpdate(updatedSelectedService);
  console.info('Service updated');
  return storage.saveOptions((availableServices.concat(newDiscoveredServices)).map(updateService), updatedSelectedService);
}

module.exports = () => Promise
  .all([storage.loadOptions(), statusService.fetchServices()])
  .then(handleServiceUpdate)
  .catch(err => {
    console.warn(`Failed to fetch from backend, fetched from local storage. ${err}`);
    return storage.loadOptions().then(({ selectedServices }) => iconUpdate(selectedServices));
  });
