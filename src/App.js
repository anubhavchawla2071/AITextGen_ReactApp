import { useState } from "react";
import "./App.css";
import TextForm from "./components/TextForm";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#121212";
      // document.getElementById('back').style.backgroundColor="#292929";
      // showAlert("Dark mode enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      // document.getElementById('back').style.backgroundColor="#F6F6F6";
      // showAlert("Dark mode disabled", "success");
    }
  };
  return (
    <>
     <Router>
      <Navbar title="Texted(it)" theme={mode} toggleMode={toggleMode} />
      {/* {alert.msg && <Alert alert={alert} setAlert={setAlert} />} */}
        <Routes>
          {/* <Route exact path="/about" element={<About theme={mode} />} /> */}
          <Route
            exact path="/"
            element={
              <div className="container my-3">
                <TextForm heading="Enter text you want to edit" theme={mode} />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;