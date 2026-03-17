

import {z} from "zod";


const userSchema = z.object({
    name : z.string(),
    age : z.number()
});

const data = {
    name : 'ayush',
    age : 21
}




const result = userSchema.safeParse(data);

if(result.success){
    console.log('valid data',result.data);
}else {
    console.log('invalid data')
}