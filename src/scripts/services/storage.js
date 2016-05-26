module.exports = {
  /**
   * Saving the options to the internal storage
   * @param {Array.<Service>} availableServices
   * @param {Array.<Service>} selectedServices
   * @param {String} serviceAddress
   * @returns {Promise}
   */
  saveOptions(availableServices, selectedServices, serviceAddress) {
    return new Promise(resolve => chrome.storage.sync.set({ selectedServices, availableServices, serviceAddress }, resolve));
  },
  /**
   * Loading the previously persisted state
   * @returns {Promise}
   */
  loadOptions() {
    return new Promise(resolve => chrome.storage.sync.get({
      availableServices: [],
      selectedServices: [],
      serviceAddress: null
    }, resolve));
  }
};
