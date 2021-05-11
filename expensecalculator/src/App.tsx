import React from 'react';
import { Main } from './components/Main';
import 'antd/dist/antd.css';
import { Registration } from './components/auth/Registration';
import { Login } from './components/auth/Login';
import { Router} from "@reach/router"
function App() {
  return (
    <Router>
      <Registration path="/registration" />
      <Login path="/login" />
      <Main path="/" />
      </Router>
  );
}

export default App;
