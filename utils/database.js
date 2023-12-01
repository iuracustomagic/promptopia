import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true);
    if(isConnected) {
        console.log('MongoDb is already connected')
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            // useUnifieldTopology: true
        })
        isConnected = true;
        console.log('Mongodb connected')

    }catch (e) {
        console.log(e)
    }
}
