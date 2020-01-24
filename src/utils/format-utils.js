
export const formatUtils = {};

formatUtils.formatPrice = (number, prefix) => {
  // let prefix = '';
  if (typeof prefix !== 'string') {
    prefix = ''
  }
  return prefix + number.toFixed(2);
}
