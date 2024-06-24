export interface ConsoleMethods {
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
  "dir",
  "trace",
  "table",
  "group",
  "groupEnd",
  "time",
  "timeEnd",
  "timeLog",
];
