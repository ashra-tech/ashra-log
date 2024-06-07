## **[Ashra-Log](www.npmjs.com/package/ashra-log)** - Capture Your Console 
Ashra Log can capture all your console output such as `[info, log, error, warn]` and HTTP request information that you can use later as your uses. In a line, we can say, **(Read Console With & Get Console)**. 

## Why Ashra-log?
- **[ashra-log](www.npmjs.com/package/ashra-log):** is a platform independence npm package you can use for all applications.
- **[ashra-log](www.npmjs.com/package/ashra-log):** can work with also browser extension development content script
- **[ashra-log](www.npmjs.com/package/ashra-log):** It's really lightweight and simple npm package
- **[ashra-log](www.npmjs.com/package/ashra-log):** is accepting your ISSUE & PR on GitHub since its fully free.

***So, why you are waiting? Just visite our Github Repository and make a star as a appreciate.***

### Installing

**If you are using `npm package manager` then you can use this command**

```console
npm install ashra-log
```

**If you are using `yarn package manager` then you can use this command**

```console
yarn add ashra-log
```

**If you are using `pnpm package manager` then you can use this command**

```console
pnpm add ashra-log
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
