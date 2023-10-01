import { useState } from 'react';
import './App.css';
import CameraApp from './Camera';

import Navbar from './Navbar';
import VoiceToText from './VoiceToText';


function App() {
  const [topic, setTopic] = useState("node")
  const [level, setLevel] = useState("beginner")

  function getQuestion(){

    let payload={level,topic}
    console.log(payload)
    fetch("http://localhost:8800/main/getQuestion",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(payload)  
    })
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data);
        let questionScreen=document.getElementById("questionScreen");
        let questionDiv=document.createElement("div");
        questionDiv.setAttribute("class","questionDiv");
        let question=document.createElement("p");
        question.innerText=data.question;
        questionDiv.append(question);
        questionScreen.append(questionDiv)
       
    })
  }
  
  return (
    <>
    <Navbar></Navbar>
    <div id='mainBody'>

      <div id='selectCont' >
        <select  id="topic" onChange={(e)=>setTopic(e.target.value)}>
          <option value="">Select Topic</option>
          <option value="react">React</option>
          <option value="node">Node</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>      
        </select>
        <select  id="level" onChange={(e)=>setLevel(e.target.value)}>
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advance">Advance</option>
        </select>
      </div>

      <div id='start'>
        <button id='startBtn' onClick={getQuestion}>Start Your Interview</button>
      </div>     
      
      <div id='interviewCont'>
        <div id='cameraCont'>
          {/* <CameraApp></CameraApp> */}
        </div>
        <div id='questionScreen'>

        </div>
      </div>

      <div >
       
         <VoiceToText></VoiceToText>
      </div>
     
     
   
    </div>
    </>
  );
}

export default App;
