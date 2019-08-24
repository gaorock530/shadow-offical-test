function getWindowWidth() {
  return (
    window.innerWidth ||
    (document.documentElement && document.documentElement.clientWidth) ||
    (document.body && document.body.clientWidth) ||
    0
  );
}

function getWindowHeight() {
  return (
    window.innerHeight ||
    (document.documentElement && document.documentElement.clientHeight) ||
    (document.body && document.body.clientHeight) ||
    0
  );
}

function launchFullscreen(element) {
  var enabled =
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled;
  if (!enabled) {
    throw new Error('Fullscreen not enabled in this browser.');
  }
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

export {
  getWindowWidth,
  getWindowHeight,
  launchFullscreen,
  exitFullscreen,
}