const events = require('events'),
    util = require('util'),
    clientBuffer = function(stream) {
        // call super()
        events.EventEmitter.call(this);
        var self = this,
            buffer = '';
        stream.on('data', function(data) {
            buffer += data;
            var boundary = buffer.indexOf('\n');
            while(boundary !== -1) {
                var input = buffer.substr(0, boundary);
                buffer = buffer.substr(boundary + 1);
                self.emit('message', JSON.parse(input));
                boundary = buffer.indexOf('\n');
            }
        })
    };
// assign prototype parent
util.inherits(clientBuffer, events.EventEmitter);
// expose module methods
exports.ClientBuffer = clientBuffer;
exports.connect = function(stream) {
    return new clientBuffer(stream);
}
