## Ashra Log

A simple console.log() capturing package

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

```js
import { getLogMessages } from "ashra-log"; // es6 - module
const { getLogMessage } = require("ashra-log"); // es5 - commonJS

console.log(getLogMessage(false)); // you can pass skip_last as params - which is boolean
```
