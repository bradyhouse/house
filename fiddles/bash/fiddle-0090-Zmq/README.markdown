fiddle-0090-Zmq
======

### Title

fiddle-0090-Zmq


### Creation Date

06-07-16


### Location

Chicago, IL


### Issue

[Issue 19](https://github.com/bradyhouse/house/issues/19)


### Description

POC exploring how to install and configure [zeromq](http://zeromq.org/).  The script automates the following steps:

    1. uninstall zeromq base library using home brew
    2. install the zeromq library using homebrew
    3. install the node zmq module using npm
    4. test the configuration using the node CLI

This recipe is based on the steps outlined at the beginning of Chapter 4 of Jim R. Wilson's book 
[Node.js the Right Way](https://pragprog.com/book/jwnode/node-js-the-right-way).


### STDOUT

Executing the `run.sh` script on a Mac Book Pro configured with [homebrew](https://github.com/Homebrew/brew) should 
produce the following output:


    ➜  fiddle-0090-Zmq git:(master) ✗ ./run.sh
    RUN.SH
    Bash version 3.2.57(1)-release...
    ├────BREWUPDATE
    Updated 1 tap (homebrew/core).
    ==> Updated Formulae
    imagemagick
    ├────BREWUPDATE
    Uninstalling zeromq... (64 files, 3.2M)
    ├────ZMQINSTALL
    ==> Downloading https://homebrew.bintray.com/bottles/zeromq-4.1.4.el_capitan.bottle.tar.gz
    Already downloaded: /Users/e13542/Library/Caches/Homebrew/zeromq-4.1.4.el_capitan.bottle.tar.gz
    ==> Pouring zeromq-4.1.4.el_capitan.bottle.tar.gz
    🍺  /usr/local/Cellar/zeromq/4.1.4: 64 files, 3.2M
    |
    > zmq@2.15.3 install /Users/e13542/github/node_modules/zmq
    > node-gyp rebuild
    
    2016-06-07 21:27:54.228 xcodebuild[20570:86775] [MT] DVTPlugInManager: Required plug-in compatibility UUID C4A681B0-4A26-480E-93EC-1218098B9AA0 for IDEInterfaceBuilderCocoaTouchEditingSupport.ideplugin (com.apple.dt.IDE.IDEInterfaceBuilderCocoaTouchEditingSupport) not present
    2016-06-07 21:27:54.229 xcodebuild[20570:86775] [MT] DVTPlugInManager: Required plug-in compatibility UUID C4A681B0-4A26-480E-93EC-1218098B9AA0 for IDEiOSDebugger.ideplugin (com.apple.dt.IDE.IDEiOSDebugger) not present
    2016-06-07 21:27:54.230 xcodebuild[20570:86775] [MT] DVTPlugInManager: Required plug-in compatibility UUID C4A681B0-4A26-480E-93EC-1218098B9AA0 for IDEiOSSupportCore.ideplugin (com.apple.dt.IDE.IDEiOSSupportCore) not present
    2016-06-07 21:27:54.230 xcodebuild[20570:86775] [MT] DVTPlugInManager: Required plug-in compatibility UUID C4A681B0-4A26-480E-93EC-1218098B9AA0 for IDEiPhoneSupport.ideplugin (com.apple.dt.IDE.IDEiPhoneSupport) not present
      CXX(target) Release/obj.target/zmq/binding.o
      SOLINK_MODULE(target) Release/zmq.node
    zmq@2.15.3 ../../../../../node_modules/zmq
    ├── bindings@1.2.1
    └── nan@2.3.5
    { ZMQ_CAN_DISCONNECT: 1,
      ZMQ_CAN_UNBIND: 1,
      ZMQ_CAN_MONITOR: 1,
      ZMQ_CAN_SET_CTX: 1,
      ZMQ_PUB: 1,
      ZMQ_SUB: 2,
      ZMQ_XPUB: 9,
      ZMQ_XSUB: 10,
      ZMQ_REQ: 3,
      ZMQ_XREQ: 5,
      ZMQ_REP: 4,
      ZMQ_XREP: 6,
      ZMQ_DEALER: 5,
      ZMQ_ROUTER: 6,
      ZMQ_PUSH: 8,
      ZMQ_PULL: 7,
      ZMQ_PAIR: 0,
      ZMQ_STREAM: 11,
      ZMQ_POLLIN: 1,
      ZMQ_POLLOUT: 2,
      ZMQ_POLLERR: 4,
      ZMQ_SNDMORE: 2,
      STATE_READY: 0,
      STATE_BUSY: 1,
      STATE_CLOSED: 2,
      zmqVersion: [Function: zmqVersion],
      zmqCurveKeypair: [Function: zmqCurveKeypair],
      Context:
       { [Function]
         setMaxThreads: [Function],
         getMaxThreads: [Function],
         setMaxSockets: [Function],
         getMaxSockets: [Function] },
      SocketBinding: [Function],
      path: '/Users/e13542/github/node_modules/zmq/build/Release/zmq.node',
      version: '4.1.4',
      curveKeypair: [Function: zmqCurveKeypair],
      types:
       { pub: 1,
         xpub: 9,
         sub: 2,
         xsub: 10,
         req: 3,
         xreq: 5,
         rep: 4,
         xrep: 6,
         push: 8,
         pull: 7,
         dealer: 5,
         router: 6,
         pair: 0,
         stream: 11 },
      ZMQ_HWM: 1,
      ZMQ_SWAP: 3,
      ZMQ_AFFINITY: 4,
      ZMQ_IDENTITY: 5,
      ZMQ_SUBSCRIBE: 6,
      ZMQ_UNSUBSCRIBE: 7,
      ZMQ_RATE: 8,
      ZMQ_RECOVERY_IVL: 9,
      ZMQ_MCAST_LOOP: 10,
      ZMQ_SNDBUF: 11,
      ZMQ_RCVBUF: 12,
      ZMQ_RCVMORE: 13,
      ZMQ_FD: 14,
      ZMQ_EVENTS: 15,
      ZMQ_TYPE: 16,
      ZMQ_LINGER: 17,
      ZMQ_RECONNECT_IVL: 18,
      ZMQ_BACKLOG: 19,
      ZMQ_RECOVERY_IVL_MSEC: 20,
      ZMQ_RECONNECT_IVL_MAX: 21,
      ZMQ_MAXMSGSIZE: 22,
      ZMQ_SNDHWM: 23,
      ZMQ_RCVHWM: 24,
      ZMQ_MULTICAST_HOPS: 25,
      ZMQ_RCVTIMEO: 27,
      ZMQ_SNDTIMEO: 28,
      ZMQ_IPV4ONLY: 31,
      ZMQ_LAST_ENDPOINT: 32,
      ZMQ_ROUTER_MANDATORY: 33,
      ZMQ_TCP_KEEPALIVE: 34,
      ZMQ_TCP_KEEPALIVE_CNT: 35,
      ZMQ_TCP_KEEPALIVE_IDLE: 36,
      ZMQ_TCP_KEEPALIVE_INTVL: 37,
      ZMQ_TCP_ACCEPT_FILTER: 38,
      ZMQ_DELAY_ATTACH_ON_CONNECT: 39,
      ZMQ_XPUB_VERBOSE: 40,
      ZMQ_ROUTER_RAW: 41,
      ZMQ_IPV6: 42,
      ZMQ_MECHANISM: 43,
      ZMQ_PLAIN_SERVER: 44,
      ZMQ_PLAIN_USERNAME: 45,
      ZMQ_PLAIN_PASSWORD: 46,
      ZMQ_CURVE_SERVER: 47,
      ZMQ_CURVE_PUBLICKEY: 48,
      ZMQ_CURVE_SECRETKEY: 49,
      ZMQ_CURVE_SERVERKEY: 50,
      ZMQ_ZAP_DOMAIN: 55,
      ZMQ_IO_THREADS: 1,
      ZMQ_MAX_SOCKETS: 2,
      options:
       { _fd: 14,
         _ioevents: 15,
         _receiveMore: 13,
         _subscribe: 6,
         _unsubscribe: 7,
         affinity: 4,
         backlog: 19,
         hwm: 1,
         identity: 5,
         linger: 17,
         mcast_loop: 10,
         rate: 8,
         rcvbuf: 12,
         last_endpoint: 32,
         reconnect_ivl: 18,
         recovery_ivl: 9,
         sndbuf: 11,
         swap: 3,
         mechanism: 43,
         plain_server: 44,
         plain_username: 45,
         plain_password: 46,
         curve_server: 47,
         curve_publickey: 48,
         curve_secretkey: 49,
         curve_serverkey: 50,
         zap_domain: 55 },
      events:
       { '1': 'connect',
         '2': 'connect_delay',
         '4': 'connect_retry',
         '8': 'listen',
         '16': 'bind_error',
         '32': 'accept',
         '64': 'accept_error',
         '128': 'close',
         '256': 'close_error',
         '512': 'disconnect' },
      Socket:
       { [Function]
         super_:
          { [Function: EventEmitter]
            EventEmitter: [Circular],
            usingDomains: false,
            defaultMaxListeners: 10,
            init: [Function],
            listenerCount: [Function] } },
      createSocket: [Function],
      socket: [Function],
      proxy: [Function: proxy] }
    └──ZMQ CONFIGURED


### Tags

bash, brew, node, npm, zeromq, zmq
