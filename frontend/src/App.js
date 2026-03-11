import React, { useEffect } from "react";
import axios from "axios";

function App() {
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/get`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return <></>;
}

export default App;
