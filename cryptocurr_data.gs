/*
// Bitcoin Balance
function walletBalance(x) {
  //var t = "1CaXM1R3UnAjXx7zWixoVE6GfJqwhMfz6";
  var url = "https://blockchain.info/q/addressbalance/" + x;
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var price = data / 100000000;
  return price;
}
*/


// Returns the last price for currency in CURRBASE pair format, e.g.:
// "ZEC";
// "ZECBTC";
// "ZECUSD";
// "ZECUSDT";
function getPairLastPrice(pair) {
  if (pair == null) {
    return null;
  }
  //var pair = "ZEC";
  //pair = "ZECBTC";
  //var pair = "ZECUSD";
  //var pair = "ZECUSDT";
  var curr = "N/A";
  var base = "N/A";
  //  return text.replace(/\w\S*/g, function(word) { return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(); });
  
  if (pair.substr(-4) == "USDT") {
    base = "USDT";
    curr = pair.replace(base, "");
  } else switch (pair.substr(-3)) {
    case "USD":
    case "EUR":
    case "BTC":
      base = pair.substr(-3)
      curr = pair.replace(base, "");
      break;
    default:
      base = "BTC";
      curr = pair;
  }
  return getLastPrice(curr, base);
}


// Returns the last price for currency `curr' in currency `base'
function getLastPrice(curr, base) {
  var json = getPoloniexData_();
  var poloData = JSON.parse(json);
  return poloData[base + "_" + curr]["last"];
  /*
  var cache = CacheService.getScriptCache();
  var time = cache.get("cryptocurrencies-polo-data-time");
  return base + "_" + curr + " (" + time + ") : " + poloData[base + "_" + curr]["last"];  
  */
}

function getDataRefreshedTime() {
  var cache = CacheService.getScriptCache();
  return cache.get("cryptocurrencies-polo-data-time");
}

function getPoloniexData_() {  
  var cache = CacheService.getScriptCache();
  var cached = cache.get("cryptocurrencies-polo-data");
  if (cached != null) {
    return cached;
  }
  var url = "https://poloniex.com/public?command=returnTicker";
  var response = UrlFetchApp.fetch(url);  // Max. 6 calls per sec from one IP
  var json = response.getContentText();
  cache.put("cryptocurrencies-polo-data", json, 60); // cache for 1 minute
  var d = new Date();
  cache.put("cryptocurrencies-polo-data-time", d.toLocaleTimeString());
  return json;
}



