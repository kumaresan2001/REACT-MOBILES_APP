import { useEffect, useState } from "react";

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mobiles"
          element={
            <ProtectedRoute>
              <PhoneList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? (
    <section>
      <h1>The is a protected {children}</h1>
    </section>
  ) : (
    <Navigate replace to="/" />
  );
}
function checkauth(res) {
  if (res.status === 401) {
    throw Error("unauthorized");
  } else {
    return res.json();
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "/"; //refresh
}

function PhoneList() {
  const [mobileList, setMobileList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/mobiles", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => checkauth(res))
      .then((data) => setMobileList(data))
      .catch((err) => logout());
  }, []);
  return (
    <div className="phone-list-container">
      {mobileList.map((mbl, index) => (
        <Phone key={index} mobile={mbl} />
      ))}
    </div>
  );
}

function Phone({ mobile }) {
  // const mobile = {
  //   model: "OnePlus 9 5G",
  //   img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  //   company: "Oneplus",
  // };
  return (
    <div className="phone-container">
      <img className="phone-picture" src={mobile.img} alt={mobile.model} />
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="phone-company">{mobile.company}</p>
    </div>
  );
}

export default App;
