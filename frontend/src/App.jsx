
import './App.css';
import CameraApp from './Camera';

import Navbar from './Navbar';


function App() {
  function getQuestion(){
    fetch("http://localhost:8800/getQuestion")
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        // let question=JSON.stringify(data);
        console.log(data);
      //   localStorage.setItem("ques",data.question);
      //  let div=document.createElement("div");
      //   div.setAttribute("class","each-div");
      //   let image=document.createElement("img");
      //   image.setAttribute("class","logo");
      //   image.src="https://looka.com/s/139260762"
      //   let q=document.createElement("p");
      //   q.setAttribute("class","question");
      //   q.innerText=data.question;

      //   div.append(q);
        // output.append(div);
       
    })
  }
  return (
    <>
    <Navbar></Navbar>
    <div id='mainBody'>

      <div id='selectCont'>
      <select  id="">
        <option value="">Select Topic</option>
        <option value="react">React</option>
        <option value="node">Node</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>      
      </select>
      <select  id="">
        <option value="">Select Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advance">Advance</option>
      </select>
      </div>

      <div id='start'>
        <button id='startBtn'>Start Your Interview</button>
      </div>     
      
      <div id='interviewCont'>
        <div id='cameraCont'>
          <CameraApp></CameraApp>
        </div>
        <div id='questionScreen'>

        </div>
      </div>

      <div id='inputCont'>
        <textarea  id="input"  ></textarea>
        <button id='sendBtn'>Send</button>
      </div>
     
   
    </div>
    </>
  );
}

export default App;
