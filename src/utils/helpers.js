export function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export function formatDateToShortString(isoStr) {
  return new Date(isoStr).toDateString(); // "Wed Apr 23 2025"
}

export function isExpired(dateStr) {
    const apiDate = new Date(dateStr);
    const now = new Date();

    // console.log(apiDate);

    if (apiDate < now) {
    // console.log('The API date is in the past.');
        return true;
    } else {
    // console.log('The API date is in the future.');
        return false;
    }
}
