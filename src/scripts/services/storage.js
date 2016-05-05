module.exports = {
  /**
   * Saving the options to the internal storage
   * @param availableServices
   * @param selectedServices
   * @returns {Promise}
   */
  saveOptions(availableServices, selectedServices) {
    return new Promise(resolve => chrome.storage.sync.set({ selectedServices, availableServices }, resolve));
  },
  /**
   * Loading the previously persisted state
   * @returns {Promise}
   */
  loadOptions() {
    return new Promise(resolve => chrome.storage.sync.get({
      availableServices: [],
      selectedServices: []
    }, resolve));
  }
};
