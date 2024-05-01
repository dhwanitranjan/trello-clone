import React from "react";
import "./App.css";
import TopNav from "./components/TopNav";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <div className="position-relative app-container">
      <GoogleOAuthProvider clientId={id as string}>
        <BrowserRouter>
          <TopNav />
          <AppRouter />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
