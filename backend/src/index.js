import express, { urlencoded } from "express"
import connection from "./models/index.js"
import bookRoute from './routes/bookRoute.js'
import "dotenv/config.js"
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("Backend is working")
})

app.use("/book", bookRoute);

app.listen(process.env.PORT || 8000,async ()=>{
    console.log("Server is running at port 8000")

    try{
   await connection.authenticate();
   connection.sync();
    console.log("Succesfully connected to db")
    }
    catch(err){
        console.log("Error occured during connection to db:",err)
    }
})