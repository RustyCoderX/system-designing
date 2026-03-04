

import express from 'express';
import {} from './server/trpc.js'


const app = express();


app.use(express.json());

app.get('/',(req,res) =>{
    return res.json({status :'server is running'});
});


app.listen(3000 ,() => {
    console.log('server is running')
})