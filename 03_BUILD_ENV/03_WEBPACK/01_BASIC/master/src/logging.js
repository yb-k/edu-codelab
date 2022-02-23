

export function log(...args) {
  console.log.apply(console, args);
}

export function debug(...args) {
  console.debug.apply(console, args);
}

export function error(...args) {
  console.error.apply(console, args);
}

export function info(...args) {
  console.info.apply(console, args);
}