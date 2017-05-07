chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == 'POCKETMAGS_CLICK') {
    const slider = document.getElementById('scroller').getElementsByClassName('slider')[0].innerHTML;
    const blobs = getBlobs(slider);

    sendResponse(blobs);
  }
});

function getBlobs(node) {
    const BLOB_URL_LENGTH = 63;
    const blobsIndexes = getAllIndexes(node, 'blob');

    return blobsIndexes.map(blobIndex => node.slice(blobIndex, blobIndex + BLOB_URL_LENGTH));
}

function getAllIndexes(str, substr) {
    const indexes = [];
    let i = -1;

    while (str.indexOf(substr, i + 1) !== -1) {
        i = str.indexOf(substr, i + 1);
        indexes.push(i);
    }

    return indexes;
}
