// Saves options to chrome.storage
function save_options() {
  const magazineName = document.getElementById('magazine-name').value;

  chrome.storage.sync.set({ magazineName });
}

// Restores selected options using the preferences stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.sync.get({ magazineName: 'magazine' },
    items => document.getElementById('magazine-name').value = items.magazineName
  );
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
