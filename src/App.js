import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/header/header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </Provider>
  );
}
export default App;
