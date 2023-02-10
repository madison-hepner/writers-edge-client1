import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { SnapSpot } from "./components/SnapSpot"
import "./index.css"
import DateTimePicker from 'react-datetime-picker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SnapSpot />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)