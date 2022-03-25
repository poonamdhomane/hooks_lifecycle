function stockPriceService() {
  this.fetchPricesForTicker = function (ticker) {
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
        return null;
    }
  };
}

module.exports = new stockPriceService();
