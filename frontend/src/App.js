import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setdata] = useState([]);

  const [UserData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [ref, setref] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/get`)
      .then((res) => {
        console.log(res);
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const handle = (e) => {
    e.preventDefault();

    if (!UserData.name || !UserData.email || !UserData.password)
      return alert("please fill all the fields");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/Post`, UserData)
      .then((res) => {
        setref(!ref);
        alert(res.data);

        setUserData({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form onSubmit={handle}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={UserData.name}
          onChange={(e) => {
            setUserData({ ...UserData, name: e.target.value });
          }}
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="email"
          name="email"
          value={UserData.email}
          onChange={(e) => {
            setUserData({ ...UserData, email: e.target.value });
          }}
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="password"
          name="password"
          value={UserData.password}
          onChange={(e) => {
            setUserData({ ...UserData, password: e.target.value });
          }}
        />
        <br />
        <br />
        <button>click</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <></>
          ) : (
            <>
              {data.map((item, index) => {
                console.log(data);

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
