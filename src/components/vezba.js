let iso = string => {
  let array = [...string]
  if (array.length < 1) return true
  for (let i = 0; i < array.length; i++) {
    for (let y = 0; y < array[i].length; y++) {
      if (array[i] === array[y]) {
        return false
      }
    }
  }
  return true
}
iso('onomatopeja')