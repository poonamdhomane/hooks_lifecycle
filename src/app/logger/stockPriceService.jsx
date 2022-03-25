import _ from "lodash";

function stockPriceService1() {
  const registeredTickers = {};
  let intervalId = null;

  function listenForPriceUpdates() {
    if (intervalId !== null) {
      return;
    }
    intervalId = setInterval(() => {
      getLatestTickData();
    }, 2000);
  }

  function fetchPricesForTicker(ticker) {
    switch ((ticker || "").toUpperCase()) {
      case "MSFT":
        return 150.05;
      case "NFLX":
        return 310.25;
      case "FB":
        return 200.18;
      case "AAPL":
        return 265.98;
      case "TSLA":
        return 320.41;
      default:
        return 0;
    }
  }

  function getLatestTickData() {
    // update prices
    _.each(_.keys(registeredTickers), (ticker) => {
      let percentChange =
        (registeredTickers[ticker].percentChange || 0) +
        (Math.floor(Math.random() * 100) % 2 ? 1 : -1) *
          (Math.random() * Math.random());

      // set boundaries
      percentChange =
        percentChange > 20
          ? percentChange - 10
          : percentChange < -20
          ? percentChange + 10
          : percentChange;

      registeredTickers[ticker].percentChange = percentChange;
      registeredTickers[ticker].price =
        fetchPricesForTicker(ticker) + percentChange;
    });

    _.each(_.keys(registeredTickers), (ticker) => {
      _.each(registeredTickers[ticker].subscribers, (subscriber) =>
        subscriber.call(subscriber, ticker, registeredTickers[ticker].price)
      );
    });
  }

  this.registerForPriceUpdates = function (ticker, callback) {
    if (!registeredTickers[ticker]) {
      registeredTickers[ticker] = {
        subscribers: [callback],
        percentChange: null,
      };
    } else {
      registeredTickers[ticker].subscribers.push(callback);
    }

    listenForPriceUpdates();

    // un-register callback
    return function () {
      let index = registeredTickers[ticker].subscribers.indexOf(callback);

      if (index > -1) {
        registeredTickers[ticker].subscribers.splice(index, 1);
        console.log(registeredTickers[ticker].subscribers.length);
      }

      if (registeredTickers[ticker].subscribers.length === 0) {
        delete registeredTickers[ticker];
      }

      if (_.keys(registeredTickers).length === 0) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  };
}

let stockPriceService = new stockPriceService1();
export default stockPriceService;
