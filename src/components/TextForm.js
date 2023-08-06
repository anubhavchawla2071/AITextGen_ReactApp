import React, { useState ,useEffect} from "react";
// import { scryRenderedComponentsWithType } from "react-dom/test-utils";

export default function TextForm(props) {
  // const [data,setData]=useState([{}]);
  const [text, setText] = useState("");
  const [finalText,setFinalText] =useState("")
  useEffect(()=>{
    if(finalText)
      fetch("/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "input_text": finalText }), // Convert the input to JSON string
    })
      .then(res => res.json())
      .then(data => {
        // Handle the response data from the server
        setFinalText(data.generated_text)
        console.log(data);
      })
  },[finalText])
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText("");
    setFinalText(newText);
  };

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };

  const handleCopy = () => {
    var text = document.getElementById("exampleFormControlTextarea1");
    text.select();
    navigator.clipboard.writeText(text.value);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleWordCount = (str) => {
    // const arr = str.split(" ");
    // console.log(arr);
    return str.split(" ").filter((word)=> word.length>0).length;
    // return arr.length;
  };
  const handleBold=()=>{
    var element = document.getElementById("para");
        element.style.fontWeight = "bold";
  };
  const handleItalic=()=>{
    var element = document.getElementById("para");
        element.style.fontStyle = "italic"
  };
  return (
    <>
      <div className="container text-center" style={{marginTop:'55px',marginBottom:'20px'}}>
        <h2 style={{ color: props.theme === "light" ? "black" : "white" }}>
          {props.heading}
        </h2>
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="8"
          placeholder="Enter text here"
          value={text}
          onChange={handleOnChange}
          style={{
            backgroundColor: props.theme === "light" ? "#F6F6F6" : "#292929",
            color: props.theme === "light" ? "black" : "white",
          }}
        ></textarea>
      </div>
      <div className="mx-0">
        <button
          className="btn btn-primary mx-2 my-3"
          onClick={handleUpClick}
        >
          Convert to UPPPER CASE
        </button>
        <button className="btn btn-primary mx-2 my-3" onClick={handleLowClick}>
          Convert to lower case
        </button>
        <button className="btn btn-primary mx-2 my-3" onClick={handleSpace}>
          Remove extra space
        </button>
        <button className="btn btn-primary mx-2 my-3" onClick={handleCopy}>
          Copy Text
        </button>
        <button className="btn btn-primary mx-2 my-3" onClick={handleBold}>
          Bold text
        </button>
        <button className="btn btn-primary mx-2 my-3" onClick={handleItalic}>
          Italic text
        </button>
      </div>
      <p style={{ color: props.theme === "light" ? "black" : "white" }}>
        Words : {handleWordCount(text)} and Characters : {text.length}
      </p>
      <div style={{ color: props.theme === "light" ? "black" : "white" }}>
        <h4>Your preview :</h4>
        <p id="para">{finalText}</p>
      </div>
    </>
  );
}