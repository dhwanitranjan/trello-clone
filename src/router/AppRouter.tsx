import React from "react";
import { Route, Routes } from "react-router-dom";
import DnD from "../projects/dnd/DnD";
import Login from "../projects/login/Login";
import { handleLogInDetails } from "../redux/global/global-slice";
import { useDispatch } from "react-redux";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const AppRouter = () => {
  const dispatch = useDispatch();

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      const decoded = jwtDecode(credentialResponse.credential as string);
      dispatch(handleLogInDetails(decoded));
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return (
    <Routes>
      <Route path="/" element={<DnD />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
