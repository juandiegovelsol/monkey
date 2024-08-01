// App.js
import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <div className="background">
        <div id="stars"></div>
        <div id="stars2"></div>
      </div>
      <div className="content">
        <h1>Welcome to my App</h1>
        <p>This is some content on top of the animated background.</p>
      </div>
    </div>
  );
}

export default App;
