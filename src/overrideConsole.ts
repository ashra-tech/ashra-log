import { CustomXMLHttpRequest } from "./utils";

let logMessages: Array<{ type: string; message: any }> = [];

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;
const originalFetch = window.fetch; /** intercept fetch request */

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

window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    if (!response.ok) {
      logMessages.push({
        type: "fetch-error",
        message: {
          url: response.url,
          status: response.status,
          statusText: response.statusText,
          message: await response.text(),
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
      logMessages.push({
        type: "xhr-error",
        message: {
          url: (this as any)._requestUrl,
          method: (this as any)._requestMethod,
          status: this.status,
          statusText: this.statusText,
          response: this.responseText,
        },
      });
    }
  });

  this.addEventListener("error", function () {
    logMessages.push({
      type: "xhr-error",
      message: {
        url: (this as any)._requestUrl,
        method: (this as any)._requestMethod,
        status: this.status,
        statusText: this.statusText,
        response: this.responseText,
      },
    });
  });

  return originalXhrSend.apply(this, arguments as any);
};
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
