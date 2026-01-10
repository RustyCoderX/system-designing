import net from "net";

const client = net.createConnection({port : 4000} ,() =>{
    console.log('connected to servver');
    client.write('hello from ayush mane');


    client.on('data',(data) =>{
        console.log('server says :',data.toString());
        client.end()
    })
})
