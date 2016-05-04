(function () {
  const storage = require('../services/storage'),
    domHelpers = require('../util/dom-helpers'),
    loadOptions = function ({ availableServices, selectedServices }) {
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
        storage.saveOptions(domHelpers.getValuesFromSelect('services-list'), domHelpers.getValuesFromSelect('selected-services-list'));
      });
    };

  storage.loadOptions().then(loadOptions);
}());
