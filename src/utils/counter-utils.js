export const counterUtils = {};

counterUtils.state = 1;

counterUtils.getFreshId = () => {
  counterUtils.state++;
  return counterUtils.state;
}