# util
Various utilities

### 1. cryptocurr_data.gs
Google Sheet script for fetching real-time Cryptocurrencies data (currently only price from Poloniex)

#### function getPairLastPrice(pair)
Returns the last price for currency in `CURRBASE` pair format, e.g.:  
`"ZECBTC"`  
`"ZECUSD"`  
`"ZECUSDT"`  

Example usage:  
`=getPairLastPrice("ZECUSD")`

If omitted, "BTC" will be used as base, e.g.:
`"ZEC"`  

#### function getLastPrice(curr, base)
Returns the last price for currency `curr` in currency `base`.

Example usage:  
`=getLastPrice("ZEC", "BTC")`

#### function getDataRefreshedTime()
Returns the time when the price data was fetched last time.


