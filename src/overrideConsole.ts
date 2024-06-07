let logMessages: any[] = [];

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

console.log = function (...args) {
  logMessages.push({ type: "log", message: args });
  originalLog.apply(console, args);
};

console.warn = function (...args) {
  logMessages.push({ type: "warn", message: args });
  originalWarn.apply(console, args);
};

console.error = function (...args) {
  logMessages.push({ type: "error", message: args });
  originalError.apply(console, args);
};

/**
 * @description getLogMessages function to get all log messages
 * @param {boolean} skip_last You can skip your last console log with the boolean params.
 * @returns {any[]} It will return everything what your log in your entire project.
 * @example console.log(getLogMessages(false)) // skip_last is true in default mode.
 */
export function getLogMessages(skip_last: boolean = true): any[] {
  return skip_last
    ? logMessages.slice(0, logMessages.length - 1)
    : logMessages; /** send all console log. just slice last one */
}
