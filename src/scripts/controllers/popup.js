(function () {
  const storage = require('../services/storage'),
    domHelpers = require('../util/dom-helpers'),
    statusUpdate = require('../services/update-status');

  setTimeout(() => {
    storage.loadOptions()
      .then(({ selectedServices }) => domHelpers.populateList('service-list', selectedServices, domHelpers.toListItem));

    statusUpdate();
  }, 5000);
}());
