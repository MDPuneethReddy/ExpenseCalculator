import React from 'react';
import { Main } from './components/Main';
import 'antd/dist/antd.css';
import { Registration } from './components/auth/Registration';
import { Login } from './components/auth/Login';
import { Router} from "@reach/router"
import { store } from './store/store';
import {Provider} from "react-redux"
import { ChartsMain } from './components/Charts/ChartsMain';
import { ForgotPassword } from './components/auth/ForgotPassword';
function App() {
  return (
    <Provider store={store}>
    <Router>
      <Registration path="/registration" />
      <Login path="/login" />
      <ForgotPassword path="/forgotPassword" />
      <Main path="/" />
      <ChartsMain path="/charts" />
      </Router>
      </Provider>
  );
}

export default App;
