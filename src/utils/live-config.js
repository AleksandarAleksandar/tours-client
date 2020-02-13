let liveConfig = {};
liveConfig.isDevEnv = () => {
  let test = false;
  if (window.location.hostname === 'localhost') {
    test = true
  }
  return test
}
export { liveConfig }