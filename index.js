const net = require('net');
const whitelist = process.env.PROXY_WHITELIST;
const localport = process.env.PROXY_LOCAL_PORT;
const remoteport = process.env.PROXY_REMOTE_PORT;
const remotehost = process.env.PROXY_REMOTE_HOST;
const socketIO = require('socket.io');
const express = require('express');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: '/' }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});

console.log(`Proxy: ${whitelist}:${localport} -> ${remotehost}:${remoteport}`);


//
// net.createServer((local) => {
//     console.log('Connected!', local.remoteAddress);
//
//         // White list only your connection
//     if (local.remoteAddress !== whitelist) {
//         local.end();
//         return;
//     }
//
//     console.log('Creating tunnel');
//
//     const redirect = (source, destination) => {
//         source.on('data', (data) => {
//             const flushed = remote.write(data);
//             if (!flushed) {
//                 source.pause();
//             }
//         });
//         source.on('drain', () => {
//             destination.resume();
//         });
//         source.on('close', () => {
//             destination.end();
//         });
//     };
//
//     // Redirect local connections to remote & remote to local
//     const remote = new net.Socket();
//     redirect(local, remote);
//     redirect(remote, local);
//     remote.connect(remoteport, remotehost, () => {
//         console.log('Connected to target!');
//     });
//
// }).listen(3000);

console.log(process.env.PORT || 80);