import React from "react";
import "./App.css";
import TopNav from "./components/TopNav";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(id);
  return (
    <div className="position-relative app-container">
      <GoogleOAuthProvider clientId="249262342319-ipaikruevk5ric0t4la71ff6o8k92446.apps.googleusercontent.com">
        <BrowserRouter>
          <TopNav />
          <AppRouter />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
