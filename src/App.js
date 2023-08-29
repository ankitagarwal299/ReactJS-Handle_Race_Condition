import "./styles.css";
import React, { useState, useEffect } from "react";

const getRandomTime = () => Math.floor(Math.random() * 3000);

function getRandomData(data) {
  return new Promise((res, rej) => {
    const time = getRandomTime();
    setTimeout(() => {
      res(data);
    }, time);
  });
}

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState("");

  const onChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  /* Using flag -1*/
  // useEffect(() => {
  //   let flag = true;

  //   getRandomData(searchText).then((response) => {
  //     if (flag) {
  //       setResult(response);
  //     }
  //   });

  //   return () => {
  //     flag = false;
  //   };
  // }, [searchText]);

  /* Using AbortController -2*/
  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        let resp = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${props.id}`,
          {
            signal: abortController.signal
          }
        );
        resp = await resp.json();
        setResult(resp);
      } catch (error) {
        // abort controller throws error when aborted
        // thus it needs to be handled
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [searchText]);

  return (
    <div className="App">
      <input
        name="search"
        placeholder="search"
        value={searchText}
        onChange={onChange}
      />
      <div>{result}</div>
    </div>
  );
}
/*
//https://learnersbucket.com/examples/interview/handle-race-condition-in-react/

We can fix this in two ways

Handling the race condition in useEffect hook using flag.
Cancelling the API request using AbortController().
*/
