let logMessages: Array<{ type: string; message: any; where?: string }> = [];
const originalFetch = window.fetch;
const originalLog = console.log;
const originalWarn = console.warn;
const originalInfo = console.info;
const originalDebug = console.debug;
const originalDir = console.dir;
const originalTrace = console.trace;
const originalTable = console.table;
const originalGroup = console.group;
const originalGroupEnd = console.groupEnd;
const originalTime = console.time;
const originalTimeEnd = console.timeEnd;
const originalTimeLog = console.timeLog;

console.log = function (...args) {
  logMessages.push({ type: "log", message: args });
  originalLog.apply(console, args);
};

console.warn = function (...args) {
  logMessages.push({ type: "warn", message: args });
  originalWarn.apply(console, args);
};

console.info = function (...args) {
  logMessages.push({ type: "info", message: args });
  originalInfo.apply(console, args);
};

console.debug = function (...args) {
  logMessages.push({ type: "debug", message: args });
  originalDebug.apply(console, args);
};

console.dir = function (...args) {
  logMessages.push({ type: "dir", message: args });
  originalDir.apply(console, args);
};

console.trace = function (...args) {
  logMessages.push({ type: "trace", message: args });
  originalTrace.apply(console, args);
};

console.table = function (...args) {
  logMessages.push({ type: "table", message: args });
  originalTable.apply(console, args);
};

console.group = function (...args) {
  logMessages.push({ type: "group", message: args });
  originalGroup.apply(console, args);
};

console.groupEnd = function (...args) {
  logMessages.push({ type: "groupEnd", message: args });
  originalGroupEnd.apply(console, args);
};

console.time = function (...args) {
  logMessages.push({ type: "time", message: args });
  originalTime.apply(console, args);
};

console.timeEnd = function (...args) {
  logMessages.push({ type: "timeEnd", message: args });
  originalTimeEnd.apply(console, args);
};

console.timeLog = function (...args) {
  logMessages.push({ type: "timeLog", message: args });
  originalTimeLog.apply(console, args);
};

window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    const clone = response.clone();
    if (!clone.ok) {
      logMessages.push({
        type: "fetch-error",
        message: {
          url: clone.url,
          status: clone.status,
          statusText: clone.statusText,
          message: clone.text(),
        },
      });
    }
    return response;
  } catch (error: any) {
    logMessages.push({
      type: "fetch-error",
      message: `${args[0]} - ${error.message}`,
    });
    throw error;
  }
};

/** Intercept XMLHttpRequest requests | Save the original request */
const originalXhrOpen = XMLHttpRequest.prototype.open;
const originalXhrSend = XMLHttpRequest.prototype.send;

/** Override XMLHttpRequest.open to log the request details */
XMLHttpRequest.prototype.open = function (
  method: string,
  url: string,
  async?: boolean,
  user?: string | null,
  password?: string | null
) {
  (this as any)._requestMethod = method;
  (this as any)._requestUrl = url;
  return originalXhrOpen.apply(this, arguments as any);
};

/** Override XMLHttpRequest.send to log the response and errors */
XMLHttpRequest.prototype.send = function (body?: Document | BodyInit | null) {
  this.addEventListener("load", function () {
    if (this.status >= 400) {
      const stack = new Error().stack;
      const location = stack?.split("\n")[2].trim();
      logMessages.push({
        type: "xhr-error",
        message: {
          url: (this as any)._requestUrl,
          method: (this as any)._requestMethod,
          status: this.status,
          statusText: this.statusText,
          response: this.responseText,
        },
        where: location || "unknown location",
      });
    }
  });

  this.addEventListener("error", function () {
    const stack = new Error().stack;
    const location = stack?.split("\n")[2].trim();
    logMessages.push({
      type: "xhr-error",
      message: {
        url: (this as any)._requestUrl,
        method: (this as any)._requestMethod,
        status: this.status,
        statusText: this.statusText,
        response: this.responseText,
      },
      where: location || "unknown location",
    });
  });

  return originalXhrSend.apply(this, arguments as any);
};

/**
 * @description getLogMessages function to get all log messages
 *
 * @param {boolean} skip_last You can skip your last console log with the boolean params.
 *
 * @returns {any[]} It will return everything what your log in your entire project.
 *
 * @example console.log(getLogMessages(false)) // skip_last is true in default mode.
 */
export function getLogMessages(skip_last: boolean = true): any[] {
  return skip_last
    ? logMessages.slice(0, logMessages.length - 1)
    : logMessages; /** send all console log. just slice last one */
}
