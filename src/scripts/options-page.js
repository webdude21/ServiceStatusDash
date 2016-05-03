(function () {
  const availableServices = require('./services/available-services.js'),
    selectedServices = require('./services/selected-services.js'),
    domHelpers = require('./util/dom-helpers'),
    servicesSelect = domHelpers.populateList('services-list', availableServices.getAllAvailableServices()),
    selectedServicesSelect = domHelpers.populateList('selected-services-list', selectedServices.getAllSelectedServices());

  domHelpers.addClickHandler('btn-select-all', () => domHelpers.moveNodesFromParentToParent(servicesSelect, selectedServicesSelect));
  domHelpers.addClickHandler('btn-remove-all', () => domHelpers.moveNodesFromParentToParent(selectedServicesSelect, servicesSelect));
  domHelpers.addClickHandler('btn-add-selected', () => domHelpers.moveSelectedItemsBetweenParents(servicesSelect, selectedServicesSelect));
  domHelpers.addClickHandler('btn-remove-selected', () => domHelpers.moveSelectedItemsBetweenParents(selectedServicesSelect, servicesSelect));
}());
