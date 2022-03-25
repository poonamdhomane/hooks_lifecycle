import React from "react";
import { useState, useRef } from "react";
import stockPriceService from "./stockPriceService";
import "./tickerComponent.scss";
import logger from "./logger";

function TickerComponent(props) {
  const [ticker, setTicker] = useState("AAPL");
  const currentPrice = stockPriceService.fetchPricesForTicker(ticker);
  const componentRef = useRef();

  logger.info(`TickerComponent (${props.id})`, `Render`);
  logger.info(`TickerComponent (${props.id})`, `ticker: ${ticker}`, "useState");

  setTimeout(() => {
    componentRef.current.classList.add("render");
    setTimeout(() => {
      componentRef.current.classList.remove("render");
    }, 1000);
  }, 50);

  const onChange = (event) => {
    logger.info(
      `TickerComponent (${props.id})`,
      `[user action] - new ticker selected (${event.target.value})`
    );
    logger.info(
      `TickerComponent (${props.id})`,
      `setTicker: ${event.target.value}`,
      "useState"
    );
    setTicker(event.target.value);
  };

  return (
    <div className={`ticker ${props.theme}`} ref={componentRef}>
      <select id="lang" onChange={onChange} value={ticker}>
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
