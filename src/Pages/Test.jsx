import React, { useState } from 'react';

function Test() {
  const [shown, setShown] = useState({});

  const handleToggle = (index) => {
    setShown((prevShown) => ({
      ...prevShown,  // Keep the current state for other items
      [index]: !prevShown[index],  // Toggle the current item
    }));
  };

  const items = ['Item 1', 'Item 2', 'Item 3'];
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <p onClick={() => handleToggle(index)}>{item}</p>
          {shown[index] && <p>Details about {item}</p>}
        </div>
      ))
      }
    </div>
  );
}

export default Test;





// import React, { useState, useRef, useEffect } from 'react';

// function Test() {
//   const [data, setData] = useState(null);
//   const isMountedRef = useRef(true);

//   useEffect(() => {
//     // Set isMountedRef to false when the component unmounts
//     return () => {
//       isMountedRef.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//       const result = await response.json();

//       if (isMountedRef.current) {
//         setData(result);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {data ? <p>{data.title}</p> : <p>Loading...</p>}
//     </div>
//   );
// }

// export default Test;
