const server = require('net').createServer(connection => {
    console.log('subscriber connected');
    const firstChunk = '{"type": "changed", "timesta';
    const secondChunk = 'mp": 1569784254661}\n';

    connection.write(firstChunk);
    
    const timer = setTimeout(() => {
        connection.write(secondChunk);
        connection.end();
    }, 100);

    connection.on('end', () => {
        clearTimeout(timer);
        console.log('Subscriber disconnected');
    });
});

server.listen(1841, () => {
    console.log('Test server listening for subscribers ...');
});
