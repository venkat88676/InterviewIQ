const express = require("express")
const app= express();
const cors=require("cors")
// const fetch = require("node-fetch");
// const mainRoute=require("./routes/main.route");
const {openai}=require("./openai")


require("dotenv").config();
app.use(express.json());
app.use(cors())


app.get('/getQuestion', async (req, res) => {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `ask 1 question on nodejs `,
        max_tokens: 3000
      });
  
      const question = response.data.choices[0].text.trim();
      console.log(question)
      res.json({ question });
    } catch (error) {
      console.error('Error fetching question:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// app.use("/main",mainRoute);


app.listen(process.env.port,async()=>{
    try{
        console.log(`connected to port ${process.env.port}`)
    }catch(err){
        console.log(err)
    }
})