import React, { useState, useEffect } from "react";

function VoiceToText() {
  const [transcription, setTranscription] = useState("");
  const [listening, setListening] = useState(false);
  const [question, setQuestion] =useState("");
  const [answer, setAnswer] = useState("");

  const recognition = new window.webkitSpeechRecognition();

  function submitAnswer(){
    // let newPrompt=`Ask one more question on previous topic od same level`
    let payload={transcription}
    fetch(`http://localhost:8800/main/submitAnswer`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:payload
    })
    .then((res)=>res.json())
    .then((data)=>{

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
      setTranscription(transcript);
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
          value={transcription}
          id="input"
          onChange={(e) => setTranscription(e.target.value)}
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
