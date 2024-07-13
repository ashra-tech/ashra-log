let output: TConsoleOutput[] = [];
const originalConsole: { [K in keyof Console]?: Console[K] } = {};
let originalXhrOpen: Function | undefined;
let originalFetch: typeof window.fetch | undefined;

/**
 * Captures all console methods dynamically and stores their output.
 */
const captureConsole = () => {
  const methods = Object.keys(console) as Array<keyof Console>;

  methods.forEach((method) => {
    const clgMethod = console[method];
    if (clgMethod) {
      if (typeof console[method] === "function") {
        // @ts-ignore
        originalConsole[method] = console[method].bind(console);

        // @ts-ignore
        console[method] = new Proxy(console[method]!, {
          apply: (target, thisArg, argumentsList) => {
            output.push({
              type: method,
              message: argumentsList,
              where: getStackTrace(),
            });
            // @ts-ignore
            return target.apply(thisArg, argumentsList);
          },
        });
      }
    }
  });
};

/**
 * Captures unhandled errors and promise rejections.
 */
const captureErrors = () => {
  if (typeof window !== "undefined") {
    window.onerror = (message, source, lineno, colno, error) => {
      output.push({
        type: error ? error.name : "error",
        message: [message, source, lineno, colno, error],
        where: `${source}:${lineno}:${colno}`,
      });
    };

    window.onunhandledrejection = (event) => {
      output.push({
        type: event.reason ? event.reason.name : "unhandledrejection",
        message: [event.reason],
        where: getStackTrace(),
      });
    };
  } else {
    process.on("uncaughtException", (error) => {
      output.push({
        type: error.name,
        message: [error],
        where: getStackTrace(),
      });
    });

    process.on("unhandledRejection", (reason) => {
      output.push({
        type: reason instanceof Error ? reason.name : "unhandledrejection",
        message: [reason],
        where: getStackTrace(),
      });
    });
  }
};

/**
 * Captures network requests and responses using Proxy in a browser environment.
 */
const captureNetwork = () => {
  if (typeof XMLHttpRequest !== "undefined" && typeof window !== "undefined") {
    originalXhrOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method: string, url: string) {
      this.addEventListener("load", () => {
        addNetworkLog("XHR", method, url, this.status, this.responseText);
      });
      originalXhrOpen &&
        originalXhrOpen.apply(this, arguments as unknown as any);
    };

    originalFetch = window.fetch;
    window.fetch = new Proxy(window.fetch, {
      apply: async (target, thisArg, argumentsList) => {
        const response = await Reflect.apply(target, thisArg, argumentsList);
        const clonedResponse = response.clone();
        const text = await clonedResponse.text();
        addNetworkLog(
          "fetch",
          argumentsList[1]?.method || "GET",
          argumentsList[0].toString(),
          clonedResponse.status,
          text
        );
        return response;
      },
    });
  } else {
    console.warn("Network capturing is not supported in this environment.");
  }
};

/**
 * Adds a network log to the output.
 * @param type - The type of network request (XHR or fetch).
 * @param method - The HTTP method used (GET, POST, etc.).
 * @param url - The URL of the request.
 * @param status - The HTTP status code of the response.
 * @param response - The response text.
 */
const addNetworkLog = (
  type: string,
  method: string,
  url: string,
  status: number,
  response: string
) => {
  output.push({
    type: "network",
    message: { type, method, url, status, response },
    where: `${method} ${url}`,
  });
};

/**
 * Gets the captured console output.
 * @returns An array of captured console output.
 */
export const getOutput = (): TConsoleOutput[] => {
  return output;
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
export function getLogMessages(skip_last: boolean = true): TConsoleOutput[] {
  return skip_last
    ? getOutput().slice(0, getOutput.length - 1)
    : getOutput(); /** send all console log. just slice last one */
}

/**
 * Restores the original console methods.
 */
export const restoreConsole = () => {
  (Object.keys(originalConsole) as Array<keyof Console>).forEach((method) => {
    if (originalConsole[method]) {
      // @ts-ignore
      console[method] = originalConsole[method]!;
    }
  });
  if (typeof XMLHttpRequest !== "undefined" && typeof window !== "undefined") {
    // @ts-ignore
    XMLHttpRequest.prototype.open = originalXhrOpen;
    // @ts-ignore
    window.fetch = originalFetch;
  }
};

/**
 * Gets the current stack trace to provide location information for the console output.
 * @returns A string representation of the current stack trace.
 */
const getStackTrace = (): string => {
  const obj = { stack: "" };
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack || "";
};

/**
 * Initialize the console capturing functionalities.
 */
const initializeConsoleCapture = () => {
  captureConsole();
  captureErrors();
  captureNetwork();
};

// Check if the code is running in a browser environment and initialize the console capture
if (typeof window !== "undefined" && typeof XMLHttpRequest !== "undefined") {
  initializeConsoleCapture();
} else {
  console.warn(
    "This script is not running in a browser environment. Some features may not work."
  );
}
