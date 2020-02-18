const net = require('net');
const whitelist = process.env.PROXY_WHITELIST;
const localport = process.env.PROXY_LOCAL_PORT;
const remoteport = process.env.PROXY_REMOTE_PORT;
const remotehost = process.env.PROXY_REMOTE_HOST;

console.log(`Proxy: ${whitelist}:${localport} -> ${remotehost}:${remoteport}`);

net.createServer((local) => {
    console.log('Connected!');

    // White list only your connection
    if (local.remoteAddress !== whitelist) {
        local.end();
        return;
    }

    const redirect = (source, destination) => {
        source.on('data', (data) => {
            const flushed = remote.write(data);
            if (!flushed) {
                source.pause();
            }
        });
        source.on('drain', () => {
            destination.resume();
        });
        source.on('close', () => {
            destination.end();
        });
    };

    // Redirect local connections to remote & remote to local
    const remote = new net.Socket();
    redirect(local, remote);
    redirect(remote, local);
    remote.connect(remoteport, remotehost);
}).listen(localport);
