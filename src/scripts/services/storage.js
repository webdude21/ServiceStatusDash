module.exports = {
  saveOptions(availableServices, selectedServices) {
    return new Promise(resolve => chrome.storage.sync.set({ selectedServices, availableServices }, resolve));
  },
  loadOptions() {
    return new Promise(resolve => {
      chrome.storage.sync.get({
        availableServices: ['master', 'rel-1.38', 'rel-1.36', 'rel-1.34', 'rel-1.32'],
        selectedServices: []
      }, resolve);
    });
  }
};
