import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import stockPriceService from "./stockPriceService";
import "./tickerComponent.scss";
import logger from "./logger";

function TickerComponent(props) {
  const [ticker, setTicker] = useState(props.ticker);
  const [price, setPrice] = useState(null);
  const componentRef = useRef();
  const priceToDisplay = price ? price.toFixed(2) : "-";

  logger.info("TickerComponent", "Render");
  logger.info(
    "TickerComponent",
    `ticker:${ticker}, price:${priceToDisplay}`,
    "useState"
  );

  setTimeout(() => {
    componentRef.current.classList.add("render");
    setTimeout(() => {
      componentRef.current.classList.remove("render");
    }, 600);
  }, 50);

  const onTickerChange = (event) => {
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
    setPrice(null);
  };

  const onPriceChange = useCallback(
    function (registeredTicker, newPrice) {
      if (registeredTicker === ticker) {
        logger.info(
          "TickerComponent",
          `[price change notification] - setPrice(${newPrice.toFixed(2)})`,
          "useState"
        );
        setPrice(newPrice);
      }
    },
    [ticker]
  );

  useEffect(() => {
    logger.info(
      "TickerComponent ",
      `register for ${ticker} price updates`,
      "useEffect"
    );
    const unRegister = stockPriceService.registerForPriceUpdates(
      ticker,
      onPriceChange
    );
    return () => {
      logger.info(
        "TickerComponent",
        `(cleanup) unregister for ${ticker} price updates`,
        "useEffect"
      );
      unRegister();
    };
  }, [props.id, ticker, onPriceChange]);

  return (
    <div className="ticker" ref={componentRef}>
      <select id="lang" onChange={onTickerChange} value={ticker}>
        <option value="">Select</option>
        <option value="NFLX">NFLX</option>
        <option value="FB">FB</option>
        <option value="MSFT">MSFT</option>
        <option value="AAPL">AAPL</option>
      </select>
      <div>
        <div className="ticker-name">{ticker}</div>
        <div className="ticker-price">{priceToDisplay || "-"}</div>
      </div>
    </div>
  );
}

export default TickerComponent;
