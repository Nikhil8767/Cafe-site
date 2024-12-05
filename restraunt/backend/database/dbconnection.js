import mongoose from "mongoose";

export const dbconnection=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        dbName:"cafe",
    })
    .then(()=>{
        console.log("connected to database successfully ");
    })
    .catch(err=>{
        console.log(`some error has occured int the database ${err}`);
        
    })
}