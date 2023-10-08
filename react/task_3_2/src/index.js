import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import FunctionCounterComponent from './App.js';
import { createStore } from "redux";
import counterReducer from "./redux/reducers/counterReducer.js";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(
  counterReducer);

root.render(
  <React.StrictMode>
   <Provider store={store}>
      <FunctionCounterComponent />
    </Provider>
  </React.StrictMode>
);