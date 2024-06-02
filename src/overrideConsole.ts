/** Store the original console.log function */
const originalLog = console.log;
/** Store the original console.warn function */
const originalWarn = console.warn;
/** Store the original console.error function */
const originalError = console.error;

let logMessages: any[] = [];

/**  Override the console.* function */
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
 * @description getLogMessage function to get all log messages
 * @param {boolean} skip_last You can skip your last console log with the boolean params.
 * @returns {any[]} It will return everything what your log in your entire project.
 * @example console.log(getLogMessage(false)) // skip_last is true in default mode.
 * */
export function getLogMessages(skip_last: boolean = true): any[] {
  return skip_last
    ? logMessages.slice(0, logMessages.length - 1)
    : logMessages; /** send all console log. just slice last one */
}
