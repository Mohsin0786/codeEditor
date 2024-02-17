import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Playground from "./Playground";
import Dashboard from "./Dashboard";
import Header from "./Header";
function App() {
  const [openSignIn, setopenSignIn] = useState(false);
  const [classCodes, setClassCodes] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("mohsin")) {
      localStorage.setItem("mohsin", JSON.stringify(classCodes));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("mohsin", JSON.stringify(classCodes));
  }, [classCodes]);
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("mohsin", JSON.stringify(data.data));
      });
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/:lang/:editorID" component={Playground} />
          <Route exact path="/">
            <Dashboard
              openSignIn={openSignIn}
              setopenSignIn={setopenSignIn}
              classCodes={classCodes}
              setClassCodes={setClassCodes}
            />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
