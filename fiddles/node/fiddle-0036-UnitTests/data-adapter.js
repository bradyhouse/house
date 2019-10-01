'use strict';

const EventEmitter = require('events').EventEmitter;

class DataAdapter extends EventEmitter {
    constructor(stream) {
        super();
        let buffer = '';
        stream.on('data', data => {
            buffer += data;
            let boundary = buffer.indexOf('\n');
            while (boundary !== -1) {
                const input = buffer.substring(0, boundary);
                this.emit('message', JSON.parse(input));
                boundary = buffer.indexOf('\n');
            }
        });
    }

    static connect(stream) {
        return new DataAdapter(stream);
    }
}

module.exports = DataAdapter;
