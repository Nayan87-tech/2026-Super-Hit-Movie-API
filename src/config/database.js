import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const movieHit = async() =>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`);
        console.log(`MongoDB connected`)
    }catch(error){
        console.error(`error`,error)
    }
}

export default movieHit;