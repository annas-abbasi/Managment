import React, { useState, useRef, useEffect } from 'react';

function Test() {
  const [data, setData] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Set isMountedRef to false when the component unmounts
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const result = await response.json();

      if (isMountedRef.current) {
        setData(result);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data ? <p>{data.title}</p> : <p>Loading...</p>}
    </div>
  );
}

export default Test;
