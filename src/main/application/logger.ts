function trace(message: any) {
  console.trace(message);
}

function debug(message: any) {
  console.debug(message);
}

function info(message: any) {
  console.log(message);
}

export default {
  trace,
  debug,
  info
};
