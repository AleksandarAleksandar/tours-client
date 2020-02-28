export const formatUtils = {};

formatUtils.formatPrice = (number, prefix) => {
  if (typeof prefix !== 'string') {
    prefix = ''
  }
  if (typeof number !== 'number') {
    number = 0;
  }
  return prefix + number.toFixed(2);
}

formatUtils.formatDistance = (number) => {
  let str = '' + number.toFixed(0);
  let new_string = '';
  let maxi = str.length - 1;
  let counter = 0;
  for (var i = maxi; i > -1; i--) {
    counter++;
    if (counter > 3) {
      new_string = ' ' + new_string;
      counter = 0;
    }
    new_string = str.charAt(i) + new_string;
  }
  return new_string + ' km'
}
