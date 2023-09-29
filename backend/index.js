const express = require("express")
const app= express();
const cors=require("cors")
// const fetch = require("node-fetch");
const mainRoute=require("./routes/main.route");
const {openai}=require("./openai")


require("dotenv").config();
app.use(express.json());
app.use(cors())

app.use("/main",mainRoute);


app.listen(process.env.port,async()=>{
    try{
        console.log(`connected to port ${process.env.port}`)
    }catch(err){
        console.log(err)
    }
})