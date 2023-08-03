import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import store from "./components/statemanagement/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    <GoogleOAuthProvider clientId="91360851474-dut75trtfm3mbvafmobfb24q2mm3r12n.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
