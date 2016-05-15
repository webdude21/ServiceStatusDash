let storage = require('../services/storage'),
  domHelpers = require('../util/dom-helpers'),
  Service = require('../models/service'),
  statusUpdate = require('../services/update-status');

function handleOptionsLoaded({ availableServices, selectedServices, serviceAddress }) {
  let servicesSelect = domHelpers.populateList('services-list', availableServices, domHelpers.serviceToOption),
    selectedServicesSelect = domHelpers.populateList('selected-services-list', selectedServices, domHelpers.serviceToOption);

  domHelpers.populateInput('service-input', serviceAddress);
  domHelpers.addClickHandler('btn-select-all',
    () => domHelpers.moveNodesFromParentToParent(servicesSelect, selectedServicesSelect));
  domHelpers.addClickHandler('btn-remove-all',
    () => domHelpers.moveNodesFromParentToParent(selectedServicesSelect, servicesSelect));
  domHelpers.addClickHandler('btn-add-selected',
    () => domHelpers.moveSelectedItemsBetweenParents(servicesSelect, selectedServicesSelect));
  domHelpers.addClickHandler('btn-remove-selected',
    () => domHelpers.moveSelectedItemsBetweenParents(selectedServicesSelect, servicesSelect));
  domHelpers.addClickHandler('btn-save', () => {
    domHelpers.showSavingStatus(domHelpers.getById('status'));
    storage.saveOptions(domHelpers.getValuesFromSelect('services-list').map(item => new Service(item)),
        domHelpers.getValuesFromSelect('selected-services-list').map(item => new Service(item)),
        domHelpers.retrieveTextFromInput('service-input'))
      .then(statusUpdate);
  });
}

statusUpdate()
  .then(storage.loadOptions)
  .then(handleOptionsLoaded);
