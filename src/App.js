import "./App.css";
// import Home from "./components/Home";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/linkedin" component={LinkedInCallback} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
