import React from 'react';
import { Main } from './components/Main';
import 'antd/dist/antd.css';
import { Registration } from './components/auth/Registration';
import { Login } from './components/auth/Login';
import { Router} from "@reach/router"
import { store } from './store/store';
import {Provider} from "react-redux"
function App() {
  return (
    <Provider store={store}>
    <Router>
      <Registration path="/registration" />
      <Login path="/login" />
      <Main path="/" />
      </Router>
      </Provider>
  );
}

export default App;
