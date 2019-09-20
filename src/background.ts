chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.sync.get(["active"], status => {
    let { active } = status;
    if (active) {
      active = false;
      chrome.storage.sync.set({ active });
    } else {
      active = true;
      chrome.storage.sync.set({ active });
    }

    chrome.browserAction.setIcon({
      path: {
        16: active ? "icons/work16.png" : "icons/fun16.png",
        48: active ? "icons/work48.png" : "icons/fun48.png",
        128: active ? "icons/work128.png" : "icons/fun128.png"
      }
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  chrome.storage.sync.get(["active"], ({ active }) => {
    if (active) {
      chrome.storage.sync.get(["blockList"], ({ blockList }) => {
        blockList.forEach(name => {
          if (tab.url.includes(name.toLowerCase())) chrome.tabs.remove(tabId);
        });
      });
    }
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ active: false });

  chrome.storage.sync.set({
    blockList: [
      "facebook.com",
      "twitter.com",
      "instagram.com",
      "youtube.com",
      "9gag.com",
      "producthunt.com"
    ]
  });
});
