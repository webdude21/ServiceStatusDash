(function () {
  const storage = require('../services/storage'),
    domHelpers = require('../util/dom-helpers');

  storage.loadOptions()
    .then(({ selectedServices }) => domHelpers.populateList('service-list', selectedServices, domHelpers.toListItem));
}());
