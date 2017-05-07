// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'pocketmags' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'pocketmags' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});


chrome.pageAction.onClicked.addListener(
    tab => chrome.tabs.query({active: true, currentWindow: true},
        tabs => chrome.tabs.sendMessage(tabs[0].id, {action: "POCKETMAGS_CLICK"},
            blobs => blobs.forEach(downloadBlob)
        )
    )
);


let downloadedPages = [];
let magazineName;
const storage = chrome.storage.sync;

storage.get({ magazineName: 'magazine' }, items => magazineName = items.magazineName);

function downloadBlob(blob, index) {
    const isDownloaded = downloadedPages.includes(blob);

    if (!isDownloaded) {
        downloadedPages.push(blob);

        chrome.downloads.download({
            url: blob,
            conflictAction: "overwrite",
            filename: `pocketmags/${magazineName}_${downloadedPages.length}.jpeg`
        });
    }
}
