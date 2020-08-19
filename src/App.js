import React, {useState, useMemo} from 'react';
import {BrowserRouter as Router, useHistory} from 'react-router-dom';
import Routes from './routes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader';

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
