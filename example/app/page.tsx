"use client";
import { useEffect, useState } from "react";
import { getLogMessages } from "ashra-log";

export default function Home() {
  /** I'm trying to do as like the same real world project */
  const [data, setData] = useState([]);
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        const res = await response.json();
        console.log(res);
        setData(res);
      } catch (error) {
        console.log("error", error);
      }
    };
    return () => {
      fetchData();
    };
  }, []);

  console.log("data: ", data);
  return (
    <>
      <h1>Let's see the simple example of log capture</h1>
      <button onClick={() => setLogData(getLogMessages() as [])}>render</button>
      <ul>
        {logData.map((value: any, index) => {
          if (value && value[1] && value[1].title) {
            return <li key={index}>{value[1].title}</li>;
          } else {
            return <li key={index}>Post title not found!</li>;
          }
        })}
      </ul>
    </>
  );
}
