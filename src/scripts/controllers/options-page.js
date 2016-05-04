(function () {
  let storage = require('../services/storage'),
    domHelpers = require('../util/dom-helpers');

  function loadOptions({ availableServices, selectedServices }) {
    let servicesSelect = domHelpers.populateList('services-list', availableServices, domHelpers.toOption),
      selectedServicesSelect = domHelpers.populateList('selected-services-list', selectedServices, domHelpers.toOption);

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
      storage.saveOptions(domHelpers.getValuesFromSelect('services-list'), domHelpers.getValuesFromSelect('selected-services-list'));
    });
  }

  storage.loadOptions().then(loadOptions);
}());
