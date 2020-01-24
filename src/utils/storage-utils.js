export const storageUtils = {};

let config = {
  solution: 'LOCALSTORAGE'
}
/* ostale mogu biti na primer:
ANDROID ASYNC SIORAGE, 
sessionStorage,
cookie...
*/

storageUtils.get = (key) => {
  // upsert znaci update or insert (setuje novi podatak ili updateuje stari ako psotoji)
  if (config.solution === 'LOCALSTORAGE') {
    return localStorage.getItem(key);
  }
}

storageUtils.upsert = (key, value) => {
  // upsert znaci update or insert (setuje novi podatak ili updateuje stari ako psotoji)
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
    console.log(arr);
    return arr;
  }
}
