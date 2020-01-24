export const counterUtils = {};

counterUtils.state = 1;

counterUtils.getFreshId = () => {
  // console.log('counter before: ', counterUtils.state);
  counterUtils.state++;
  // console.log('counter will return: ', counterUtils.state);
  return counterUtils.state;
}