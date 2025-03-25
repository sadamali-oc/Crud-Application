import "./App.css";
import React from "react";
import Student from "./Pages/Student";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="" element={<Student />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
