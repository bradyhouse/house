fiddle-0030-foxbitApiSocket
======

### Title

Foxbit Exchange Api WebSocket


### Creation Date

02-14-19


### Location

Chicago, IL


### Issue

N/A


### Description

Fiddle exploring how to subscribe to the [Foxbit Exchange API Level1](https://docs.foxbit.com.br/EN/websocket_intro.html#subscribelevel1) 
endpoint via web socket. Each time a message is received, a file on the local file system is updated. 


### Procedure

1.  Install all dependencies `npm install`
2.  Startup the service `npm start`
3.  This should produce following on output on the command line --


    17:37:47	Connected
    17:37:47	Sending request ...
    17:37:49	message received.
    '{ "OMSId":1, "InstrumentId":1, "BestBid":13364.01, "BestOffer":13471.95, "LastTradedPx":13471.22, "LastTradedQty":0.03859542, "LastTradeTime":1550186862760, "SessionOpen":13390.97, "SessionHigh":13598, "SessionLow":13360.02, "SessionClose":13467.42, "Volume":0.03859542, "CurrentDayVolume":84.91343282, "CurrentDayNumTrades":642, "CurrentDayPxChange":3.80, "Rolling24HrVolume":86.33570947, "Rolling24NumTrades":656, "Rolling24HrPxChange":0.0372042319256865888769000300, "TimeStamp":"1550186862767" }'
    17:37:49	data.json updated.
    17:38:05	message received.
    '{ "OMSId":1, "InstrumentId":1, "BestBid":13364, "BestOffer":13471.95, "LastTradedPx":13471.22, "LastTradedQty":0.03859542, "LastTradeTime":1550186862760, "SessionOpen":13390.97, "SessionHigh":13598, "SessionLow":13360.02, "SessionClose":13467.42, "Volume":0.03859542, "CurrentDayVolume":84.91343282, "CurrentDayNumTrades":642, "CurrentDayPxChange":3.80, "Rolling24HrVolume":86.33570947, "Rolling24NumTrades":656, "Rolling24HrPxChange":0.0372042319256865888769000300, "TimeStamp":"1550186862767" }'
    17:38:05	data.json updated.
    17:38:06	message received.
    '{ "OMSId":1, "InstrumentId":1, "BestBid":13364.01, "BestOffer":13471.95, "LastTradedPx":13471.22, "LastTradedQty":0.03859542, "LastTradeTime":1550186862760, "SessionOpen":13390.97, "SessionHigh":13598, "SessionLow":13360.02, "SessionClose":13467.42, "Volume":0.03859542, "CurrentDayVolume":84.91343282, "CurrentDayNumTrades":642, "CurrentDayPxChange":3.80, "Rolling24HrVolume":86.33570947, "Rolling24NumTrades":656, "Rolling24HrPxChange":0.0372042319256865888769000300, "TimeStamp":"1550186862767" }'
    17:38:06	data.json updated.
    17:38:24	message received.
    '{ "OMSId":1, "InstrumentId":1, "BestBid":13364, "BestOffer":13471.95, "LastTradedPx":13471.22, "LastTradedQty":0.03859542, "LastTradeTime":1550186862760, "SessionOpen":13390.97, "SessionHigh":13598, "SessionLow":13360.02, "SessionClose":13467.42, "Volume":0.03859542, "CurrentDayVolume":84.91343282, "CurrentDayNumTrades":642, "CurrentDayPxChange":3.80, "Rolling24HrVolume":86.33570947, "Rolling24NumTrades":656, "Rolling24HrPxChange":0.0372042319256865888769000300, "TimeStamp":"1550186862767" }'
    17:38:24	data.json updated.
   
    ...

   And the [data.json](data.json) file should then be overwritten (aka updated) at the indicated interval
  

### Published Version Link

N/A


### Tags

node.js, fs, moment, ws
