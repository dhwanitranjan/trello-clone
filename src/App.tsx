import React from "react";
import "./App.css";
import TopNav from "./components/TopNav";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="position-relative app-container">
      <BrowserRouter>
        <TopNav />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
