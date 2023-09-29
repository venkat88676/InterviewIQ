import React, { useState, useEffect } from "react";

function VoiceToText() {
  const [transcription, setTranscription] = useState("");
  const [listening, setListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition();

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
        <button id="sendBtn">Send</button>
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
