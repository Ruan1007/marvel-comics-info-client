import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faThumbsUp, faThumbsDown);

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
