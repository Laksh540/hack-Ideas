import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PageLogin from "./Page/PageLogin/PageLogin";
import { BrowserRouter } from "react-router-dom";

function App(props: any) {
  return (
    <div>
      <BrowserRouter>
        <PageLogin {...props} />
      </BrowserRouter>
    </div>
  );
}

export default App;
