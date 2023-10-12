const express = require("express")
const {openai}=require("../openai")

require("dotenv").config();

const mainRoute=express.Router()

mainRoute.post('/getQuestion', async (req, res) => {
  let {level,topic}=req.body;
  let promptByUser=`you have to act as a expert of ${topic} and ask one question of level ${level}`
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptByUser,
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



mainRoute.post("/submitAnswer",async(req,res)=>{
  let {question,answer}=req.body;
  console.log("answer",answer)
  let promptByUser=`    
      Provide feedback on the following response to the question: "${question}", answer: "${answer}"and assign a score out of 10. Also, give the correct answer.

      give result like this:      
      Score: 2/10,\n
      Feedback: You need to improve,\n
      Correct Answer: The correct term is...,
  `
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptByUser,
      max_tokens: 3000
    });

    const feedback = response.data.choices[0].text.trim();
    console.log(feedback)
    res.json({feedback });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Server error' });
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