let storage = require('../services/storage'),
  domHelpers = require('../util/dom-helpers'),
  statusUpdate = require('../services/update-status');

storage.loadOptions().then(({ selectedServices }) => domHelpers.populateList('service-list',
  selectedServices, domHelpers.serviceToListItem));
statusUpdate();
