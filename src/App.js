import React, {useState, useMemo} from 'react';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
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
