import { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import VoiceToText from './VoiceToText';

function App() {
  const [topic, setTopic] = useState("node");
  const [level, setLevel] = useState("beginner");
  const [question, setQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [finalOutput, setFinalOutput] = useState([]);

  function getQuestion() {
    setFeedback(""); // Clear the feedback when a new question is obtained
    let payload = { level, topic };
    fetch("http://localhost:8800/getQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestion(data.question);

        const newQuestion = { type: "question", content: data.question };
        setFinalOutput([...finalOutput, newQuestion]);
      });
  }

  function getFeedback(response) {
    console.log("from parent", response.feedback);
 
    setFeedback(response.feedback);
  }

  return (
    <>
      <Navbar />
      <div id='mainBody'>
        <div id='selectCont'>
          {/* ... (unchanged) */}
        </div>
        <div id='start'>
          <button id='startBtn' onClick={getQuestion}>Start Your Interview</button>
        </div>
        <div id='interviewCont'>
          <div id='cameraCont'>
            {/* ... (unchanged) */}
          </div>
          <div id='questionScreen'>
            {finalOutput.map((item, index) => (
              <div key={index} className={item.type}>
                {item.content}
              </div>
            ))}
            <p>{feedback}</p>
          </div>
          <div id='feedback'>
              
          </div>
        </div>
        <div>
          <VoiceToText question={question} getFeedback={getFeedback} />
        </div>
      </div>
    </>
  );
}

export default App;
