import React from "react";
import { useState, useRef } from "react";
import stockPriceService from "./stockPriceService";
import "./tickerComponent.scss";
import logger from "./logger";

function TickerComponent() {
  const [ticker, setTicker] = useState("AAPL");
  const currentPrice = stockPriceService.fetchPricesForTicker(ticker);
  const componentRef = useRef();

  logger.info("TickerComponent", "Begin Render");
  logger.info("TickerComponent", `ticker= ${ticker}`, "useState");

  // highlight when this component is (re)-rendered
  setTimeout(() => {
    componentRef.current.classList.add("render");
    setTimeout(() => {
      componentRef.current.classList.remove("render");
    }, 1000);
  }, 50);

  const onChange = (event) => {
    logger.info(
      "TickerComponent",
      `[user action] - new ticker selected (${event.target.value})`
    );
    logger.info(
      "TickerComponent",
      `setTicker: ${event.target.value}`,
      "useState"
    );
    setTicker(event.target.value);
  };

  return (
    <div className="ticker" ref={componentRef}>
      <select onChange={onChange} value={ticker}>
        <option value="">Select</option>
        <option value="NFLX">NFLX</option>
        <option value="FB">FB</option>
        <option value="MSFT">MSFT</option>
        <option value="AAPL">AAPL</option>
      </select>
      <div>
        <div className="ticker-name">{ticker}</div>
        <div className="ticker-price">{currentPrice}</div>
      </div>
    </div>
  );
}

export default TickerComponent;
