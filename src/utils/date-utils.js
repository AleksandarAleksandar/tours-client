export const dateUtils = {};

dateUtils.parsedateString = (dateString) => {
  let date = new Date(dateString)
  let options = { month: 'short'};
  let month_string_short = new Intl.DateTimeFormat('en-US', options).format(date);
  options = { month: 'long'};
  let month_string = new Intl.DateTimeFormat('en-US', options).format(date);
  let parsed = {
    source: dateString,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    monthLong: month_string,
    month3char: month_string_short,
    day: date.getUTCDate()
  };
  return parsed;
}
