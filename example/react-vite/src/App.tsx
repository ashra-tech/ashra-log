import { useEffect, useState } from "react";
import { getLogMessages } from "ashra-log";

const LogViewer = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/post/${Math.floor(
        Math.random() * 100
      )}`
    )
      .then((respnose) => respnose.json())
      .then((data) => console.log("data: ", data))
      .catch((error) => console.log("error: ", error));
  }, []);

  const handleClick = () => {
    setLogs(getLogMessages());
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
