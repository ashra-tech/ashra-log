import { useEffect, useState } from "react";
import { getLogMessages, restoreConsole } from "../../../src/index";

const LogViewer = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const data: any[] = [];

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${Math.floor(
        Math.random() * 100
      )}`
    )
      .then((respnose) => respnose.json())
      .then((data) => console.log("data: ", data))
      .catch((error) => console.log("error: ", error));
  }, []);

  const handleClick = () => {
    setLogs(getLogMessages());
    console.log("log: ", getLogMessages());

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
      <div style={{ background: "blue" }}>
        {data.map((it: any, i) => (
          <>
            <h1 key={i}>hello {it?.name}</h1>
            <p>{it.faill == "sabbir" ? "hell" : "2"}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default LogViewer;
