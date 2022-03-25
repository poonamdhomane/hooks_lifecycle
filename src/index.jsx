import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef } from "react";

import "./index.scss";
import logger from "./app/logger/logger";
import TickerComponent from "./app/logger/tickerComponent";

function App() {
  const [theme, setTheme] = useState("dark");
  const componentRef = useRef();

  logger.info(`App`, `Render`);

  setTimeout(() => {
    componentRef.current.classList.add("render");
    setTimeout(() => {
      componentRef.current.classList.remove("render");
    }, 1000);
  }, 50);

  const onThemeChanged = (theme) => {
    logger.info("App", `user action - theme selection changed (${theme})`);
    logger.info("App", `setTheme: ${theme}`);
    setTheme(theme);
  };

  return (
    <div className="app" ref={componentRef}>
      <div style={{ padding: "20px 5px 5px 10px" }}>
        <label>
          <span style={{ color: "grey" }}>Select Theme:&nbsp;</span>
        </label>
        <label>
          <input
            type="radio"
            value="dark"
            checked={theme === "dark"}
            onChange={() => onThemeChanged("dark")}
          />
          Dark
        </label>
        &nbsp;&nbsp;
        <label>
          <input
            type="radio"
            value="light"
            checked={theme === "light"}
            onChange={() => onThemeChanged("light")}
          />
          Light
        </label>
      </div>
      <TickerComponent id={1} theme={theme} />
      <TickerComponent id={2} theme={theme} />
    </div>
  );
}

const rootElement = document.getElementById("root");
window.mount = () => {
  logger.clear();
  logger.info("Index", "Mounting App Component");
  document.getElementById("btnMount").disabled = true;
  document.getElementById("btnUnmount").disabled = false;
  ReactDOM.render(<App />, rootElement);
};

window.unmount = () => {
  logger.info("Index", "Unmounting App Component");
  document.getElementById("btnMount").disabled = false;
  document.getElementById("btnUnmount").disabled = true;
  ReactDOM.unmountComponentAtNode(rootElement);
};
