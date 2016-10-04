fiddle-0016-Redis
======

![Screenshot](screenshot.png)

### Title

Redis _Hello World_


### Creation Date

06-30-16


### Location

[Odessa Ukraine](https://www.google.com.ua/maps/@46.5926263,30.7875891,14z?hl=en)


### Issue

[Issue 41](https://github.com/bradyhouse/house/issues/41)


### Description

This POC explores how to integrate node with [redis](http://redis.io/). It based on the `hello` example
discussed in chapter 7 of [Node.js the Right Way](https://pragprog.com/book/jwnode/node-js-the-right-way).
Alternately for more info regarding this book, checkout [http://www.pragmaticprogrammer.com/titles/jwnode](http://www.pragmaticprogrammer.com/titles/jwnode).


### Procedure

1.  Install redis using brew `brew install redis`
2.  After installing (or if already installed), get the path `brew list redis`

        /usr/local/Cellar/redis/3.2.0/bin/redis-benchmark
        /usr/local/Cellar/redis/3.2.0/bin/redis-check-aof
        /usr/local/Cellar/redis/3.2.0/bin/redis-check-rdb
        /usr/local/Cellar/redis/3.2.0/bin/redis-cli
        /usr/local/Cellar/redis/3.2.0/bin/redis-sentinel
        /usr/local/Cellar/redis/3.2.0/bin/redis-server
        /usr/local/Cellar/redis/3.2.0/homebrew.mxcl.redis.plist

3.  Startup redis-server using the redis-server path (above) `/usr/local/Cellar/redis/3.2.0/bin/redis-server`

        28624:C 30 Jun 19:26:27.055 # Warning: no config file specified, using the default config. In order to specify a config file use /usr/local/Cellar/redis/3.2.0/bin/redis-server /path/to/redis.conf
        28624:M 30 Jun 19:26:27.057 * Increased maximum number of open files to 10032 (it was originally set to 1024).
                        _._
                   _.-``__ ''-._
              _.-``    `.  `_.  ''-._           Redis 3.2.0 (00000000/0) 64 bit
          .-`` .-```.  ```\/    _.,_ ''-._
         (    '      ,       .-`  | `,    )     Running in standalone mode
         |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
         |    `-._   `._    /     _.-'    |     PID: 28624
          `-._    `-._  `-./  _.-'    _.-'
         |`-._`-._    `-.__.-'    _.-'_.-'|
         |    `-._`-._        _.-'_.-'    |           http://redis.io
          `-._    `-._`-.__.-'_.-'    _.-'
         |`-._`-._    `-.__.-'    _.-'_.-'|
         |    `-._`-._        _.-'_.-'    |
          `-._    `-._`-.__.-'_.-'    _.-'
              `-._    `-.__.-'    _.-'
                  `-._        _.-'
                      `-.__.-'

        28624:M 30 Jun 19:26:27.058 # Server started, Redis version 3.2.0
        28624:M 30 Jun 19:26:27.058 * The server is now ready to accept connections on port 6379

4.  Start a secondary terminal
5.  Install node project dependencies `npm install`
6.  Startup the rest service `npm start`

        > fiddle@0.1.0 start /Users/bradyhouse/github/house/fiddles/node/fiddle-0016-Redis
        > node --harmony ./app.js

7.  Start a third terminal session
8.  Test out the HTTP headers `curl -i -X HEAD http://localhost:3000/api/test`

        HTTP/1.1 200 OK
        X-Powered-By: Express
        Content-Type: application/json; charset=utf-8
        Content-Length: 21
        Set-Cookie: connect.sid=s%3A7IqrHn0HM4QsBVDNxIRGgxGB.88MLTizqgGdN7kkjfm9mL2EdfIF21dSd06zU8osdjuE; Path=/; HttpOnly
        Date: Thu, 30 Jun 2016 16:28:15 GMT
        Connection: keep-alive


### Published Version Link

N/A


### Tags

node.js, hamony, redis, connect-redis, express
