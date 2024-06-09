import { getLogMessages } from "ashra-log";

console.log("Hello world!");
console.log("Hello world! 2");
console.log(["Sabbir", "Ashra"]);
console.error("Error message");
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => res.json())
  .then((content) => console.log(content))
  .catch((err) => console.error(err));

console.log(getLogMessages(true));
