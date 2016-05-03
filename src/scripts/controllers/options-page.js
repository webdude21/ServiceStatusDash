(function () {
  const storage = require('../services/storage.js'),
    domHelpers = require('../util/dom-helpers'),
    loadOptions = function ({ availableServices, selectedServices }) {
      let servicesSelect = domHelpers.populateList('services-list', availableServices),
        selectedServicesSelect = domHelpers.populateList('selected-services-list', selectedServices);

      domHelpers.addClickHandler('btn-select-all', () => domHelpers.moveNodesFromParentToParent(servicesSelect, selectedServicesSelect));
      domHelpers.addClickHandler('btn-remove-all', () => domHelpers.moveNodesFromParentToParent(selectedServicesSelect, servicesSelect));
      domHelpers.addClickHandler('btn-add-selected', () => domHelpers.moveSelectedItemsBetweenParents(servicesSelect, selectedServicesSelect));
      domHelpers.addClickHandler('btn-remove-selected', () => domHelpers.moveSelectedItemsBetweenParents(selectedServicesSelect, servicesSelect));
      domHelpers.addClickHandler('btn-save', () => {
        storage.saveOptions(domHelpers.getValuesFromSelect('services-list'), domHelpers.getValuesFromSelect('selected-services-list'));
      });
    };

  storage.loadOptions().then(loadOptions);
}());
