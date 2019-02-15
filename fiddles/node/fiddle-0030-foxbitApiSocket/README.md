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
endpoint via web socket. Each time a message is received, a file on the local file system should be updated. 


### Use Case<a name="use-case"></a>

1.  Install all dependencies `npm install`
2.  Startup the service `npm start`
3.  This should produce following on output on the command line --


    17:37:47	Connected
    17:37:47	Sending request ...
    { m: 0, i: 0, n: 'SubscribeLevel1', o: '{"OMSId":1,"InstrumentId":1}' }
    17:37:49	message received.
    '{ "OMSId":1, "InstrumentId":1, "BestBid":13364.01, "BestOffer":13471.95, "LastTradedPx":13471.22, "LastTradedQty":0
    17:38:24	level1-response.json updated.

   
   The [level1-response.json](#response) file is updated with the package returned.


### Level1 Response File <a name="response"></a>

When a message is received via the web socket (see [Use Case](#use-case)), the contents of the [level1-response.json](level1-response.json) 
file (see below) is updated. For further details, see [Foxbit Exchange API Level1](https://docs.foxbit.com.br/EN/websocket_intro.html#subscribelevel1) documentation.

      {
          "OMSId": 1,
          "InstrumentId": 1,
          "BestBid": 13368.05,
          "BestOffer": 13469,
          "LastTradedPx": 13369.29,
          "LastTradedQty": 0.05985,
          "LastTradeTime": 1550188096345,
          "SessionOpen": 13390.97,
          "SessionHigh": 13598,
          "SessionLow": 13360.02,
          "SessionClose": 13467.42,
          "Volume": 0.05985,
          "CurrentDayVolume": 86.49189406,
          "CurrentDayNumTrades": 649,
          "CurrentDayPxChange": -98.13,
          "Rolling24HrVolume": 86.52728059,
          "Rolling24NumTrades": 652,
          "Rolling24HrPxChange": -0.7286473578458234762114792600,
          "TimeStamp": "1550188096344"
      }


### Level1 Request File<a name="request"></a>

The [level1-request](level1-request.json) file (see below) is used to tell the API which instrument you want to monitor.
OMSId 1 maps to symbol `BTCUSD`. For further details, see [Foxbit Exchange API Level1](https://docs.foxbit.com.br/EN/websocket_intro.html#subscribelevel1) documentation.

     {
       "m":0,                                  // MessageType ( 0_Request / 1_Reply / 2_Subscribe / 3_Event / 4_Unsubscribe / Error )
       "i":0,                                  // Sequence Number
       "n":"SubscribeLevel1",                  // Endpoint
       "o": "{\"OMSId\":1,\"InstrumentId\":1}" // Payload
     }



### Tags

node.js, fs, moment, prettify-js, ws
