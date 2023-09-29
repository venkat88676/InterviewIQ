const express = require("express")
require("dotenv").config();
const apiKey=process.env.OPENAI_API_KEY

const mainRoute=express.Router()



mainRoute.post("/submit",async(req,res)=>{
    try {
        const {prompt,studentAnswer}=req.body;
        let data= await callChatGPT(prompt,studentAnswer);
        res.status(200).send({
            isError:false,
            data:data
        });
        
    } catch (error) {
        res.status(401).send({
            isError:true,
            error:error
        });
    }
})

mainRoute.post('/feedback', async (req, res) => {
    try {
      const {avgScore}=req.body;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ` In the interview interviewer give score ${avgScore} out of 10 to the candidate Now interviewer want to gave feedback to the candidate so please generate feedback`,
        max_tokens: 3000
      });
  
      const question = response.data.choices[0].text.trim();
      res.json({ question });
    } catch (error) {
      console.error('Error fetching question:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

  module.exports=mainRoute