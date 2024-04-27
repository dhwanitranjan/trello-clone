import React from "react";
import { Route, Routes } from "react-router-dom";
import DnD from "../projects/dnd/DnD";
import Login from "../components/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DnD />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
