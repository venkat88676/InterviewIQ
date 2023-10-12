const express = require("express")
const app= express();
const cors=require("cors")
const mainRoute=require("./routes/main.route");

require("dotenv").config();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
  app.use(cors(corsOptions));

app.use("/",mainRoute);


app.listen(process.env.port,async()=>{
    try{
        console.log(`connected to port ${process.env.port}`)
    }catch(err){
        console.log(err)
    }
})