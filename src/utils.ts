export interface IConsoleMethods {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  dir: (...args: any[]) => void;
  trace: (...args: any[]) => void;
  table: (...args: any[]) => void;
  group: (...args: any[]) => void;
  groupEnd: (...args: any[]) => void;
  time: (label?: string) => void;
  timeEnd: (label?: string) => void;
  timeLog: (label?: string, ...args: any[]) => void;
}

export const consoleMethods: (keyof IConsoleMethods)[] = [
  "log",
  "warn",
  "info",
  "debug",
  "dir",
  "trace",
  "table",
  "group",
  "groupEnd",
  "time",
  "timeEnd",
  "timeLog",
];

/**
 * Adds a network log to the output.
 * @param type - The type of network request (XHR or fetch).
 * @param method - The HTTP method used (GET, POST, etc.).
 * @param url - The URL of the request.
 * @param status - The HTTP status code of the response.
 * @param response - The response text.
 */
export function addNetworkLog(
  output: TConsoleOutput[],
  type: string,
  method: string,
  url: string,
  status: number,
  response: string
) {
  return output.push({
    type: "network",
    message: { type, method, url, status, response },
    where: `${method} ${url}`,
  });
}
