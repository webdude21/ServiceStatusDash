(function (chrome) {
  const COLORS = {
    GREEN: [0, 170, 0, 200],
    RED: [255, 0, 0, 100]
  };

  function drawIcon(text) {
    chrome.browserAction.setBadgeBackgroundColor({ color: COLORS.GREEN});
    chrome.browserAction.setBadgeText({ text: text.toString() });
  }

  function updateIcon() {
    var savedData = loadSavedData();
    if (savedData && savedData.fuelType) {
      if (savedData.cachedValue && isFromToday(savedData.lastUpdated)) {
        drawIcon(savedData.cachedValue);
      } else {
        updateFavoriteFuelInfo(savedData.fuelType).then(function (result) {
          savedData.cachedValue = result.price;
          saveChanges(savedData);
          drawIcon(result.price);
        });
      }
    }
  }

  if (chrome.runtime && chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(updateIcon);
    chrome.runtime.onMessage.addListener(readInputFromPopup);
  }
}(chrome));
