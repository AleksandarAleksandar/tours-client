
export const browserUtils = {};

browserUtils.updateTitle = (title) => {
  document.title = title;
}

browserUtils.reload = () => {
  window.location.reload(false);
}

browserUtils.reloadForced = () => {
  // reload all files from the server
  window.location.reload(true);
}

browserUtils.openUrl  = (url) => {
  // open relative or absolute url in same tab
  window.location.href = url;
}


