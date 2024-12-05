const mongoose =require ("mongoose");

const URI=("mongodb+srv://nikhilgupta932003:nikhilgupta@cluster0.k6s0eab.mongodb.net/login?retryWrites=true&w=majority&appName=cluster0");

mongoose.connect(URI);

const connectdatabase=async()=>{
    try{
        await mongoose.connect(URI);
        console.log("connection successful");
    }catch(error){
        console.log("failed");
        process.exit(0);
    }
}

module.exports=connectdatabase;
