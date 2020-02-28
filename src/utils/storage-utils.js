export const storageUtils = {};

let config = {
  solution: 'LOCALSTORAGE'
}
/* other can be:
ANDROID ASYNC SIORAGE, 
sessionStorage,
cookie...
*/

storageUtils.get = (key) => {
  if (config.solution === 'LOCALSTORAGE') {
    return localStorage.getItem(key);
  }
}

storageUtils.upsert = (key, value) => {
  if (config.solution === 'LOCALSTORAGE') {
    localStorage.setItem(key, value);
  }
}

storageUtils.delete = (key) => {
  if (config.solution === 'LOCALSTORAGE') {
    localStorage.removeItem(key);
  }
}

storageUtils.logAll = () => {
  if (config.solution === 'LOCALSTORAGE') {
    let arr = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      arr.push({
        key: keys[i],
        value: localStorage.getItem(keys[i])
      });
    }
    return arr;
  }
}
