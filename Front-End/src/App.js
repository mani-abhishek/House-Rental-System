import React from "react";

import Home from "./Componets/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Componets/Login/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Home/>} />
      </Routes>
    </>
  );
}
