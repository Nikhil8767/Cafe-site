import app from "./app.js"
import cors from "cors"

app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        method:["post"],
        credentials:true,
    })
)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    
})