import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DnD from "../projects/dnd/DnD";
import Login from "../projects/login/Login";
import { handleLogInDetails } from "../redux/global/global-slice";
import { useDispatch } from "react-redux";

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      handleLogInDetails(localStorage.getItem("loginUserDetails") || "")
    );
  }, []);
  return (
    <Routes>
      <Route path="/" element={<DnD />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
