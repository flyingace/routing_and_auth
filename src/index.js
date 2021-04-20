import React from "react"
import ReactDOM from "react-dom"
import './theme.css'
import './styles.css'
import App from "./App"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <App />
    </div>
  </React.StrictMode>,
  rootElement
)
