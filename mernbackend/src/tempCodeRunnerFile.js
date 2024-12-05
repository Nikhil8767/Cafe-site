const express =require ("express");
const mongoose = require("mongoose");
const connectdatabase = require("./db/conn.js");
const app=express();
const hbs=require("hbs");
require("./db/conn.js")
const path=require("path");
const register=require("./models/user-register.js");
const { error, log } = require("console");

const port =process.env.PORT || 3000
const static_path=path.join(__dirname,"../public");
const   template_path=path.join(__dirname,"../templates/views");
const   partials_path=path.join(__dirname,"../templates/partials");

console.log(template_path);

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    // res.send("this is just a basic function ")
    res.render("index.hbs")
});

app.get("/user-register",(req,res)=>{
    res.render("register")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/user-register",async(req,res)=>{
   try {
    // const{firstname,lastname,email,gender,phone,age,password,confirmpassword}=req.body;
    console.log(req.body);
    // res.send(req.body.firstname)
    const a=req.body.password;
    const b=req.body.confirmpassword;
    if(a===b){
        const userregister=new register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            gender:req.body.gender,
            phone:req.body.phone,
            age:req.body.age,
            password:req.body.password,//yesa bhi likh sakte hai
            confirmpassword:req.body.confirmpassword
        });
        await userregister.save();
        res.status(201).render("index");

    }
    else{
        res.send("passwords are not matching")
    }
    
   } catch (error) {
    res.status(400).send(error);
    console.log(error);
   }

})


//login page post****************
app.post("/login",async(req,res)=>{
   try {
    const email=req.body.email;
    const password=req.body.password;
    // console.log(`${email} is and the password is ${password}`)
    const useremail=await register.findOne({email:email})
    res.send(useremail)
    console.log(useremail);
   } catch (error) {
    res.status(400).send("invalid email")
    
   }
})


//for connection a data base we have to wirte here the function which we are using and the 
//as we have wrote here connectdatabase and also before in server folder we did same so this will
//only make the connection connect the data base
connectdatabase().then(()=>{ 
app.listen(port,()=>{
    console.log(`lets listen to port ${port}`);
});
})
.catch((error)=>{
console.log("failed to poort");
})


