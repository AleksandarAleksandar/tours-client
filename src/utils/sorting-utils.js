export const sortingUtils = {};

sortingUtils.sort = (arr) => {
  let pure_new = [...arr]
  pure_new.sort();
  return pure_new
}

sortingUtils.sortReverse = (arr) => {
  let pure_new = [...arr]
  pure_new.sort();
  let reverse = [];
  let i = pure_new.length - 1;
  while (pure_new[i]) {
    reverse.push(pure_new[i]);
    i--;
  }
  return reverse;
}
