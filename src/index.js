import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Firebase from "./components/Firebase";
import { GlobalProvider } from "./components/common/Context";

const fsvc = Firebase();

fsvc.getFirebase().then(() => {
  ReactDOM.render(
    <GlobalProvider fsvc={fsvc}>
      <App />
    </GlobalProvider>,
    document.getElementById("root")
  );
});
