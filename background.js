chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('The color is green.');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'developer.chrome.com' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

// background.js

let tabToMimeType = {};
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if (details.tabId !== -1) {
      let header = getHeaderFromHeaders(details.responseHeaders, 'content-type');
      // If the header is set, use its value; otherwise, use `undefined`
      let mimeType = header && header.value.split(';', 1)[0];
      let url = details.url;
      tabToMimeType[details.tabId] = mimeType;
      // alert('Load URL ' + url + ' with MIME type ' + mimeType + ' \n' + JSON.stringify(details));
    }
  },
  {
    urls: ['*://*/*'],
    types: ['main_frame'],
  },
  ['responseHeaders']
);

chrome.browserAction.onClicked.addListener((tab) => {
  alert('Tab with URL ' + tab.url + ' has MIME type ' + tabToMimeType[tab.id]);
});

let getHeaderFromHeaders = (headers, headerName) => {
  for (let i = 0; i < headers.length; i++) {
    let header = headers[i];
    if (header.name.toLowerCase() === headerName) {
      return header;
    }
  }
};
