import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Playground() {
  let { lang, editorID } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/savecode/${editorID}`)
      .then((response) => response.json())
      .then((resdata) => {
        nameInput.current.value = resdata.data[0].code;
      });
  }, []);

  const [output, setoutput] = useState("");

  const nameInput = useRef(null);
  console.log("EditorID", editorID, "language", lang);
  const saveData = () => {
    let data = {};
    data.codedata = nameInput.current.value;
    data.lang = lang;
    data.editorID = editorID;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8000/savecode", requestOptions)
      .then((response) => response.json())
      .then((resdata) => {
        alert("Code Saved!!!!!!!!! refresh page to check");
      });
  };
  const getdata = () => {
    let data = {};
    data.codedata = nameInput.current.value;
    data.lang = lang;
    data.editorID = editorID;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8000/postcode", requestOptions)
      .then((response) => response.json())
      .then((resdata) => {
        setoutput(resdata.message);
      });
  };
  return (
    <div className="App">
      <div className="editor-container" style={{ display: "flex" }}>
        <div className="editor-field">
          <textarea
            className="textContent"
            rows="40"
            cols="150"
            ref={nameInput}
            style={{
              resize: "none",
              margin: "0px",
              width: "978px",
              height: "540px",
              border: "4px solid #441151",
              borderTop: "none",
              borderLeft: "34px solid black",
              borderBottom: "none",
              paddingLeft: "18px",
              paddingTop: "18px",
            }}
          ></textarea>
        </div>
        <div
          className="compilor-field"
          style={{
            display: "flex",
            width: "63%",
            background: "antiquewhite",
            justifyContent: "center",
          }}
        >
          <div
            onClick={getdata}
            style={{
              position: "absolute",
              top: "39rem",
              border: "1px solid black",
              width: "5rem",
              height: "2.4rem",
              borderRadius: "9px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "9rem",
            }}
          >
            Run
          </div>

          <div
            onClick={saveData}
            style={{
              position: "absolute",
              top: "39rem",
              border: "1px solid black",
              width: "5rem",
              height: "2.4rem",
              borderRadius: "9px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginLeft: "12rem",
            }}
          >
            Save
          </div>

          {output ? <span>{output.output}</span> : null}
        </div>
      </div>
    </div>
  );
}

export default Playground;
