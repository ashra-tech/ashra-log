## Ashra Log

A simple **console `log|warn|error`** capturing package

### Installing

**If you are using `npm package manager` then you can use this command**

```console
npm install -D ashra-log
```

**If you are using `yarn package manager` then you can use this command**

```console
yarn add -D ashra-log
```

**If you are using `pnpm package manager` then you can use this command**

```console
pnpm add -D ashra-log
```

### Uses Of **`ashra-log`**

```js
console.log("Hello World!"); // write console log as normal
```

### To get your all console log in a array

- **Simple Nodejs/Vanilla JS uses**

```js
import { getLogMessages } from "ashra-log"; // es6 - module
const { getLogMessage } = require("ashra-log"); // es5 - commonJS

console.log(getLogMessage(false)); // you can pass skip_last as params - which is boolean
```

- **React/Nextjs Uses**

```ts
// src/App.tsx
import { useEffect, useState } from "react";
import { getLogMessages } from "ashra-log";

const LogViewer = () => {
  const [logs, setLogs] = useState<any[]>([]);
  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${Math.floor(
        Math.random() * 100
      )}`
    )
      .then((respnose) => respnose.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = () => {
    const logs = getLogMessages(false);
    setLogs(logs);
    alert(JSON.stringify(logs, null, 2)); // Display logs as an alert (you can customize this as needed)
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <div>
        {logs.map((log, index) => (
          <div key={index}>
            <strong>{log.type.toUpperCase()}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogViewer;
```
