"use client";

import { useState } from "react";
import { getLogMessages } from "ashra-log";

export default function Button({ text, data }: { text: string; data: any }) {
  console.log(data);
  const [consoleData, setConsoleData] = useState<any>(null);

  const handleClick = () => {
    console.log(getLogMessages());
    // setConsoleData(getLogMessages()[0].message[0]);
  };
  return (
    <div className="flex flex-col gap-5 ">
      <button className="bg-blue-400 p-3" onClick={handleClick}>
        {text}
      </button>
      <ul>
        <li>
          <strong>OUTPUT: </strong>
          {consoleData?.title}
        </li>
      </ul>
    </div>
  );
}
