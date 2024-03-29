import ReactDOM from "react-dom";
import "./styles.css";
import "./styles/transitions.css";
import "./styles/modal-transitions.css";
import App from "./App";
import "./i18n";
import { BrowserRouter as Router } from "react-router-dom";

const localCart = localStorage.getItem("tlclc");
console.log(localCart);
if (!localCart) {
  localStorage.setItem("tlclc", JSON.stringify([]));
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
