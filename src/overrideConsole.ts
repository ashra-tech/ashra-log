/** Store the original console.log function */
const originalConsoleLog = console.log;

let logMessages: any[] = [];

/**  Override the console.log function */
console.log = function (...args: any[]): void {
  logMessages.push(args); /** store each message to the logMessages array */

  /** Call the original console.log function */
  originalConsoleLog.apply(console, args);
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
