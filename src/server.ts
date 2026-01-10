

import net from 'net';

const server = net.createServer((socket) => {
    console.log('client connected');

    socket.on('data' ,(data) =>{
        console.log('data :',data.toString());
        socket.write('hello from srevr')
    });

    socket.on('end',() =>{
        console.log('dissconnect')
    })
})


server.listen(4000,()=> console.log('server is running'))



