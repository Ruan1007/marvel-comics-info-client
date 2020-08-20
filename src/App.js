import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
