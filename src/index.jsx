import React from "react";
import ReactDOM from "react-dom";
import logger from "./app/logger/logger";
import TickerComponent from "./app/logger/tickerComponent";

import "./index.scss";

function App() {
  return (
    <>
      <TickerComponent id={1} ticker="AAPL" />
    </>
  );
}

const rootElement = document.getElementById("root");
window.mount = () => {
  logger.clear();
  logger.info("Index", "Mounting Ticker Component");
  document.getElementById("btnMount").disabled = true;
  document.getElementById("btnUnmount").disabled = false;
  ReactDOM.render(<App />, rootElement);
};

window.unmount = () => {
  logger.info("Index", "Unmounting Ticker Component");
  document.getElementById("btnMount").disabled = false;
  document.getElementById("btnUnmount").disabled = true;
  ReactDOM.unmountComponentAtNode(rootElement);
};
