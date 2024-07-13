"use client";
import { useEffect, useState } from "react";
import { getLogMessages, restoreConsole } from "../../../src/index";

export default function Home() {
  const [logs, setLogs] = useState<any[]>([]);
  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/post/${Math.floor(
        Math.random() * 100
      )}`
    )
      .then((respnose) => respnose.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  const handleClick = () => {
    console.log("handle clicked");
    ("use client");
    const logs = getLogMessages(false);
    setLogs(logs);

    console.log("logs", logs);

    restoreConsole();

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
}
