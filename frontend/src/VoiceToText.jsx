import React, { useState, useEffect } from "react";

function VoiceToText({question,getFeedback}) {

  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition();

  function submitAnswer(){
    
    let payload={
      "question":question,
      "answer":answer
    }
    console.log("payload",payload)
    fetch(`http://localhost:8800/submitAnswer`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload),
    })
    .then((res)=>res.json())
    .then((data)=>{
      getFeedback(data)
      console.log("from child",data)
    })
    .catch((error)=>{
      console.log(error)
    })    
  }


  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript;
      setAnswer(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }, []);

  const startListening = () => {
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    recognition.stop();
    setListening(false);
  };

  return (
    <div id="inputCont">

        <textarea
          value={answer}
          id="input"
          onChange={(e) => setAnswer(e.target.value)}
        />

      <div id="buttons">

        <button id="sendBtn" onClick={submitAnswer}>Send</button>

        <button onClick={startListening} disabled={listening}>
          {listening ? "Listening..." : "Start Listening"}
        </button>

        <button onClick={stopListening} disabled={!listening}>
          Stop Listening
        </button>

      </div>
    </div>
  );
}

export default VoiceToText;
