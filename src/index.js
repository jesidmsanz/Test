import React from "react";
import ReactDOM from "react-dom";
import App from "./components/props-pruebas/uno";
import Form from "./components/form-eventos/form";
import CallApi from "./components/callApi/callApi";
import Inventary from "./components/invetary/inventary";

ReactDOM.render(
  <React.StrictMode>
    <Inventary />
  </React.StrictMode>,
  document.getElementById("root")
);
