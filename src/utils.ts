export interface ConsoleMethods {
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

export const consoleMethods: (keyof ConsoleMethods)[] = [
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
