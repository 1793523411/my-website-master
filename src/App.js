import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login";

const App = () => (
  <div className="App">
    <Router>
      <div>
        <Route exact path="/" component={Login}></Route>
        <Route  path="/index" component={Index}></Route>
      </div>
    </Router>
  </div>
);

export default App;
